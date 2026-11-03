export async function buildQuotation({model,accessories,totals,details,dates,terms,included}){
  if(!window.PDFLib)throw new Error('PDF library unavailable');
  const {PDFDocument,StandardFonts,rgb}=window.PDFLib;
  const pdf=await PDFDocument.create();const regular=await pdf.embedFont(StandardFonts.Helvetica),bold=await pdf.embedFont(StandardFonts.HelveticaBold);
  pdf.setTitle(`NANYA CNC ${model.name} — Machine Quotation`);pdf.setAuthor('NANYA CNC');pdf.setSubject('Machine configuration, technical specifications and quotation terms');
  const c={ink:rgb(.14,.18,.2),muted:rgb(.43,.48,.49),line:rgb(.82,.85,.83),light:rgb(.95,.96,.94),orange:rgb(.94,.36,.1),white:rgb(1,1,1)};
  const W=595.28,H=841.89,M=45;let page,y,pageNo=0;
  const clean=s=>String(s??'').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[\u2013\u2014]/g,'-').replace(/\u2265/g,'>=').replace(/\u2080/g,'0').replace(/\u2192/g,'>').replace(/[^\x20-\x7e\xa0-\xff\n]/g,'');
  function text(t,x,y,size=9,font=regular,color=c.ink){page.drawText(clean(t),{x,y,size,font,color});}
  function right(t,y,size=9,font=regular,color=c.ink){const str=clean(t);text(str,W-M-font.widthOfTextAtSize(str,size),y,size,font,color);}
  function line(y0){page.drawLine({start:{x:M,y:y0},end:{x:W-M,y:y0},thickness:.55,color:c.line});}
  function newPage(title){page=pdf.addPage([W,H]);pageNo++;y=H-M;text('NANYA',M,y-18,21,bold);text('CNC',M+83,y-18,15,bold,c.orange);right(title.toUpperCase(),y-9,7,bold,c.muted);right(dates.id,y-23,7,regular,c.muted);line(y-35);y-=65;return page;}
  function ensure(h){if(y-h<65)newPage('Quotation details - continued');}
  function wrap(input,width,size=9,font=regular){const lines=[];for(const paragraph of clean(input).split('\n')){let current='';for(const word of paragraph.split(/\s+/)){if(!word)continue;if(font.widthOfTextAtSize(word,size)>width){if(current){lines.push(current);current='';}let part='';for(const char of word){if(font.widthOfTextAtSize(part+char,size)>width){lines.push(part);part=char;}else part+=char;}current=part;continue;}const next=current?current+' '+word:word;if(font.widthOfTextAtSize(next,size)>width&&current){lines.push(current);current=word;}else current=next;}lines.push(current);}return lines;}
  function paragraph(input,{width=W-M*2,size=9,color=c.muted,font=regular,leading=size*1.65,indent=0}={}){for(const t of wrap(input,width,size,font)){ensure(leading);text(t,M+indent,y,size,font,color);y-=leading;}}
  function section(title){ensure(43);y-=10;text(title.toUpperCase(),M,y,8,bold,c.orange);y-=20;}
  function row(label,value,{font=regular,size=9,fill=false}={}){const rows=wrap(label,W-M*2-140,size,font);const h=Math.max(31,rows.length*13+12);ensure(h);if(fill)page.drawRectangle({x:M-10,y:y-h+12,width:W-2*M+20,height:h,color:c.light});rows.forEach((r,i)=>text(r,M,y-i*13,size,font));right(value,y,size,font);y-=h;line(y+13);}
  newPage('CNC Machine Quotation');
  text('PREPARED FOR',M,y,7,bold,c.muted);text('ISSUED',W-190,y,7,bold,c.muted);y-=18;
  const nameLines=wrap(details.name,290,13,bold);nameLines.forEach((l,i)=>text(l,M,y-i*17,13,bold));text(dates.date,W-190,y,9);y-=Math.max(nameLines.length*17,20);
  if(details.company)paragraph(details.company,{size:9,width:300,color:c.ink});paragraph(details.email,{size:9,width:300});
  text('VALID UNTIL '+dates.valid,W-190,y+8,8,regular,c.muted);y-=16;
  const bandH=130;ensure(bandH);page.drawRectangle({x:M-10,y:y-bandH+10,width:W-M*2+20,height:bandH,color:c.light});
  try{const r=await fetch(model.image);if(!r.ok)throw new Error();const im=await pdf.embedPng(await r.arrayBuffer());const d=im.scaleToFit(210,105);page.drawImage(im,{x:M+4,y:y-bandH+20,width:d.width,height:d.height});}catch{}
  const tx=M+245;text(model.series.toUpperCase(),tx,y-16,6,bold,c.orange);text(model.name,tx,y-44,25,bold);text('3-axis vertical machining center',tx,y-64,8,regular,c.muted);text('MITSUBISHI M80A | 12,000 RPM',tx,y-81,8,regular,c.muted);text(model.travel.join(' x ')+' mm travel',tx,y-97,8,regular,c.muted);y-=bandH+20;
  section('Your configuration');text('DESCRIPTION',M,y,7,bold,c.muted);right('AMOUNT / USD',y,7,bold,c.muted);y-=15;line(y+4);y-=15;
  const money=n=>'$'+n.toLocaleString('en-US');row(`${model.name} - CNC vertical machining center`,money(model.price));
  for(const a of accessories)row(a.name,a.price===null?'On request':money(a.price));
  if(!accessories.length)row('Optional accessories','None selected',{size:8});
  y-=7;row(totals.onRequest?'Calculated total':'Quotation total',money(totals.total),{font:bold,size:13,fill:true});y-=8;
  if(totals.onRequest)paragraph('Optical scale pricing is on request and excluded from the calculated total. The final total is subject to confirmation.',{size:8,color:c.orange});
  paragraph('Price basis: FOB Shanghai sea-port. All amounts are in USD. Quotation valid for 30 days from the issue date.',{size:8});
  if(details.notes){section('Project notes');paragraph(details.notes,{size:9,color:c.ink});}
  section('Terms & conditions');terms.forEach((t,i)=>paragraph(`${i+1}. ${t}`,{size:8,leading:14}));
  newPage('Technical Specifications');
  text(model.name+' / STANDARD FEATURES',M,y,16,bold);y-=24;paragraph(model.description,{size:9});
  for(const spec of model.specs){section(spec.title);for(const [key,value] of spec.rows){const left=wrap(key,165,8),rightLines=wrap(value,310,8),h=Math.max(left.length,rightLines.length)*13+12;ensure(h);left.forEach((l,i)=>text(l,M,y-i*13,8,regular,c.muted));rightLines.forEach((l,i)=>text(l,M+190,y-i*13,8));y-=h;line(y+9);}}
  section('Standard accessories package');for(const item of included){ensure(18);text('+',M,y,9,bold,c.orange);paragraph(item,{size:8,color:c.ink,indent:15,width:W-2*M-15,leading:17});}
  const pages=pdf.getPages();pages.forEach((p,index)=>{page=p;line(44);text('NANYA CNC / '+model.name,M,30,7,regular,c.muted);right(`${index+1} / ${pages.length}`,30,7,regular,c.muted);});
  return pdf.save();
}
