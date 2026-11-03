export type SalesCustomer = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  quotationsCount: number;
  lastActivity: string;
};

// Dummy data for the Sales Dashboard UI (no backend yet).
export const salesCustomers: SalesCustomer[] = [
  {
    id: "C-001",
    name: "Arjun Mehta",
    company: "ABC Technologies",
    email: "arjun@abctech.com",
    phone: "+91 98200 11223",
    quotationsCount: 2,
    lastActivity: "2026-10-24",
  },
  {
    id: "C-002",
    name: "Priya Nair",
    company: "Precision Works",
    email: "priya@precisionworks.in",
    phone: "+91 90123 44556",
    quotationsCount: 1,
    lastActivity: "2026-10-22",
  },
  {
    id: "C-003",
    name: "Vikram Shah",
    company: "Global Industries",
    email: "vikram@globalind.com",
    phone: "+91 98765 67890",
    quotationsCount: 3,
    lastActivity: "2026-10-19",
  },
  {
    id: "C-004",
    name: "Neha Kapoor",
    company: "Sharma Enterprises",
    email: "neha@sharmaent.in",
    phone: "+91 97654 33221",
    quotationsCount: 1,
    lastActivity: "2026-10-16",
  },
  {
    id: "C-005",
    name: "Rohan Desai",
    company: "Metal Craft",
    email: "rohan@metalcraft.com",
    phone: "+91 96543 22110",
    quotationsCount: 2,
    lastActivity: "2026-10-12",
  },
  {
    id: "C-006",
    name: "Ananya Rao",
    company: "Rao Fabrication",
    email: "ananya@raofab.in",
    phone: "+91 95432 11009",
    quotationsCount: 1,
    lastActivity: "2026-10-09",
  },
  {
    id: "C-007",
    name: "Karan Malhotra",
    company: "Malhotra Tools",
    email: "karan@malhotratools.com",
    phone: "+91 94321 00998",
    quotationsCount: 1,
    lastActivity: "2026-10-05",
  },
  {
    id: "C-008",
    name: "Simran Kaur",
    company: "Kaur Precision",
    email: "simran@kaurprecision.in",
    phone: "+91 93210 99887",
    quotationsCount: 1,
    lastActivity: "2026-10-02",
  },
];
