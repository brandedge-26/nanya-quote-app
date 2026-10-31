export type MachineSpecs = {
  guideWay: string;
  cncSystem: string;
  spindleDrive: string;
  motorCapacity: string;
  travel: { x: string; y: string; z: string };
  spindleCenterToZRail: string;
  spindleNoseToTable: string;
  table: { size: string; tSlot: string; maxLoad: string };
  spindle: {
    taper: string;
    driveType: string;
    speed: string;
    motorPower: string;
  };
  feed: { rapidTraverse: string; cuttingFeedRate: string };
  toolChanger: {
    magazine: string;
    toolToToolTiming: string;
    maxToolDiaLength: string;
    maxToolWeight: string;
    maxToolDiaFull: string;
    maxToolDiaNoAdjacent: string;
  };
  motors: { spindle: string; xAxis: string; yAxis: string; zAxis: string };
  accuracy: { positioning: string; repeat: string };
  utilities: {
    coolantTank: string;
    electricPower: string;
    pneumaticSupply: string;
    groundClearance: string;
    machineWeight: string;
  };
};

// Sourced from QUOTATION APPS FORMATS.xlsx, "1:2 MACHINE DETAIL FEATURES" section of each machine sheet.
export const machineSpecs: Record<string, MachineSpecs> = {
  "nano-x8": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "5.5-7.5kW, Torque: 47.8N/m",
    travel: { x: "800mm", y: "500mm", z: "550mm" },
    spindleCenterToZRail: "560mm",
    spindleNoseToTable: "85-635mm",
    table: { size: "1000mm x 500mm", tSlot: "3 x 18 x 102mm", maxLoad: "700 Kg" },
    spindle: { taper: "BT40-140", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "7.5kW, Torque 47.8N/m" },
    feed: { rapidTraverse: "X:48 Y:48 Z:48 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "1.85 sec",
      maxToolDiaLength: "Ø80 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø80mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D7.5/12000, 5.5-7.5kW",
      xAxis: "HG204S-D30 (2.0kW)",
      yAxis: "HG204S-D30 (2.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "2300 x 2200 x 2400mm",
      machineWeight: "4,600 kg (4.6 tons)",
    },
  },
  "nano-x10": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "7.5-11kW, Torque: 210N/m",
    travel: { x: "1020mm", y: "600mm", z: "600mm" },
    spindleCenterToZRail: "620mm",
    spindleNoseToTable: "110-705mm",
    table: { size: "1200mm x 600mm", tSlot: "5 x 18 x 105mm", maxLoad: "800 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11kW, Torque 210N/m" },
    feed: { rapidTraverse: "X:40 Y:40 Z:40 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "1.85 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 7.5-11kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "2900 x 2400 x 2600mm",
      machineWeight: "5,500 kg (5.5 tons)",
    },
  },
  "nv-855": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "11-18.5kW, Torque: 296N/m",
    travel: { x: "830mm", y: "550mm", z: "550mm" },
    spindleCenterToZRail: "595mm",
    spindleNoseToTable: "140-690mm",
    table: { size: "1000mm x 550mm", tSlot: "5 x 18 x 100mm", maxLoad: "800 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11-18.5kW, Torque 296N/m" },
    feed: { rapidTraverse: "X:40 Y:40 Z:40 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "2.0 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 11-18.5kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "2500 x 2200 x 2400mm",
      machineWeight: "5,500 kg (5.5 tons)",
    },
  },
  "nv-1165": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "11-18.5kW, Torque: 296N/m",
    travel: { x: "1100mm", y: "650mm", z: "600mm" },
    spindleCenterToZRail: "680mm",
    spindleNoseToTable: "130-730mm",
    table: { size: "1200mm x 600mm", tSlot: "5 x 18 x 100mm", maxLoad: "800 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11-18.5kW, Torque 296N/m" },
    feed: { rapidTraverse: "X:40 Y:40 Z:40 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "2.0 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 11-18.5kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "2700 x 2300 x 2550mm",
      machineWeight: "6,500 kg (6.5 tons)",
    },
  },
  "nv-1270": {
    guideWay: "4-Line Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "11-18.5kW, Torque: 296N/m",
    travel: { x: "1200mm", y: "700mm", z: "700mm" },
    spindleCenterToZRail: "750mm",
    spindleNoseToTable: "100-800mm",
    table: { size: "1300mm x 700mm", tSlot: "5 x 18 x 120mm", maxLoad: "1200 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11-18.5kW, Torque 296N/m" },
    feed: { rapidTraverse: "X:30 Y:30 Z:30 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "2.4 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 11-18.5kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "3500 x 2400 x 2650mm",
      machineWeight: "8,000 kg (8 tons)",
    },
  },
  "nv-1470": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "11-18.5kW, Torque: 296N/m",
    travel: { x: "1400mm", y: "700mm", z: "700mm" },
    spindleCenterToZRail: "750mm",
    spindleNoseToTable: "100-800mm",
    table: { size: "1500mm x 700mm", tSlot: "5 x 18 x 120mm", maxLoad: "1200 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11-18.5kW, Torque 296N/m" },
    feed: { rapidTraverse: "X:30 Y:30 Z:30 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "2.0 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 11-18.5kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "4000 x 2400 x 2650mm",
      machineWeight: "8,600 kg (8.6 tons)",
    },
  },
  "nv-1670": {
    guideWay: "Linear Motion Guide Way (Roller Type)",
    cncSystem: "MITSUBISHI M80A",
    spindleDrive: "Direct Driven (DDS)",
    motorCapacity: "11-18.5kW, Torque: 296N/m",
    travel: { x: "1600mm", y: "700mm", z: "700mm" },
    spindleCenterToZRail: "750mm",
    spindleNoseToTable: "100-800mm",
    table: { size: "1700mm x 700mm", tSlot: "5 x 18 x 120mm", maxLoad: "1500 Kg" },
    spindle: { taper: "BT40-150", driveType: "Direct Drive", speed: "12,000 Rpm", motorPower: "11-18.5kW, Torque 296N/m" },
    feed: { rapidTraverse: "X:30 Y:30 Z:30 m/min", cuttingFeedRate: "12 mm/min" },
    toolChanger: {
      magazine: "Arm-type, 24 Tools",
      toolToToolTiming: "2.0 sec",
      maxToolDiaLength: "Ø100 x 300mm (Ø78 x 300mm with neighbor)",
      maxToolWeight: "7kg",
      maxToolDiaFull: "Ø100mm",
      maxToolDiaNoAdjacent: "Ø300mm",
    },
    motors: {
      spindle: "SJ-D11/12000, 11-18.5kW",
      xAxis: "HG304S-D35 (3.0kW)",
      yAxis: "HG304S-D35 (3.0kW)",
      zAxis: "HG303B-D35 (3.0kW)",
    },
    accuracy: { positioning: "±0.008mm / 300mm", repeat: "±0.004mm" },
    utilities: {
      coolantTank: "300L (1300W)",
      electricPower: "3-phase AC 220V ±5% / AC 380V 60Hz ±5%",
      pneumaticSupply: "≥ 6.5 Kg/cm²",
      groundClearance: "4000 x 2400 x 2650mm",
      machineWeight: "9,500 kg (9.5 tons)",
    },
  },
};
