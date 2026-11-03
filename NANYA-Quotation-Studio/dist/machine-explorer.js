import * as THREE from './assets/three.module.min.js';
import {loadMachine} from './models/load-model.js';

const PARTS=[['spindle','Spindle'],['table','Worktable'],['control','M80A control'],['toolchanger','24-tool magazine'],['axes','Axis system'],['enclosure','Enclosure'],['conveyor','Chip handling']];

export async function createScene(container,machine,options={}){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,abort=new AbortController();
  let renderer,software=false;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{renderer=new SoftwareRenderer();software=true;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
  const canvas=renderer.domElement;canvas.dataset.renderer=software?'software':'webgl';canvas.tabIndex=options.intro?-1:0;
  canvas.setAttribute('role','img');canvas.setAttribute('aria-label',machine.name+' detailed 3D visualization. Drag to orbit. Arrow keys rotate; plus and minus zoom; Home resets.');
  container.append(canvas);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.05,90);
  let machineRoot;
  try{machineRoot=await loadMachine(machine.id,{signal:abort.signal});}catch(e){renderer.dispose();canvas.remove();throw e;}
  scene.add(machineRoot);
  const bounds=new THREE.Box3().setFromObject(machineRoot),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const framingPoints=[];
  machineRoot.traverse(o=>{if(o.isMesh){o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z])framingPoints.push(new THREE.Vector3(x,y,z).applyMatrix4(o.matrixWorld).sub(center));}});
  let envMap;
  if(!software){
    const c=document.createElement('canvas');c.width=512;c.height=256;const ctx=c.getContext('2d'),g=ctx.createLinearGradient(0,0,0,256);
    g.addColorStop(0,'#c9d2d5');g.addColorStop(.42,'#303c43');g.addColorStop(.6,'#141a1f');g.addColorStop(1,'#727a7d');ctx.fillStyle=g;ctx.fillRect(0,0,512,256);
    ctx.fillStyle='#eff2eb';ctx.fillRect(42,25,130,42);ctx.fillRect(360,40,26,116);ctx.fillStyle='#c18b5c';ctx.fillRect(245,125,16,30);
    const env=new THREE.CanvasTexture(c);env.mapping=THREE.EquirectangularReflectionMapping;env.colorSpace=THREE.SRGBColorSpace;
    const pmrem=new THREE.PMREMGenerator(renderer);envMap=pmrem.fromEquirectangular(env);scene.environment=envMap.texture;pmrem.dispose();env.dispose();
  }
  scene.add(new THREE.HemisphereLight(0xe2eaf0,0x39302a,2.25));
  const key=new THREE.DirectionalLight(0xf0ece0,4.4);key.position.set(-3,7,7);key.castShadow=!software;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=7;key.shadow.camera.bottom=-6;key.shadow.normalBias=.025;scene.add(key);
  const rim=new THREE.DirectionalLight(0xbac8d7,2.9);rim.position.set(5,4,-5);scene.add(rim);
  const warm=new THREE.PointLight(0xee9860,12,14);warm.position.set(-5,2.5,4);scene.add(warm);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,28),new THREE.ShadowMaterial({opacity:.22}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.position.y=.018;scene.add(floor);
  const parts=Object.fromEntries(machineRoot.children.filter(g=>g.userData.part).map(g=>[g.name,{node:g,origin:g.position.clone()}]));
  const materialCopies=new Map();machineRoot.traverse(o=>{if(o.isMesh){let part=o;while(part.parent!==machineRoot&&part.parent)part=part.parent;const k=o.material.uuid+'/'+part.name;if(!materialCopies.has(k)){const m=o.material.clone();m.userData={...o.material.userData};materialCopies.set(k,m);}o.material=materialCopies.get(k);}});
  const hotspotLayer=document.createElement('div');hotspotLayer.className='hotspot-layer';container.append(hotspotLayer);
  const markers=options.intro?[]:PARTS.map(([id,label],i)=>{const b=document.createElement('button');b.className='machine-hotspot';b.type='button';b.setAttribute('aria-label','Explore '+label.toLowerCase());b.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><small>${label}</small>`;b.addEventListener('click',()=>selectPart(id));hotspotLayer.append(b);return{id,button:b,anchor:new THREE.Vector3(...machineRoot.userData.anchors[id])};});
  let frame=0,disposed=false,paused=false,visible=true,lastTime=0,dirty=true,firstFrame=true;
  let theta=Math.abs(machineRoot.userData.profile.angle),targetTheta=theta,phi=.20,targetPhi=.20;
  let baseDistance=8,distance=8,targetDistance=8,focus=center.clone(),targetFocus=center.clone();
  let auto=false,wire=false,doors=false,doorAmount=0,exploded=false,explodeAmount=0,motion=false,phase=0,selected='overview',drag=false,lastX=0,lastY=0,touched=false;
  function fit(){
    const tangent=Math.tan(camera.fov*Math.PI/360),angle=Math.abs(machineRoot.userData.profile.angle),tilt=.20;
    const direction=new THREE.Vector3(Math.sin(angle)*Math.cos(tilt),Math.sin(tilt),Math.cos(angle)*Math.cos(tilt));
    const right=new THREE.Vector3(Math.cos(angle),0,-Math.sin(angle)),up=new THREE.Vector3().crossVectors(direction,right);
    baseDistance=0;
    for(const corner of framingPoints){
      baseDistance=Math.max(baseDistance,corner.dot(direction)+Math.max(Math.abs(corner.dot(up))/tangent,Math.abs(corner.dot(right))/(tangent*camera.aspect)));
    }
    baseDistance*=1.12;
  }
  function resize(){const r=container.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();const old=baseDistance;fit();if(selected==='overview'){distance=targetDistance=baseDistance*(exploded?1.23:1);}else targetDistance*=baseDistance/old;dirty=true;}
  const ro=new ResizeObserver(resize);ro.observe(container);resize();
  const io=new IntersectionObserver(e=>{visible=e[0].isIntersecting;dirty=true;});io.observe(container);
  function snapshot(){return{auto,wire,doors,exploded,motion,selected,modelId:machineRoot.userData.modelId,modelRevision:machineRoot.userData.revision,meshCount:machineRoot.userData.meshCount,design:machineRoot.userData.design?.name};}
  function notify(){options.onState?.(snapshot());}
  function setDoors(value){doors=value;dirty=true;notify();return doors;}
  function setExploded(value){exploded=value;if(value){doors=true;motion=false;}targetFocus.copy(center);targetDistance=baseDistance*(value?1.25:1);selected='overview';highlight();dirty=true;options.onSelectPart?.('overview');notify();return exploded;}
  function highlight(){machineRoot.traverse(o=>{if(o.isMesh&&o.material.emissive){let node=o;while(node.parent!==machineRoot&&node.parent)node=node.parent;const hit=node.name===selected;o.material.emissive.set(hit?0x9c4c24:0);o.material.emissiveIntensity=hit?.22:0;}});markers.forEach(m=>m.button.classList.toggle('selected',m.id===selected));}
  function selectPart(id,{focusCamera=true}={}){
    if(id!=='overview'&&!machineRoot.userData.anchors[id])return;
    selected=id;auto=false;motion=false;
    if(id==='overview'){targetFocus.copy(center);targetDistance=baseDistance*(exploded?1.25:1);}
    else{
      if(['spindle','table'].includes(id))doors=true;
      if(['axes','toolchanger'].includes(id)){doors=true;exploded=true;}
      if(focusCamera){const anchor=new THREE.Vector3(...machineRoot.userData.anchors[id]);if(exploded)anchor.add(new THREE.Vector3(...(parts[id]?.node.userData.explode||[0,0,0])));targetFocus.copy(anchor);targetDistance=Math.max(3.2,baseDistance*.68);targetTheta=id==='control'?-.10:id==='conveyor'?.12:Math.abs(machineRoot.userData.profile.angle)*.65;targetPhi=.14;}
    }
    highlight();dirty=true;options.onSelectPart?.(id);notify();
  }
  function preset(view){auto=false;selected='overview';highlight();targetFocus.copy(center);targetDistance=baseDistance*(exploded?1.25:1);targetPhi=.18;
    if(view==='front')targetTheta=0;else if(view==='right')targetTheta=1.25;else if(view==='rear')targetTheta=Math.PI;else if(view==='inside'){doors=true;targetTheta=.12;targetPhi=.2;targetFocus.set(0,1.8,.05);targetDistance=baseDistance*.72;}else targetTheta=Math.abs(machineRoot.userData.profile.angle);
    dirty=true;options.onSelectPart?.('overview');notify();
  }
  function reset(){auto=false;wire=false;doors=false;exploded=false;motion=false;selected='overview';targetTheta=Math.abs(machineRoot.userData.profile.angle);targetPhi=.20;targetFocus.copy(center);targetDistance=baseDistance;materialCopies.forEach(m=>m.wireframe=false);highlight();dirty=true;options.onSelectPart?.('overview');notify();}
  const onDown=e=>{drag=true;touched=true;auto=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);canvas.style.cursor='grabbing';notify();};
  const onMove=e=>{if(!drag)return;targetTheta-=(e.clientX-lastX)*.007;targetPhi=THREE.MathUtils.clamp(targetPhi+(e.clientY-lastY)*.003,-.1,.8);lastX=e.clientX;lastY=e.clientY;dirty=true;};
  const onUp=()=>{drag=false;canvas.style.cursor='grab';};
  const zoom=d=>{targetDistance=THREE.MathUtils.clamp(targetDistance+d*.55,2.5,baseDistance*1.75);dirty=true;};
  const onWheel=e=>{if(touched||e.ctrlKey){e.preventDefault();zoom(Math.sign(e.deltaY)*.35);}};
  const onKey=e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key)){e.preventDefault();touched=true;auto=false;if(e.key==='ArrowLeft')targetTheta+=.12;if(e.key==='ArrowRight')targetTheta-=.12;if(e.key==='ArrowUp')targetPhi=Math.min(.8,targetPhi+.08);if(e.key==='ArrowDown')targetPhi=Math.max(-.1,targetPhi-.08);if(e.key==='+'||e.key==='=')zoom(-1);if(e.key==='-')zoom(1);if(e.key==='Home')reset();dirty=true;}};
  canvas.style.cursor='grab';canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',onMove);canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);canvas.addEventListener('wheel',onWheel,{passive:false});canvas.addEventListener('keydown',onKey);
  function applyParts(){for(const [id,part] of Object.entries(parts)){
    const offset=part.node.userData.explode||[0,0,0];part.node.position.copy(part.origin);part.node.position.x+=offset[0]*explodeAmount;part.node.position.y+=offset[1]*explodeAmount;part.node.position.z+=offset[2]*explodeAmount;
    if(id.startsWith('door-'))part.node.position.x+=part.node.userData.slide*doorAmount;
    if(motion&&id==='table')part.node.position.x+=Math.sin(phase*.55)*.22;
    if(motion&&id==='spindle')part.node.position.y+=.08+Math.cos(phase*.7)*.08;
  }}
  function updateMarkers(){for(const marker of markers){const a=marker.anchor.clone();const part=parts[marker.id];if(part)a.add(part.node.position.clone().sub(part.origin));const projected=a.project(camera);const x=(projected.x*.5+.5)*container.clientWidth,y=(-projected.y*.5+.5)*container.clientHeight;marker.button.style.transform=`translate(${x}px,${y}px)`;const inside=['spindle','table','axes','toolchanger'].includes(marker.id);marker.button.hidden=(inside&&doorAmount<.5&&explodeAmount<.25)||projected.z>1||projected.z<0||x<12||x>container.clientWidth-12||y<12||y>container.clientHeight-12;}}
  function animate(time){if(disposed)return;frame=requestAnimationFrame(animate);if(paused||!visible||document.hidden||time-lastTime<(software?58:25))return;const dt=Math.min((time-lastTime)/1000,.08);lastTime=time;
    if(auto&&!reduce){targetTheta+=dt*.18;dirty=true;}if(options.intro&&!reduce){targetTheta=.36+Math.sin(time*.0002)*.12;dirty=true;}
    if(motion&&!reduce){phase+=dt;dirty=true;}
    const moving=Math.abs(targetTheta-theta)+Math.abs(targetPhi-phi)+Math.abs(targetDistance-distance)+focus.distanceTo(targetFocus)+Math.abs((doors?1:0)-doorAmount)+Math.abs((exploded?1:0)-explodeAmount)>.001;
    if(!dirty&&!moving)return;
    const ease=reduce?1:.14;theta+=(targetTheta-theta)*ease;phi+=(targetPhi-phi)*ease;distance+=(targetDistance-distance)*ease;focus.lerp(targetFocus,ease);doorAmount+=((doors?1:0)-doorAmount)*ease;explodeAmount+=((exploded?1:0)-explodeAmount)*ease;
    applyParts();camera.position.set(focus.x+Math.sin(theta)*Math.cos(phi)*distance,focus.y+Math.sin(phi)*distance,focus.z+Math.cos(theta)*Math.cos(phi)*distance);camera.lookAt(focus);renderer.render(scene,camera);if(firstFrame){firstFrame=false;canvas.dataset.frameReady='true';options.onReady?.(snapshot());}updateMarkers();dirty=false;
  }
  frame=requestAnimationFrame(animate);notify();
  return {
    selectPart,preset,reset,zoom,setDoors,setExploded,
    toggleRotate(){auto=!auto;dirty=true;notify();return auto;},
    toggleWire(){wire=!wire;materialCopies.forEach(m=>m.wireframe=wire);dirty=true;notify();return wire;},
    toggleDoors(){return setDoors(!doors);},toggleExploded(){return setExploded(!exploded);},
    toggleMotion(){motion=!motion;if(motion){doors=true;exploded=false;selected='overview';targetFocus.copy(center);targetDistance=baseDistance;highlight();}dirty=true;options.onSelectPart?.('overview');notify();return motion;},
    getState:snapshot,pause(value){paused=value;dirty=true;},
    dispose(){disposed=true;abort.abort();cancelAnimationFrame(frame);ro.disconnect();io.disconnect();const geometries=new Set(),mats=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)mats.add(o.material);});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());materialCopies.forEach(m=>m.dispose());machineRoot.userData.textures?.forEach(t=>t?.dispose());envMap?.dispose();renderer.dispose();canvas.remove();hotspotLayer.remove();}
  };
}

// A depth buffer keeps overlapping cabinet panels, glazing and aprons clean
// when WebGL is unavailable. Painting whole triangles by average depth caused
// diagonal occlusion artifacts on the original fallback.
class SoftwareRenderer {
  constructor(){this.domElement=document.createElement('canvas');this.ctx=this.domElement.getContext('2d',{willReadFrequently:true});this.shadowMap={};this.ratio=1;this.width=1;this.height=1;this.textures=new WeakMap();}
  setPixelRatio(){this.ratio=1;}
  setSize(w,h){this.width=Math.max(1,Math.round(w));this.height=Math.max(1,Math.round(h));this.domElement.width=this.width;this.domElement.height=this.height;this.domElement.style.width=w+'px';this.domElement.style.height=h+'px';this.depth=new Float32Array(this.width*this.height);}
  texturePixels(image){
    if(!this.textures.has(image)){
      const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0);
      this.textures.set(image,{pixels:ctx.getImageData(0,0,c.width,c.height).data,width:c.width,height:c.height});
    }
    return this.textures.get(image);
  }
  render(scene,camera){
    const ctx=this.ctx,W=this.width,H=this.height,faces=[];
    ctx.clearRect(0,0,W,H);this.depth.fill(Infinity);scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
    const vp=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),cp=camera.position;
    const light=new THREE.Vector3(-.45,.8,.7).normalize(),rim=new THREE.Vector3(.5,.4,-.6).normalize(),normal=new THREE.Vector3(),ab=new THREE.Vector3(),ac=new THREE.Vector3(),eye=new THREE.Vector3(),half=new THREE.Vector3();
    const shadow=new THREE.Vector3(-.35,0,0).project(camera),sy=(-shadow.y*.5+.5)*H,sx=(shadow.x*.5+.5)*W;
    ctx.save();ctx.translate(sx,sy);ctx.scale(1,.14);const gradient=ctx.createRadialGradient(0,0,10,0,0,W*.29);gradient.addColorStop(0,'#030708aa');gradient.addColorStop(1,'#03070800');ctx.fillStyle=gradient;ctx.beginPath();ctx.arc(0,0,W*.29,0,Math.PI*2);ctx.fill();ctx.restore();
    scene.traverse(mesh=>{
      if(!mesh.isMesh||!mesh.visible||mesh.material?.isShadowMaterial)return;
      const mat=mesh.material;if(!mat?.color)return;
      const position=mesh.geometry.attributes.position,uv=mesh.geometry.attributes.uv,index=mesh.geometry.index,world=[],screen=[];
      for(let i=0;i<position.count;i++){
        const v=new THREE.Vector3().fromBufferAttribute(position,i).applyMatrix4(mesh.matrixWorld);world.push(v);
        const clip=new THREE.Vector4(v.x,v.y,v.z,1).applyMatrix4(vp),iw=1/clip.w;
        screen.push({x:(clip.x*iw*.5+.5)*W,y:(-.5*clip.y*iw+.5)*H,z:clip.z*iw,iw});
      }
      const count=index?index.count:position.count;eye.subVectors(cp,mesh.getWorldPosition(new THREE.Vector3())).normalize();
      for(let i=0;i<count;i+=3){
        const ia=index?index.getX(i):i,ib=index?index.getX(i+1):i+1,ic=index?index.getX(i+2):i+2;
        const a=world[ia],b=world[ib],c=world[ic],p=[screen[ia],screen[ib],screen[ic]];
        if(p.some(v=>v.z>1||v.z< -1))continue;
        ab.subVectors(b,a);ac.subVectors(c,a);normal.crossVectors(ab,ac).normalize();if(mat.side!==THREE.DoubleSide&&normal.dot(eye)<0)continue;
        const shade=.45+Math.max(0,normal.dot(light))*.48+Math.max(0,normal.dot(rim))*.17;
        half.copy(light).add(eye).normalize();const spec=Math.pow(Math.max(0,normal.dot(half)),25)*.2*(mat.metalness||0);
        const rgb=['r','g','b'].map(k=>Math.min(255,Math.round((Math.pow(mat.color[k],1/2.2)*shade+spec+(mat.emissive?.[k]||0)*(mat.emissiveIntensity||0))*255)));
        faces.push({p,z:(p[0].z+p[1].z+p[2].z)/3,rgb,opacity:mat.opacity??1,wire:mat.wireframe,texture:mat.map?.image?this.texturePixels(mat.map.image):null,uv:uv?[[uv.getX(ia),uv.getY(ia)],[uv.getX(ib),uv.getY(ib)],[uv.getX(ic),uv.getY(ic)]]:null,flipY:mat.map?.flipY,shade,emissive:mat.emissiveIntensity||0});
      }
    });
    faces.sort((a,b)=>b.z-a.z);
    const image=ctx.getImageData(0,0,W,H),pixels=image.data,depth=this.depth;
    for(const f of faces){
      if(f.wire)continue;
      const [a,b,c]=f.p,det=(b.y-c.y)*(a.x-c.x)+(c.x-b.x)*(a.y-c.y);
      if(Math.abs(det)<1e-8)continue;
      const x0=Math.max(0,Math.floor(Math.min(a.x,b.x,c.x))),x1=Math.min(W-1,Math.ceil(Math.max(a.x,b.x,c.x)));
      const y0=Math.max(0,Math.floor(Math.min(a.y,b.y,c.y))),y1=Math.min(H-1,Math.ceil(Math.max(a.y,b.y,c.y)));
      const ax=(b.y-c.y)/det,ay=(c.x-b.x)/det,bx=(c.y-a.y)/det,by=(a.x-c.x)/det;
      const tex=f.texture,coords=f.uv;
      for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){
        const dx=x+.5-c.x,dy=y+.5-c.y,w0=ax*dx+ay*dy,w1=bx*dx+by*dy,w2=1-w0-w1;
        if(w0<-.00001||w1<-.00001||w2<-.00001)continue;
        const z=w0*a.z+w1*b.z+w2*c.z,k=y*W+x;if(z>=depth[k])continue;
        let alpha=f.opacity,r=f.rgb[0],g=f.rgb[1],bcolor=f.rgb[2];
        if(tex&&coords){
          const iw=w0*a.iw+w1*b.iw+w2*c.iw;
          const u=(w0*coords[0][0]*a.iw+w1*coords[1][0]*b.iw+w2*coords[2][0]*c.iw)/iw;
          let v=(w0*coords[0][1]*a.iw+w1*coords[1][1]*b.iw+w2*coords[2][1]*c.iw)/iw;if(f.flipY)v=1-v;
          const tx=Math.max(0,Math.min(tex.width-1,Math.round(u*(tex.width-1)))),ty=Math.max(0,Math.min(tex.height-1,Math.round(v*(tex.height-1)))),j=(ty*tex.width+tx)*4;
          alpha*=tex.pixels[j+3]/255;if(alpha<.01)continue;
          const lighting=Math.min(1.12,.70+f.shade*.30);r=tex.pixels[j]*lighting;g=tex.pixels[j+1]*lighting;bcolor=tex.pixels[j+2]*lighting;
        }
        const k4=k*4;if(alpha>=.995){pixels[k4]=r;pixels[k4+1]=g;pixels[k4+2]=bcolor;pixels[k4+3]=255;}
        else{const existing=pixels[k4+3]/255,out=alpha+existing*(1-alpha);pixels[k4]=(r*alpha+pixels[k4]*existing*(1-alpha))/out;pixels[k4+1]=(g*alpha+pixels[k4+1]*existing*(1-alpha))/out;pixels[k4+2]=(bcolor*alpha+pixels[k4+2]*existing*(1-alpha))/out;pixels[k4+3]=out*255;}
        depth[k]=z;
      }
    }
    ctx.putImageData(image,0,0);
    for(const f of faces)if(f.wire){const[a,b,c]=f.p;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.lineTo(c.x,c.y);ctx.closePath();ctx.strokeStyle='#d59b70';ctx.lineWidth=.45;ctx.stroke();}
  }
  dispose(){this.ctx.clearRect(0,0,this.width,this.height);this.textures=new WeakMap();}
}
