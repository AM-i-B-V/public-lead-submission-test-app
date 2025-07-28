// Paste yout JSON string containing dealer data here
const dealersJSON = `[
  {
    "dealerId": "14401",
    "dealerName": "Mazda Nederland"
  },
  {
    "dealerId": "698351",
    "dealerName": "Mulder Mazda Rotterdam-Zuid"
  }
]`;

// Convert JSON to JavaScript object
export const dealers = JSON.parse(dealersJSON);

// Utility functions
export function getDealersForDropdown() {
  return dealers.map((dealer) => ({
    value: dealer.dealerId,
    label: `${dealer.dealerName}`,
  }));
}
