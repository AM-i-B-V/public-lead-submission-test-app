// Paste yout JSON string containing dealer data here
const dealersJSON = `
[
  {
    "dealerId": "12896180",
    "dealerName": "Tender Cars"
  },
  {
    "dealerId": "13700",
    "dealerName": "Mulder-Mazda 't Groene Hart"
  },
  {
    "dealerId": "14250",
    "dealerName": "Mulder-Mazda Rotterdam-Noord"
  },
  {
    "dealerId": "14401",
    "dealerName": "Mazda Nederland"
  },
  {
    "dealerId": "548388680",
    "dealerName": "Mulder-Mazda Rotterdam-West"
  },
  {
    "dealerId": "553106381",
    "dealerName": "Target Consignment"
  },
  {
    "dealerId": "553650130",
    "dealerName": "Occasion Kampioen"
  },
  {
    "dealerId": "555603767",
    "dealerName": "test-olcay"
  },
  {
    "dealerId": "698351",
    "dealerName": "Mulder Mazda Rotterdam-Zuid"
  }
]
  `;

// Convert JSON to JavaScript object
export const dealers = JSON.parse(dealersJSON);

// Utility functions
export function getDealersForDropdown() {
  return dealers.map((dealer) => ({
    value: dealer.dealerId,
    label: `${dealer.dealerName}`,
  }));
}
