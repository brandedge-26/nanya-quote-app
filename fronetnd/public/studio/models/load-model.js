import * as THREE from '../assets/three.module.min.js';
import {MODEL_REVISION} from './machine-designs.js';

const cache=new Map();
export async function loadMachine(id,{signal}={}){
  const key=id+'/'+MODEL_REVISION;
  let bytes=cache.get(key);if(!bytes){const response=await fetch(new URL(id+'.glb?revision='+MODEL_REVISION,import.meta.url),{signal});if(!response.ok)throw new Error('Machine model unavailable');bytes=await response.arrayBuffer();cache.set(key,bytes);}
  if(signal?.aborted)throw new DOMException('Aborted','AbortError');
  const model=await decodeGLB(bytes,signal);
  if(model.userData.modelId!==id||model.userData.revision!==MODEL_REVISION)throw new Error('Machine model does not match the selected machine');
  return model;
}

// Decodes the standard glTF subset produced by build-models.mjs. Kept small so
// the same geometry can be shown by both the WebGL and software renderers.
async function decodeGLB(bytes,signal){
  const view=new DataView(bytes);if(view.getUint32(0,true)!==0x46546c67)throw new Error('Invalid GLB');
  const jsonLength=view.getUint32(12,true),gltf=JSON.parse(new TextDecoder().decode(new Uint8Array(bytes,20,jsonLength)));const binaryOffset=20+jsonLength+8;
  const arrays={5126:Float32Array,5123:Uint16Array,5125:Uint32Array};
  const accessor=i=>{const a=gltf.accessors[i],bv=gltf.bufferViews[a.bufferView],Ctor=arrays[a.componentType],size={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];return new THREE.BufferAttribute(new Ctor(bytes,binaryOffset+(bv.byteOffset||0)+(a.byteOffset||0),a.count*size),size);};
  const textures=await Promise.all(gltf.images.map(async im=>{
    const bv=gltf.bufferViews[im.bufferView];const blob=new Blob([new Uint8Array(bytes,binaryOffset+bv.byteOffset,bv.byteLength)],{type:im.mimeType});
    const url=URL.createObjectURL(blob);try{const img=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=url;});if(signal?.aborted)return null;const texture=new THREE.Texture(img);texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;texture.needsUpdate=true;return texture;}finally{URL.revokeObjectURL(url);}
  }));
  if(signal?.aborted){textures.forEach(t=>t?.dispose());throw new DOMException('Aborted','AbortError');}
  const materials=gltf.materials.map(m=>{const p=m.pbrMetallicRoughness,mat=new THREE.MeshStandardMaterial({name:m.name,color:new THREE.Color(...p.baseColorFactor.slice(0,3)),metalness:p.metallicFactor,roughness:p.roughnessFactor,transparent:m.alphaMode==='BLEND',side:m.doubleSided?THREE.DoubleSide:THREE.FrontSide});if(p.baseColorTexture)mat.map=textures[gltf.textures[p.baseColorTexture.index].source];mat.userData=m.extras||{};return mat;});
  const meshes=gltf.meshes.map(m=>{const p=m.primitives[0],g=new THREE.BufferGeometry();for(const [key,ai] of Object.entries(p.attributes))g.setAttribute({POSITION:'position',NORMAL:'normal',TEXCOORD_0:'uv'}[key],accessor(ai));if(p.indices!==undefined)g.setIndex(accessor(p.indices));g.computeBoundingSphere();return {g,mat:materials[p.material]};});
  const nodes=gltf.nodes.map(n=>{const mesh=n.mesh!==undefined?meshes[n.mesh]:null;const o=mesh?new THREE.Mesh(mesh.g,mesh.mat):new THREE.Group();o.name=n.name;o.userData=n.extras||{};if(n.translation)o.position.fromArray(n.translation);if(n.rotation)o.quaternion.fromArray(n.rotation);if(n.scale)o.scale.fromArray(n.scale);o.castShadow=true;o.receiveShadow=true;return o;});
  gltf.nodes.forEach((n,i)=>{for(const child of n.children||[])nodes[i].add(nodes[child]);});
  const root=nodes[gltf.scenes[gltf.scene].nodes[0]];root.userData.textures=textures;return root;
}
