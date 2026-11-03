import * as THREE from '../assets/three.module.min.js';

import {PROFILES,DESIGNS,MODEL_REVISION} from './machine-designs.js';
import {buildExterior} from './exterior-builder.js';
export {PROFILES};

export function buildMachine(id) {
  const p=PROFILES[id];if(!p)throw new Error('Unknown machine '+id);
  const root=new THREE.Group();root.name=id;
  root.userData={modelId:id,revision:MODEL_REVISION,profile:p,design:DESIGNS[id],referenceBased:true,units:'visualization metres'};
  const mat=(name,color,metalness=.6,roughness=.35)=>{const m=new THREE.MeshStandardMaterial({name,color,metalness,roughness});return m;};
  const materials={
    shell:mat('Powder-coated graphite',0x292d30,.42,.37),door:mat('Door powder coat',0x202427,.44,.34),edge:mat('Charcoal panel edges',0x181d20,.55,.36),
    base:mat('Cast machine base',0x30383b,.6,.48),steel:mat('Brushed steel',0xa9b1b4,.92,.23),
    darkSteel:mat('Blackened steel',0x414b50,.85,.28),glass:mat('Smoked safety glazing',0xffffff,.28,.22),
    silver:mat('Polished handles',0xc6d0d2,.98,.16),rubber:mat('Cable and seals',0x14191b,.08,.86),
    accent:mat('Gold service-panel seam',0x9d9145,.48,.45),blue:mat('Safety decal',0x429fc3,.2,.44),orange:mat('NANYA orange',0xef7835,.45,.29),
    red:mat('Emergency stop',0xcf3928,.2,.42),yellow:mat('Safety backing',0xd2ae37,.4,.35),
    green:mat('Status indicator',0x97b993,.3,.32),label:mat('Machine identification',0xffffff,.1,.65),
    control:mat('M80A control interface',0xffffff,.2,.45),fascia:mat('Engraved stainless apron',0xffffff,.6,.37),safety:mat('Safety and service placard',0xffffff,.05,.65)
  };
  materials.label.userData={texture:id+'-badge.png',alpha:true};
  materials.control.userData={texture:'control-panel.png'};
  materials.glass.userData={texture:'safety-glazing.png'};
  materials.fascia.userData={texture:id+'-fascia.png'};
  materials.safety.userData={texture:'service-placard.png'};
  const cache=new Map();let serial=0;
  function geometry(key,make){if(!cache.has(key))cache.set(key,make());return cache.get(key);}
  function mesh(g,m,parent,x=0,y=0,z=0,name='detail'){const o=new THREE.Mesh(g,materials[m]||m);o.name=name+'-'+(++serial);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
  function box(parent,w,h,d,x,y,z,m='shell',name='panel',bevel=false){let key=[bevel?'bevel':'box',w,h,d].join('/');let g=geometry(key,()=>{
    if(!bevel)return new THREE.BoxGeometry(w,h,d);
    const r=Math.min(.035,w*.1,h*.1,d*.24),s=new THREE.Shape();
    s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.lineTo(w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.lineTo(w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.lineTo(-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.closePath();
    const g=new THREE.ExtrudeGeometry(s,{depth:Math.max(.005,d-2*r),bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:r*.45,bevelThickness:r,curveSegments:1});g.translate(0,0,-d/2+r);return g;
  });return mesh(g,m,parent,x,y,z,name);}
  function cyl(parent,r,h,x,y,z,m='steel',axis='y',r2=r,segments=12,name='turned-part'){
    const g=geometry(['cyl',r,r2,h,segments].join('/'),()=>new THREE.CylinderGeometry(r,r2,h,segments));
    const o=mesh(g,m,parent,x,y,z,name);if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;return o;
  }
  function plane(parent,w,h,x,y,z,m,name='interface'){return mesh(geometry(['plane',w,h].join('/'),()=>new THREE.PlaneGeometry(w,h)),m,parent,x,y,z,name);}
  function beam(parent,a,b,width,depth,m='steel'){
    const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),mid=av.clone().add(bv).multiplyScalar(.5);
    const o=box(parent,width,av.distanceTo(bv),depth,mid.x,mid.y,mid.z,m,'brace');o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize());return o;
  }
  function bolt(parent,x,y,z,r=.015){cyl(parent,r,.017,x,y,z,'silver','z',r,6,'hex-fastener');}
  function cable(parent,points,r=.023){const curve=new THREE.CatmullRomCurve3(points.map(v=>new THREE.Vector3(...v)));return mesh(new THREE.TubeGeometry(curve,Math.max(16,points.length*2),r,5,false),'rubber',parent,0,0,0,'flexible-conduit');}
  function part(name,explode=[0,0,0]){const g=new THREE.Group();g.name=name;g.userData={part:name,explode};root.add(g);return g;}
  const base=part('base'),enclosure=part('enclosure',[0,.65,-.65]),table=part('table',[0,.25,.65]),axes=part('axes',[0,.2,-.32]),spindle=part('spindle',[0,.78,0]),toolchanger=part('toolchanger',[-.5,.55,1.3]),control=part('control',[.8,.1,.1]),chip=part('conveyor',[-.7,0,.2]);
  const front=p.d/2,ow=p.opening,wall=(p.w-ow)/2,h=p.h;
  box(base,p.w,.31,p.d+.08,0,.26,0,'base','foundation-casting',true);
  box(base,p.w-.1,.30,p.d-.06,0,.55,0,'shell','lower-tray',true);
  // Visible casting ribs and adjustable leveling pads.
  for(const x of [-p.w/2+.2,p.w/2-.2])for(const z of [-p.d/2+.25,p.d/2-.2]){
    cyl(base,.082,.055,x,.055,z,'darkSteel','y',.105,16,'leveling-pad');cyl(base,.036,.12,x,.12,z,'steel');
  }
  for(let x=-p.w/2+.25;x<p.w/2-.1;x+=.39)box(base,.055,.21,p.d*.75,x,.52,0,'edge','casting-rib');

  // Bed, crossed slides, guideways and screw mechanisms.
  box(axes,.91,.27,p.d*.69,0,.78,-.12,'darkSteel','saddle-casting',true);
  for(const x of [-.36,.36]){
    box(axes,.065,.08,p.d*.68,x,.97,-.12,'steel','y-linear-rail');
    for(const z of [-.5,.05,.45]){box(axes,.14,.1,.16,x,1.04,z,'darkSteel','linear-bearing-block');bolt(axes,x,1.09,z);}
  }
  cyl(axes,.035,p.d*.65,0,.98,-.1,'silver','z',.035,12,'y-ball-screw');
  box(axes,.37,1.46,.31,0,1.64,-p.d*.35,'base','z-axis-column',true);
  for(const x of [-.125,.125])box(axes,.043,1.23,.055,x,1.7,-p.d*.35+.19,'steel','z-guideway');
  cyl(axes,.03,1.2,0,1.7,-p.d*.35+.2,'silver','y',.03,12,'z-ball-screw');
  // Machined T-slot worktable, with machined edges and mounting fixtures.
  box(table,p.table,.17,p.tableDepth,0,1.11,.16,'steel','slotted-worktable',true);
  const slots=id==='nano-x8'?3:5;
  for(let i=0;i<slots;i++)box(table,p.table-.04,.009,.021,0,1.201,.16+(i-(slots-1)/2)*p.tableDepth*.17,'edge','t-slot');
  for(let x=-p.table/2+.13;x<p.table/2;x+=.24)for(const z of [.16-p.tableDepth*.34,.16+p.tableDepth*.34])bolt(table,x,1.205,z,.011);
  box(table,p.table*.54,.105,p.tableDepth*.72,0,1,.11,'darkSteel','x-axis-slide');
  cyl(table,.024,p.table*.88,0,.96,.12,'silver','x',.024,12,'x-ball-screw');
  // Spindle cartridge and tool holder, carried on the Z carriage.
  box(spindle,.43,.79,.49,0,2.10,-.10,'shell','spindle-head',true);
  box(spindle,.35,.4,.08,0,2.15,.19,'steel','spindle-service-cover',true);
  for(const x of [-.13,.13])for(const y of [2.01,2.28])bolt(spindle,x,y,.238);
  cyl(spindle,.17,.15,0,1.65,-.03,'darkSteel','y',.17,24,'spindle-flange');
  cyl(spindle,.12,.20,0,1.49,-.03,'silver','y',.10,24,'bt40-spindle-nose');
  cyl(spindle,.07,.12,0,1.33,-.03,'steel','y',.045,16,'tool-holder');
  cyl(spindle,.024,.15,0,1.20,-.03,'silver','y',.019,10,'cutting-tool');
  for(let i=0;i<8;i++){const a=i*Math.PI/4;cyl(spindle,.009,.012,Math.cos(a)*.14,1.57,Math.sin(a)*.14-.03,'silver');}
  cable(spindle,[[-.19,2.3,.12],[-.3,2.12,.29],[-.27,1.65,.3],[-.18,1.43,.11]],.018);
  // Arm-type 24-tool magazine. All 24 tool positions are modeled individually.
  const atcx=-ow/2-.02,atcy=2.13,atcz=-.26;
  cyl(toolchanger,.43,.10,atcx,atcy,atcz,'darkSteel','y',.43,32,'atc-carousel');
  cyl(toolchanger,.12,.15,atcx,atcy+.1,atcz,'steel','y',.12,20,'atc-hub');
  for(let i=0;i<24;i++){const a=i*Math.PI/12,x=atcx+Math.cos(a)*.35,z=atcz+Math.sin(a)*.35;
    cyl(toolchanger,.036,.055,x,atcy+.07,z,'edge','y',.036,8,'tool-pocket-'+(i+1));
    cyl(toolchanger,.027,.15,x,atcy-.10,z,'silver','y',.012,8,'stored-tool-'+(i+1));
  }
  box(toolchanger,.63,.07,.09,atcx+.27,atcy-.04,atcz+.36,'steel','tool-exchange-arm');
  // Independent exterior assembly for this exact machine, rather than a scaled shared shell.
  const exteriorAnchors=buildExterior({THREE,p,id,parts:{base,enclosure,control,chip},mesh,cyl,plane,bolt,cable,part});
  for(const assembly of [table,axes,spindle,toolchanger])assembly.position.x=p.offset;
  root.userData.anchors={
    spindle:[p.offset,1.75,.17],table:[p.offset,1.2,.38],
    toolchanger:[atcx+p.offset,atcy+.12,atcz],axes:[p.offset+.15,1.72,-p.d*.25],
    ...exteriorAnchors
  };
  root.userData.meshCount=serial;
  return root;
}
