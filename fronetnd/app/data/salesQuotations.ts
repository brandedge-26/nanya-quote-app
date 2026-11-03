export type QuotationStatus = "Sent" | "Draft";

export type SalesQuotation = {
  id: string;
  customerName: string;
  company: string;
  machineModel: string;
  totalAmount: number;
  date: string;
  status: QuotationStatus;
};

// Dummy data for the Sales Dashboard UI (no backend yet).
export const salesQuotations: SalesQuotation[] = [
  {
    id: "Q-001",
    customerName: "Arjun Mehta",
    company: "ABC Technologies",
    machineModel: "NV-1165",
    totalAmount: 45800,
    date: "2026-10-24",
    status: "Sent",
  },
  {
    id: "Q-002",
    customerName: "Priya Nair",
    company: "Precision Works",
    machineModel: "NANO-X10",
    totalAmount: 37500,
    date: "2026-10-22",
    status: "Draft",
  },
  {
    id: "Q-003",
    customerName: "Vikram Shah",
    company: "Global Industries",
    machineModel: "NV-1270",
    totalAmount: 52900,
    date: "2026-10-19",
    status: "Sent",
  },
  {
    id: "Q-004",
    customerName: "Neha Kapoor",
    company: "Sharma Enterprises",
    machineModel: "NV-855",
    totalAmount: 41200,
    date: "2026-10-16",
    status: "Sent",
  },
  {
    id: "Q-005",
    customerName: "Rohan Desai",
    company: "Metal Craft",
    machineModel: "NV-1470",
    totalAmount: 58400,
    date: "2026-10-12",
    status: "Draft",
  },
  {
    id: "Q-006",
    customerName: "Ananya Rao",
    company: "Rao Fabrication",
    machineModel: "NANO-X8",
    totalAmount: 32780,
    date: "2026-10-09",
    status: "Sent",
  },
  {
    id: "Q-007",
    customerName: "Karan Malhotra",
    company: "Malhotra Tools",
    machineModel: "NV-1670",
    totalAmount: 61800,
    date: "2026-10-05",
    status: "Sent",
  },
  {
    id: "Q-008",
    customerName: "Simran Kaur",
    company: "Kaur Precision",
    machineModel: "NV-1165",
    totalAmount: 44000,
    date: "2026-10-02",
    status: "Draft",
  },
];
