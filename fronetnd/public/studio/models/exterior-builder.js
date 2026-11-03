// Individually composed enclosures; shared helpers only make fabrication parts.
export function buildExterior({THREE,p,id,parts,mesh,cyl,plane,bolt,cable,part}) {
  const {base,enclosure,control,chip}=parts;
  const front=p.d/2,left=-p.w/2,right=p.w/2,ol=p.offset-p.opening/2,orr=p.offset+p.opening/2,anchors={};
  function outline(w,h,r=0,cx=0,cy=0){
    const s=new THREE.Shape(),x=cx-w/2,y=cy-h/2;r=Math.min(r,w/2,h/2);
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
    s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
    s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);s.closePath();return s;
  }
  function extrusion(shape,d,bevel=0){
    const g=new THREE.ExtrudeGeometry(shape,{depth:d-2*bevel,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:2,curveSegments:4,steps:1});
    g.translate(0,0,-d/2+bevel);return g;
  }
  const geometries=new Map();
  function box(parent,w,h,d,x,y,z,m='shell',name='panel',r=0){
    const key=[w,h,d,r].join('/');if(!geometries.has(key)){
      const g=r?extrusion(outline(w,h,r),d,Math.min(.009,d*.12)):new THREE.BoxGeometry(w,h,d);
      if(r){const uv=g.attributes.uv,position=g.attributes.position;for(let i=0;i<uv.count;i++)uv.setXY(i,position.getX(i)/w+.5,position.getY(i)/h+.5);}
      geometries.set(key,g);
    }
    return mesh(geometries.get(key),m,parent,x,y,z,name);
  }
  function beam(parent,a,b,w,d,m='steel',name='brace'){
    const av=new THREE.Vector3(...a),v=new THREE.Vector3(...b).sub(av),mid=av.clone().addScaledVector(v,.5);
    const o=box(parent,w,v.length(),d,mid.x,mid.y,mid.z,m,name);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize());return o;
  }
  function rearAndRoof(roof=.12){
    box(enclosure,p.opening,p.h-.64,.07,p.offset,(p.h+.64)/2,-p.d/2,'shell','rear-splash-guard',.02);
    box(enclosure,p.opening,roof,p.d,p.offset,p.h-roof/2,0,'shell','front-roof-bridge',.025);
    box(enclosure,p.opening+.06,.035,.055,p.offset,p.h+.025,front-.035,'edge','door-top-track');
    box(enclosure,p.opening+.06,.045,.07,p.offset,p.bottom-.025,front+.03,'edge','door-bottom-track');
  }
  function cabinet(x0,x1,y0,y1,name,corner=.035){
    const s=new THREE.Shape(),points=[[x0,y0],[x1,y0],[x1,y1-corner],[x1-corner,y1],[x0+corner,y1],[x0,y1-corner]];
    points.forEach(([x,y],i)=>i?s.lineTo(x,y):s.moveTo(x,y));s.closePath();
    mesh(extrusion(s,p.d,.009),'shell',enclosure,0,0,0,name);
  }
  function badge(x,y,w=.5){plane(enclosure,w,w*.45,x,y,front+.025,'label','model-specific-badge');anchors.enclosure=[x,y,front+.1];}
  function placard(x,y){plane(enclosure,.15,.34,x,y,front+.027,'safety','service-placard');}
  function seam(points){for(let i=1;i<points.length;i++)beam(enclosure,[...points[i-1],front+.026],[...points[i],front+.026],.008,.008,'accent','gold-stepped-seam');}
  function fascia(y,h){
    box(base,p.opening+.035,h,.055,p.offset,y,front+.06,'steel','brushed-stainless-front-apron',.01);
    plane(base,p.opening-.01,h-.02,p.offset,y,front+.091,'fascia','engraved-model-and-website');
    for(const x of [ol+.035,orr-.035])bolt(base,x,y,front+.098,.009);
  }
  function sidePanel({window=false,cols=0,rows=0,depth=p.d*.66,lowerOpening=false}={}){
    const x=right+.012,z=-.04,y=p.h*.58,ph=p.h*.63;
    box(enclosure,.025,ph,depth,x,y,z,'edge','right-service-door',.02);
    if(window){
      box(enclosure,.027,ph*.69,depth*.39,x+.016,y+.025,z,'rubber','side-window-surround',.025);
      const glass=plane(enclosure,depth*.34,ph*.64,0,0,0,'glass','right-side-glazed-access');glass.rotation.y=Math.PI/2;glass.position.set(x+.055,y+.025,z);
      cyl(enclosure,.014,.51,x+.061,y,z+depth*.26,'silver','y',.014,12,'side-access-handle');
      for(const yy of [y-.23,y+.23])box(enclosure,.057,.025,.035,x+.03,yy,z+depth*.26,'steel','side-handle-mount');
    }
    for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
      const vy=y+.10+(row-(rows-1)/2)*.119,vz=z-.15+(col-(cols-1)/2)*.068;
      box(enclosure,.009,.086,.034,x+.054,vy,vz,'steel','rectangular-vent-opening');
      box(enclosure,.012,.068,.018,x+.060,vy,vz,'edge','vent-recess');
    }
    for(const yy of [y-ph/2+.04,y+ph/2-.04])for(const zz of [z-depth/2+.04,z+depth/2-.04])cyl(enclosure,.010,.014,x+.029,yy,zz,'steel','x',.010,6,'side-panel-fastener');
    if(lowerOpening){
      box(enclosure,.022,.39,.25,x+.015,.41,front-.27,'edge','lower-service-recess');
      for(const zz of [front-.415,front-.125])box(enclosure,.033,.42,.018,x+.027,.41,zz,'shell','lower-access-frame');
      box(enclosure,.035,.022,.31,x+.027,.625,front-.27,'shell','lower-access-lintel');
    }
    box(enclosure,.025,.28,p.d*.78,x,.32,-.03,'edge','lower-side-skirt');
  }
  function doors({windowH,windowRatio=.7,radius=.06,braces=false,handle=1.0}){
    for(const side of [-1,1]){
      const door=part(side<0?'door-left':'door-right',[side*.75,0,.17]);
      const dw=p.opening/2-.01,dh=p.top-p.bottom,dy=(p.top+p.bottom)/2,wx=side*.023,wy=dy+.035,ww=dw*windowRatio;
      door.position.x=p.offset+side*p.opening/4;door.userData.slide=side*p.opening*.47;
      const shape=outline(dw,dh,.018);shape.holes.push(outline(ww+.024,windowH+.024,radius,wx,wy-dy));
      mesh(extrusion(shape,.065,.004),'door',door,0,dy,front+.035,'cut-out-sliding-door');
      box(door,ww+.023,windowH+.023,.016,wx,wy,front+.032,'rubber','window-gasket',radius);
      box(door,ww,windowH,.021,wx,wy,front+.045,'glass','model-specific-window',radius);
      if(braces){
        const x0=wx-ww*.47,x1=wx+ww*.47,y0=wy-windowH*.47,y1=wy+windowH*.47;
        beam(door,[x0,y0,front+.071],[x1,y1,front+.071],.073,.041,'shell','diagonal-window-stiffener');
        if(braces==='cross')beam(door,[x0,y1,front+.075],[x1,y0,front+.075],.073,.041,'shell','cross-window-stiffener');
      }
      const hx=-side*(dw/2-.063),hy=dy+.01;
      cyl(door,.014,handle,hx,hy,front+.145,'silver','y',.014,16,'full-height-door-pull');
      for(const yy of [hy-handle*.45,hy+handle*.45])box(door,.028,.025,.082,hx,yy,front+.101,'steel','door-pull-standoff');
      box(door,.010,dh-.025,.018,-side*(dw/2-.014),dy,front+.08,'edge','meeting-stile');
      for(const yy of [p.bottom+.045,p.top-.045])bolt(door,side*(dw/2-.04),yy,front+.075,.009);
    }
  }
  function tower(x,w,h,z=-.18){
    box(enclosure,w,h,.52,x,p.h+h/2,z,'door','raised-spindle-motor-tower',.025);
    box(enclosure,w+.025,.025,.54,x,p.h+h,z,'edge','motor-tower-cap');
    plane(enclosure,w*.68,.15,x,p.h+h*.72,z+.27,'label','tower-model-badge');
  }
  function statusLight(x,z){
    cyl(enclosure,.018,.37,x,p.h+.21,z,'darkSteel','y',.018,12,'tower-light-stem');
    for(let i=0;i<3;i++)cyl(enclosure,.034,.06,x,p.h+.42+i*.063,z,i===0?'green':i===1?'orange':'silver','y',.034,16,'status-light-segment');
    cyl(enclosure,.037,.016,x,p.h+.60,z,'edge','y',.037,16,'tower-light-cap');
  }
  function console({x,y=1.94,z=front+.28,pedestal=false}){
    const cw=p.console,ch=1.0,postx=x+.04,postz=z-.19;
    cyl(control,.035,.77,postx,p.h-.03,postz,'darkSteel','y',.035,16,'overhead-console-pivot');
    box(control,.43,.07,.16,x-.12,p.h+.31,postz,'shell','overhead-cantilever-arm',.025);
    cyl(control,.075,.11,postx,p.h+.31,postz,'door','y',.075,20,'console-pivot-cap');
    box(control,cw+.04,ch+.06,.19,x,y,z,'door','operator-console-casting',.035);
    box(control,cw,ch,.032,x,y,z+.108,'shell','console-face-bezel',.02);
    plane(control,cw*.94,ch*.91,x,y+.015,z+.128,'control','mitsubishi-display-and-keypad');
    box(control,cw*.83,.095,.07,x,y-ch*.57,z+.04,'edge','recessed-console-tray',.02);
    cyl(control,.04,.014,x-cw*.30,y-.35,z+.151,'yellow','z',.04,20,'emergency-stop-backing');
    cyl(control,.027,.024,x-cw*.30,y-.35,z+.168,'red','z',.03,16,'emergency-stop');
    for(let i=0;i<3;i++)cyl(control,.021,.021,x-.015+i*.078,y-.35,z+.152,'darkSteel','z',.021,16,'override-dial');
    if(pedestal)box(control,.16,.73,.14,x,y-.9,z-.05,'shell','console-lower-support',.02);
    const points=[];for(let i=0;i<55;i++){const t=i/54;points.push([x+cw*.43+Math.cos(t*22*Math.PI)*.026,y-.57-t*.77,z-.02+Math.sin(t*22*Math.PI)*.026]);}
    cable(control,points,.008);
    cable(control,[[x-.12,y-.53,z+.01],[x-.12,.58,z+.05],[x+.11,.52,z+.05],[x+.13,y-.5,z]],.012);
    anchors.control=[x,y+.12,z+.18];
  }
  function bin(x,z,w=.4){
    box(chip,w,.04,.44,x,.14,z,'darkSteel','trolley-floor');
    for(const xx of [x-w/2,x+w/2])box(chip,.021,.38,.44,xx,.34,z,'shell','trolley-side-wall');
    box(chip,w,.38,.022,x,.34,z-.22,'shell','trolley-rear-wall');
    box(chip,w,.25,.022,x,.27,z+.22,'shell','trolley-low-front-wall');
    for(const xx of [x-w/2+.05,x+w/2-.05])for(const zz of [z-.16,z+.16]){
      cyl(chip,.031,.03,xx,.073,zz,'rubber','z',.031,12,'trolley-caster');
      box(chip,.024,.05,.032,xx,.12,zz,'steel','caster-yoke');
    }
    for(const xx of [x-w/2,x+w/2])beam(chip,[xx,.52,z-.22],[xx,.70,z-.25],.017,.017,'darkSteel','trolley-handle-post');
    beam(chip,[x-w/2,.70,z-.25],[x+w/2,.70,z-.25],.017,.017,'darkSteel','trolley-push-handle');
  }
  function chute(reach,z){
    const o=box(chip,reach,.14,.30,left-reach/2,.49,z,'darkSteel','left-chip-outlet');o.rotation.z=-.18;
    for(const zz of [z-.15,z+.15]){const rail=box(chip,reach,.042,.024,left-reach/2,.58,zz,'shell','chip-outlet-side-rail');rail.rotation.z=-.18;}
    bin(left-reach-.03,z,.44);anchors.conveyor=[left-reach*.7,.55,z+.22];
  }
  function conveyor(reach,height){
    const z=.1,lo=new THREE.Vector3(left-.20,.27,z),hi=new THREE.Vector3(left-reach,height,z);
    box(chip,.60,.19,.40,left-.15,.28,z,'edge','horizontal-chain-trough',.02);
    const belt=beam(chip,lo.toArray(),hi.toArray(),.38,.38,'door','inclined-chain-conveyor');
    for(let i=0;i<13;i++){const v=lo.clone().lerp(hi,i/12),cleat=box(chip,.40,.025,.39,v.x,v.y,v.z,'darkSteel','conveyor-chain-flight');cleat.quaternion.copy(belt.quaternion);}
    for(const dz of [-.22,.22])beam(chip,[lo.x,lo.y,z+dz],[hi.x,hi.y,z+dz],.05,.033,'shell','raised-belt-sidewall');
    box(chip,.32,.28,.46,hi.x-.02,hi.y+.08,z,'shell','conveyor-drive-head',.028);
    cyl(chip,.08,.18,hi.x-.19,hi.y+.04,z,'darkSteel','z',.08,16,'belt-motor');
    box(chip,.18,.05,.30,hi.x-.20,hi.y-.14,z,'edge','discharge-lip');
    beam(chip,[left-.42,.06,z-.20],[left-.44,.55,z-.20],.033,.033,'darkSteel','conveyor-support-leg');
    for(const dz of [-.2,.2])cyl(chip,.025,.035,left-.42,.07,z+dz,'rubber','z',.025,10,'conveyor-caster');
    bin(hi.x-.15,z,.48);anchors.conveyor=[hi.x+.03,.85,z+.25];
  }
  function steps(width,depth){
    box(base,width,.24,depth,p.offset,.18,front+depth*.72,'door','lower-access-platform',.016);
    box(base,width,.26,depth*.70,p.offset,.42,front+depth*.33,'door','upper-access-platform',.016);
    for(const [cy,cz,dep] of [[.305,front+depth*.72,depth],[.555,front+depth*.33,depth*.70]]){
      for(let xx=-width/2+.07;xx<width/2-.02;xx+=.19)for(let zz=-dep/2+.055;zz<dep/2-.01;zz+=.18){
        const lug=box(base,.047,.003,.012,p.offset+xx,cy,cz+zz,'darkSteel','diamond-tread');lug.rotation.y=((Math.round(xx/.19)+Math.round(zz/.18))%2?1:-1)*Math.PI/4;
      }
    }
  }
  // Separate assemblies preserve the real family similarities and differences.
  const exteriors={
    'nano-x8'(){
      cabinet(left,ol,.37,p.h,'x8-narrow-upright-service-tower',.025);
      cabinet(orr,right,.37,p.h-.025,'x8-console-side-column',.02);rearAndRoof(.15);
      box(enclosure,.83,.30,.58,left+.65,p.h+.13,-.32,'door','x8-left-roof-step',.018);
      tower(.22,.43,.63,-.10);box(enclosure,.70,.03,.61,left+.66,p.h+.30,-.32,'edge','x8-roof-stack-cap');
      doors({windowH:.96,windowRatio:.68,radius:.065,handle:1.03});fascia(.76,.43);
      badge(left+.34,2.17,.54);placard(left+.45,1.58);sidePanel({cols:2,rows:5,depth:.97});
      console({x:right-.13,y:1.91,z:front+.21,pedestal:true});chute(.40,.22);statusLight(right-.22,front-.18);
      box(enclosure,.30,.03,.24,left-.12,1.95,-.10,'darkSteel','x8-upper-service-shelf');
      box(enclosure,.24,.025,.25,left-.10,1.40,-.10,'steel','x8-lower-service-shelf');
    },
    'nano-x10'(){
      cabinet(left,ol,.36,p.h-.01,'x10-wide-left-service-cabinet',.028);
      cabinet(orr,right,.36,p.h-.02,'x10-wide-console-column',.025);rearAndRoof(.18);
      box(enclosure,1.02,.24,.69,left+.76,p.h+.11,-.36,'door','x10-wide-low-roof-stage',.02);
      box(enclosure,.88,.16,.59,left+.75,p.h+.29,-.38,'shell','x10-second-roof-stage',.02);
      tower(.19,.49,.64,-.12);box(enclosure,.24,.27,.45,.58,p.h+.13,-.23,'door','x10-adjacent-motor-cover',.02);
      doors({windowH:1.02,windowRatio:.72,radius:.068,handle:1.07});fascia(.75,.44);
      badge(left+.37,2.23,.59);placard(left+.50,1.62);sidePanel({cols:3,rows:5,depth:1.17});
      console({x:right-.14,y:1.94,z:front+.21,pedestal:true});chute(.58,.25);statusLight(right-.23,front-.18);
      box(enclosure,.34,.03,.26,left-.14,2.01,-.05,'darkSteel','x10-upper-service-shelf');
      box(enclosure,.27,.025,.29,left-.11,1.38,-.05,'steel','x10-lower-service-shelf');
    },
    'nv-855'(){
      cabinet(left,ol,.40,p.h-.04,'855-sculpted-left-service-upright',.05);
      cabinet(orr,right,.40,p.h,'855-deep-side-access-housing',.06);rearAndRoof(.14);
      box(enclosure,.85,.29,.74,-.61,p.h+.105,-.25,'shell','855-offset-wide-motor-housing',.025);
      box(enclosure,.39,.19,.46,.11,p.h+.08,-.44,'door','855-rear-drive-guard',.018);
      doors({windowH:1.12,windowRatio:.80,radius:.012,braces:'cross',handle:1.24});fascia(.78,.50);
      seam([[left+.055,p.h-.11],[left+.055,1.76],[left+.17,1.59],[left+.17,.93],[left+.27,.77],[left+.27,.40]]);
      badge(left+.29,2.30,.51);placard(left+.39,1.43);sidePanel({window:true,depth:p.d*.69});
      console({x:right-.29,y:1.97,z:front+.33});chute(.36,.27);statusLight(right-.25,front-.18);
      for(const x of [p.offset-.06,p.offset+.07])cyl(enclosure,.044,.008,x,p.top+.04,front+.10,'blue','z',.044,18,'round-safety-decal');
    },
    'nv-1165'(){
      cabinet(left,ol,.39,p.h-.015,'1165-wide-stepped-left-upright',.04);
      cabinet(orr,right,.39,p.h,'1165-overhead-control-housing',.045);rearAndRoof(.16);
      box(enclosure,.94,.22,.67,-.61,p.h+.095,-.29,'door','1165-rear-roof-step',.025);tower(.12,.43,.43,-.13);
      doors({windowH:1.14,windowRatio:.80,radius:.016,braces:'cross',handle:1.25});fascia(.79,.52);
      seam([[left+.06,p.h-.10],[left+.06,2.19],[left+.23,2.03],[left+.23,1.18],[left+.42,1.01],[left+.42,.42]]);
      badge(left+.39,2.34,.59);placard(left+.53,1.58);sidePanel({window:true,depth:p.d*.62});
      console({x:right-.27,y:2.00,z:front+.32});chute(.45,.22);statusLight(right-.27,front-.18);
      for(const x of [p.offset-.065,p.offset+.065])cyl(enclosure,.045,.008,x,p.top+.045,front+.10,'blue','z',.045,18,'round-safety-decal');
    },
    'nv-1270'(){
      cabinet(left,ol,.23,p.h,'1270-flat-left-monolithic-cabinet',.035);
      cabinet(orr,right,.23,p.h,'1270-flush-control-service-bay',.035);rearAndRoof(.105);
      box(enclosure,.78,.105,.55,-.36,p.h+.045,-.32,'door','1270-low-flat-roof-cover',.018);
      doors({windowH:1.33,windowRatio:.76,radius:.065,handle:1.18});fascia(.79,.205);
      badge(left+.41,2.30,.62);placard(left+.23,1.76);sidePanel({cols:2,rows:5,depth:p.d*.70});
      console({x:orr+.32,y:1.89,z:front+.16});conveyor(.96,1.20);steps(1.70,.64);statusLight(orr+.30,front-.12);
      cyl(enclosure,.018,.50,-.22,p.h+.25,-.34,'edge','y',.014,12,'1270-roof-antenna');
    },
    'nv-1470'(){
      cabinet(left,ol,.24,p.h-.035,'1470-recessed-left-front-pillar',.065);
      cabinet(orr,right,.24,p.h,'1470-deep-ventilated-right-cabinet',.065);rearAndRoof(.11);
      const roof=box(enclosure,1.34,.105,p.d*.65,-.34,p.h+.035,-.31,'door','1470-raked-back-roof-guard',.02);roof.rotation.x=.045;
      doors({windowH:1.34,windowRatio:.78,radius:.072,handle:1.20});fascia(.81,.20);
      badge(left+.36,2.35,.57);placard(left+.20,1.79);sidePanel({cols:4,rows:7,depth:p.d*.62,lowerOpening:true});
      console({x:orr+.32,y:1.94,z:front+.16});conveyor(1.02,1.24);steps(1.90,.73);statusLight(orr+.32,front-.16);
      cable(enclosure,[[orr+.12,p.h+.18,-.18],[orr+.12,p.h+.66,-.19],[orr+.18,p.h+.68,-.22],[orr+.21,p.h+.2,-.22]],.015);
      box(enclosure,.16,.10,.025,right-.20,.39,front+.025,'edge','1470-utility-socket-plate');
      for(let i=0;i<2;i++)cyl(enclosure,.019,.018,right-.24+i*.07,.39,front+.05,'silver','z',.019,12,'1470-utility-socket');
    },
    'nv-1670'(){
      cabinet(left,ol,.22,p.h,'1670-extended-left-front-cabinet',.035);
      cabinet(orr,right,.22,p.h,'1670-wide-flush-right-bay',.035);rearAndRoof(.10);
      box(enclosure,1.17,.095,.69,-.54,p.h+.038,-.39,'door','1670-long-low-roof-bridge',.018);
      box(enclosure,.43,.14,.51,-.20,p.h+.09,-.29,'shell','1670-raised-roof-step',.015);
      doors({windowH:1.43,windowRatio:.78,radius:.067,handle:1.28});fascia(.79,.205);
      badge(left+.42,2.38,.64);placard(left+.22,1.83);sidePanel({cols:3,rows:7,depth:p.d*.72,lowerOpening:true});
      console({x:orr+.32,y:1.97,z:front+.17});conveyor(1.18,1.30);steps(2.06,.70);statusLight(orr+.31,front-.17);
      cyl(enclosure,.017,.56,-.25,p.h+.28,-.30,'edge','y',.014,12,'1670-tall-roof-antenna');
      box(enclosure,p.w*.64,.78,.25,.04,1.38,-p.d/2-.13,'shell','1670-extended-rear-electrical-cabinet',.028);
      for(const x of [left+.35,0,right-.35])box(base,.06,.24,p.d*.80,x,.39,-.05,'edge','1670-heavy-bed-web');
    }
  };
  exteriors[id]();
  return anchors;
}
