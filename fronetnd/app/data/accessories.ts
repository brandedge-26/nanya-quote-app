export type Accessory = {
  id: string;
  name: string;
  /** Flat USD price, or null when the price varies by machine (see accessoryPriceOverrides) or is quoted on request. */
  price: number | null;
};

// Prices sourced from QUOTATION APPS FORMATS.xlsx (LISTING sheet + per-machine sheets), in USD.
export const accessories: Accessory[] = [
  { id: "chain-conveyor", name: "Chain Chip Conveyor", price: null },
  { id: "tool-probe", name: "Tool Probe (Tool Measurement)", price: 390 },
  { id: "cts-system", name: "CTS System (30 Bar Pressure)", price: 4950 },
  { id: "rotary-table", name: "4th Axis Rotary Table (170mm)", price: 3380 },
  { id: "packing", name: "International Packing", price: null },
  { id: "optical-scale", name: "Optical Scale (Heidenhain, 3-Axis)", price: null },
];

// Chain Chip Conveyor and International Packing are priced per machine size in the source sheet.
export const accessoryPriceOverrides: Record<string, Record<string, number>> = {
  "nano-x8": { "chain-conveyor": 1400, packing: 1400 },
  "nano-x10": { "chain-conveyor": 1600, packing: 1400 },
  "nv-855": { "chain-conveyor": 1600, packing: 1600 },
  "nv-1165": { "chain-conveyor": 1800, packing: 1800 },
  "nv-1270": { "chain-conveyor": 2400, packing: 2200 },
  "nv-1470": { "chain-conveyor": 2600, packing: 2200 },
  "nv-1670": { "chain-conveyor": 2800, packing: 2400 },
};
