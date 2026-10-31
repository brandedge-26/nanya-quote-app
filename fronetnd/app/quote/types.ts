export type CustomerDetails = {
  name: string;
  email: string;
  company: string;
  notes: string;
};

export const EMPTY_CUSTOMER_DETAILS: CustomerDetails = {
  name: "",
  email: "",
  company: "",
  notes: "",
};
