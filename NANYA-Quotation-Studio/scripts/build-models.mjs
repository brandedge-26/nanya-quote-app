import {writeFile,readFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildMachine,PROFILES} from '../dist/models/model-builder.js';
import {MODEL_REVISION,DESIGNS} from '../dist/models/machine-designs.js';

// Compact standard glTF 2.0 binary writer. Geometry, node hierarchy and textures
// are embedded, producing a separate portable GLB for every machine.
const output=fileURLToPath(new URL('../dist/models/',import.meta.url));
await mkdir(output,{recursive:true});
const manifest=[];
for(const id of Object.keys(PROFILES)){
  const group=buildMachine(id),chunks=[],geometries=new Map(),materials=new Map(),textures=new Map();let length=0;
  const gltf={asset:{version:'2.0',generator:'NANYA Quotation Studio / reference-based visualization'},scene:0,scenes:[{nodes:[0]}],nodes:[],meshes:[],materials:[],accessors:[],bufferViews:[],buffers:[{byteLength:0}],images:[],textures:[],samplers:[{magFilter:9729,minFilter:9987,wrapS:33071,wrapT:33071}]};
  function append(bytes,target){const b=Buffer.from(bytes);const pad=(4-length%4)%4;if(pad){chunks.push(Buffer.alloc(pad));length+=pad;}const index=gltf.bufferViews.length;gltf.bufferViews.push({buffer:0,byteOffset:length,byteLength:b.length,...(target?{target}:{})});chunks.push(b);length+=b.length;return index;}
  function accessor(attr,target){const arr=attr.array;const view=append(Buffer.from(arr.buffer,arr.byteOffset,arr.byteLength),target);const componentType=arr instanceof Uint16Array?5123:arr instanceof Uint32Array?5125:5126;
    const item={bufferView:view,componentType,count:attr.count,type:({1:'SCALAR',2:'VEC2',3:'VEC3',4:'VEC4'})[attr.itemSize]};
    if(attr.itemSize===3){item.min=[Infinity,Infinity,Infinity];item.max=[-Infinity,-Infinity,-Infinity];for(let i=0;i<attr.count;i++)for(let j=0;j<3;j++){const v=arr[i*3+j];item.min[j]=Math.min(item.min[j],v);item.max[j]=Math.max(item.max[j],v);}}
    const index=gltf.accessors.length;gltf.accessors.push(item);return index;
  }
  async function material(m){if(materials.has(m.uuid))return materials.get(m.uuid);const index=gltf.materials.length;materials.set(m.uuid,index);
    const def={name:m.name,pbrMetallicRoughness:{baseColorFactor:[m.color.r,m.color.g,m.color.b,1],metallicFactor:m.metalness??.3,roughnessFactor:m.roughness??.5},extras:{...m.userData}};
    gltf.materials.push(def);
    if(m.userData.texture){let t=textures.get(m.userData.texture);if(t===undefined){const bytes=await readFile(output+'/'+m.userData.texture);const view=append(bytes);const image=gltf.images.length;gltf.images.push({bufferView:view,mimeType:'image/png',name:m.userData.texture});t=gltf.textures.length;gltf.textures.push({sampler:0,source:image});textures.set(m.userData.texture,t);}def.pbrMetallicRoughness.baseColorTexture={index:t};if(m.userData.alpha){def.alphaMode='BLEND';def.doubleSided=true;}}
    return index;
  }
  async function node(object){const index=gltf.nodes.length;const def={name:object.name,translation:object.position.toArray(),rotation:object.quaternion.toArray(),scale:object.scale.toArray(),extras:object.userData};gltf.nodes.push(def);
    if(object.isMesh){const key=object.geometry.uuid+'-'+object.material.uuid;let mi=geometries.get(key);
      if(mi===undefined){const g=object.geometry;const attributes={POSITION:accessor(g.attributes.position,34962)};if(g.attributes.normal)attributes.NORMAL=accessor(g.attributes.normal,34962);if(g.attributes.uv){const uv=g.attributes.uv.clone();for(let i=0;i<uv.count;i++)uv.setY(i,1-uv.getY(i));attributes.TEXCOORD_0=accessor(uv,34962);}const primitive={attributes,material:await material(object.material)};if(g.index)primitive.indices=accessor(g.index,34963);mi=gltf.meshes.length;gltf.meshes.push({name:object.name,primitives:[primitive]});geometries.set(key,mi);}def.mesh=mi;
    }
    if(object.children.length){def.children=[];for(const child of object.children)def.children.push(await node(child));}return index;
  }
  await node(group);gltf.buffers[0].byteLength=length;
  let json=Buffer.from(JSON.stringify(gltf)),bin=Buffer.concat(chunks);const jp=(4-json.length%4)%4,bp=(4-bin.length%4)%4;json=Buffer.concat([json,Buffer.alloc(jp,32)]);bin=Buffer.concat([bin,Buffer.alloc(bp)]);
  const header=Buffer.alloc(12),jh=Buffer.alloc(8),bh=Buffer.alloc(8);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+json.length+8+bin.length,8);jh.writeUInt32LE(json.length,0);jh.writeUInt32LE(0x4e4f534a,4);bh.writeUInt32LE(bin.length,0);bh.writeUInt32LE(0x004e4942,4);
  const file=Buffer.concat([header,jh,json,bh,bin]);await writeFile(output+'/'+id+'.glb',file);const entry={id,meshes:group.userData.meshCount,bytes:file.length,profile:PROFILES[id].window,revision:MODEL_REVISION,design:DESIGNS[id].name,parts:group.children.filter(c=>c.userData.part).map(c=>c.name)};manifest.push(entry);console.log(id,entry.meshes+' components',Math.round(file.length/1024)+' KB');
  const gs=new Set(),ms=new Set();group.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)ms.add(o.material);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());
}
await writeFile(output+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
