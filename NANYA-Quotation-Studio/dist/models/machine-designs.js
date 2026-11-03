// Exterior layouts observed in the seven original product photographs.
// Visualization proportions are not manufacturer dimensioned CAD drawings.
export const MODEL_REVISION = 'machine-specific-2026-11-02';
export const PROFILES = {
  'nano-x8':  {w:2.70,h:2.45,d:1.85,opening:1.48,offset:.10,bottom:1.00,top:2.30,table:1.00,tableDepth:.50,window:'nano-narrow',angle:.26,console:.49},
  'nano-x10': {w:3.10,h:2.55,d:2.05,opening:1.80,offset:.12,bottom:1.00,top:2.39,table:1.20,tableDepth:.60,window:'nano-wide',angle:.29,console:.51},
  'nv-855':   {w:2.80,h:2.68,d:2.35,opening:1.58,offset:.01,bottom:1.05,top:2.53,table:1.00,tableDepth:.55,window:'nv-diagonal',angle:.62,console:.53},
  'nv-1165':  {w:3.24,h:2.72,d:2.22,opening:1.90,offset:.09,bottom:1.06,top:2.56,table:1.20,tableDepth:.60,window:'nv-cross',angle:.34,console:.55},
  'nv-1270':  {w:3.58,h:2.67,d:2.22,opening:1.86,offset:-.03,bottom:.91,top:2.56,table:1.30,tableDepth:.70,window:'production-tall',angle:.32,console:.56},
  'nv-1470':  {w:3.92,h:2.75,d:2.65,opening:2.06,offset:-.16,bottom:.94,top:2.62,table:1.50,tableDepth:.70,window:'production-deep',angle:.62,console:.58},
  'nv-1670':  {w:4.30,h:2.80,d:2.40,opening:2.44,offset:.02,bottom:.91,top:2.66,table:1.70,tableDepth:.70,window:'production-extended',angle:.30,console:.59}
};
export const DESIGNS = {
  'nano-x8': {name:'Compact twin-window enclosure',description:'Compact upright housing, narrow rounded windows, a tall central motor cover and a broad stainless apron. The console sits at the right edge; chips exit into a small wheeled trolley.',features:['Tall motor tower','Narrow rounded glazing','Compact chip trolley']},
  'nano-x10': {name:'Wide compact enclosure',description:'A wider compact housing with broader door glazing, a stepped double roof cover and a larger worktable. Its extended side chute feeds a separate chip trolley.',features:['Stepped double roof','Wider compact doors','Extended chip chute']},
  'nv-855': {name:'Deep reinforced enclosure',description:'Deep cabinet with diagonal door bracing, a gold stepped seam on the left service panel and a glazed right-side access door. The console hangs in front of the right door on an overhead arm.',features:['Diagonal door braces','Glazed side access','Offset roof housing']},
  'nv-1165': {name:'Wide cross-braced enclosure',description:'Wider cross-braced doors, a broad brushed-steel lower apron and a raised central motor tower. A tall service panel and overhead console retain the early NV enclosure layout.',features:['Full cross-braced glazing','Central motor tower','Broad stainless apron']},
  'nv-1270': {name:'Flat-roof production enclosure',description:'Flat-roof cabinet with two tall rounded windows, a flush right-side console bay and a two-level access platform. The external chain conveyor rises on the left of the machine.',features:['Flat production roof','Twin tall windows','Two-level front platform']},
  'nv-1470': {name:'Deep ventilated production enclosure',description:'A deeper right service housing with a rectangular ventilation grille, tall door glazing and a recessed lower service opening. A broad tread platform and an inclined chain conveyor complete its silhouette.',features:['Deep ventilated cabinet','Recessed service opening','Broad tread platform']},
  'nv-1670': {name:'Extended-bed production enclosure',description:'The widest enclosure in this lineup, with expanded twin doors and a longer bed for its 1,700 mm table. A low roof bridge, extended chain conveyor and wide two-level platform define its profile.',features:['Extended bed and doors','Low roof bridge','Long chain conveyor']}
};
