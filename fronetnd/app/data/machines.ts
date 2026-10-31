export type Machine = {
  id: string;
  name: string;
  series: string;
  description: string;
  image: string;
  price: number;
};

// Prices and specs sourced from QUOTATION APPS FORMATS.xlsx (FOB Shanghai, USD).
export const machines: Machine[] = [
  {
    id: "nano-x8",
    name: "NANO-X8",
    series: "Compact Series",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 800×500×550mm (X/Y/Z) travel.",
    image: "/machines/nano-x8.png",
    price: 31000,
  },
  {
    id: "nano-x10",
    name: "NANO-X10",
    series: "Compact Series",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 1020×600×600mm (X/Y/Z) travel.",
    image: "/machines/nano-x10.png",
    price: 36100,
  },
  {
    id: "nv-855",
    name: "NV-855",
    series: "High Performance Line",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 830×550×550mm (X/Y/Z) travel.",
    image: "/machines/nv-855.png",
    price: 38000,
  },
  {
    id: "nv-1165",
    name: "NV-1165",
    series: "High Performance Line",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 1100×650×600mm (X/Y/Z) travel.",
    image: "/machines/nv-1165.png",
    price: 44000,
  },
  {
    id: "nv-1270",
    name: "NV-1270",
    series: "High Performance Line",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 1200×700×700mm (X/Y/Z) travel.",
    image: "/machines/nv-1270.png",
    price: 48000,
  },
  {
    id: "nv-1470",
    name: "NV-1470",
    series: "High Performance Line",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 1400×700×700mm (X/Y/Z) travel.",
    image: "/machines/nv-1470.png",
    price: 55000,
  },
  {
    id: "nv-1670",
    name: "NV-1670",
    series: "High Performance Line",
    description:
      "3-Axis CNC Vertical Machining Center with MITSUBISHI M80A control, 12,000 RPM spindle, 1600×700×700mm (X/Y/Z) travel.",
    image: "/machines/nv-1670.png",
    price: 59000,
  },
];
