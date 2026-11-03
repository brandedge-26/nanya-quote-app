import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PROFILES,MODEL_REVISION} from '../dist/models/machine-designs.js';

const data=JSON.parse(await readFile(new URL('../dist/data.json',import.meta.url),'utf8'));
const fingerprints=new Set();
for(const m of data.models){
  const bytes=await readFile(new URL('../dist/models/'+m.id+'.glb',import.meta.url));
  assert.equal(bytes.readUInt32LE(0),0x46546c67);
  assert.equal(bytes.readUInt32LE(8),bytes.length);
  const jsonLength=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+jsonLength).toString()),binaryOffset=28+jsonLength;
  const root=gltf.nodes[0];
  assert.equal(root.extras.modelId,m.id);
  assert.equal(root.extras.revision,MODEL_REVISION);
  assert.equal(root.extras.profile.window,PROFILES[m.id].window);
  for(const key of ['spindle','table','control','toolchanger','axes','enclosure','conveyor'])assert.equal(root.extras.anchors[key]?.length,3,m.id+' missing '+key+' anchor');
  const doors=gltf.nodes.filter(n=>n.extras.part?.startsWith('door-'));
  assert.equal(doors.length,2);assert(doors[0].extras.slide<0&&doors[1].extras.slide>0);
  const table=gltf.nodes.find(n=>n.name.startsWith('slotted-worktable-'));
  const attr=gltf.accessors[gltf.meshes[table.mesh].primitives[0].attributes.POSITION];
  const [tableWidth,tableDepth]=m.table.match(/[\d.]+/g).map(Number);
  assert(Math.abs(attr.max[0]-attr.min[0]-tableWidth/1000)<.04,m.id+' worktable width');
  assert(Math.abs(attr.max[2]-attr.min[2]-tableDepth/1000)<.04,m.id+' worktable depth');
  // Compare geometry and transforms only: relabelling or texturing one asset
  // seven times must not count as seven independently composed models.
  const hash=createHash('sha256');
  hash.update(JSON.stringify(gltf.nodes.map(({mesh,translation,rotation,scale})=>({mesh,translation,rotation,scale}))));
  for(const mesh of gltf.meshes)for(const primitive of mesh.primitives){
    const a=gltf.accessors[primitive.attributes.POSITION],v=gltf.bufferViews[a.bufferView];
    const positions=new Float32Array(bytes.buffer,bytes.byteOffset+binaryOffset+v.byteOffset,a.count*3);
    assert([...positions].every(Number.isFinite),m.id+' contains nonfinite vertices');
    hash.update(bytes.subarray(binaryOffset+v.byteOffset,binaryOffset+v.byteOffset+v.byteLength));
  }
  const fingerprint=hash.digest('hex');assert(!fingerprints.has(fingerprint),m.id+' reuses another model geometry');fingerprints.add(fingerprint);
  assert(gltf.nodes.some(n=>/^cut-out-sliding-door-/.test(n.name)));
  assert(gltf.images.length>=5,'Missing reference finish and identification maps');
  console.log(m.name+': correct asset identity, table dimensions, animated doors and unique geometry');
}
assert.equal(fingerprints.size,7);
console.log('All seven machine assets passed.');
