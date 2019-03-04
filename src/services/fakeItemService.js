import * as genresAPI from "./fakeTypeService";

const businessItems = [
  {
    id: "1",
    identityType: "کسب و کار",
    name: "حمید مرادی",
    type: "ظروف چینی",
    telephone: "02155041823",
    telExtention: "210",
    transaction: "1,546,000",
    mobile: "09121412400",
    postalcode: "1987528943",
    state: "اراک",
    city: "اراک",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  },
  {
    id: "2",
    identityType: "کسب و کار",
    name: "سالار اقبالی",
    type: "جهیزیه",
    telephone: "02155041823",
    telExtention: "210",
    transaction: "13,780,000",
    mobile: "09121412400",
    postalcode: "1987528943",
    state: "اصفهان",
    city: "اصفهان",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  },
  {
    id: "3",
    identityType: "کسب و کار",
    name: "مهدی احمدوند",
    type: "ظروف مسی",
    telephone: "02155041823",
    telExtention: "210",
    mobile: "09121412400",
    postalcode: "1987528943",
    transaction: "850,000",
    state: "بندرعباس",
    city: "بندرعباس",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  },
  {
    id: "4",
    identityType: "کسب و کار",
    name: "شایان پورعماد",
    type: "دکوراتیو",
    telephone: "02155041823",
    telExtention: "210",
    mobile: "09121412400",
    postalcode: "1987528943",
    transaction: "4,562,000",
    state: "شیراز",
    city: "شیراز",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  },
  {
    id: "5",
    identityType: "کسب و کار",
    name: "سامان شهبازپور",
    type: "صنایع دستی",
    telephone: "02155041823",
    telExtention: "210",
    mobile: "09121412400",
    postalcode: "1987528943",
    transaction: "320,000",
    state: "کرج",
    city: "کرج",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  },
  {
    id: "6",
    identityType: "کسب و کار",
    name: "بهمن امام",
    type: "وسایل برقی",
    telephone: "02155041823",
    telExtention: "210",
    mobile: "09121412400",
    postalcode: "1987528943",
    transaction: "16,140,000",
    state: "تهران",
    city: "تهران",
    address:
      "میدان شوش - خیابان فدائیان اسلام - کوچه هفتم - پلاک 9 - واحد 1 و 2"
  }
];

const employeeItems = [
  {
    id: "1",
    name: "دانیال دانشی",
    type: "واحد فنی",
    telephone: "214"
  },
  {
    id: "2",
    name: "مهدی بیات",
    type: "واحد بازرگانی",
    telephone: "218"
  },
  {
    id: "3",
    name: "عاطفه کریمی",
    type: "واحد مالی",
    telephone: "207"
  },
  {
    id: "4",
    name: "پگاه جمشیدی",
    type: "واحد فروش",
    telephone: "200"
  },
  {
    id: "5",
    name: "سعید شمس",
    type: "واحد منابع انسانی",
    telephone: "223"
  },
  {
    id: "6",
    name: "محسن شمس",
    type: "مدیر پروژه",
    telephone: "215"
  },
  {
    id: "7",
    name: "فریماه حیدری",
    type: "واحد فروش",
    telephone: "202"
  },
  {
    id: "8",
    name: "الهام بهرامی",
    type: "واحد فروش",
    telephone: "211"
  },
  {
    id: "9",
    name: "فاطمه فصیحی",
    type: "واحد مالی",
    telephone: "206"
  }
];

const customerItems = [
  {
    id: "6",
    name: "حمید مرادی",
    type: "ظروف چینی",
    transaction: "1,546,000",
    city: "اراک"
  },
  {
    id: "5",
    name: "سالار اقبالی",
    type: "جهیزیه",
    transaction: "13,780,000",
    city: "اصفهان"
  },
  {
    id: "4",
    name: "مهدی احمدوند",
    type: "ظروف مسی",
    transaction: "850,000",
    city: "بندرعباس"
  },
  {
    id: "3",
    name: "شایان پورعماد",
    type: "دکوراتیو",
    transaction: "4,562,000",
    city: "شیراز"
  },
  {
    id: "2",
    name: "سامان شهبازپور",
    type: "صنایع دستی",
    transaction: "320,000",
    city: "کرج"
  },
  {
    id: "1",
    name: "بهمن امام",
    type: "وسایل برقی",
    transaction: "16,140,000",
    city: "تهران"
  }
];

export function getBusinessItems() {
  return businessItems;
}

export function getEmployeeItems() {
  return employeeItems;
}

export function getCustomerItems() {
  return customerItems;
}

export function getBusinessItem(id) {
  return businessItems.find(m => m.id === id);
}

// export function saveItem(item) {
//   let itemInDb = businessItems.find(m => m.id === item.id) || {};
//   itemInDb.name = item.name;
//   itemInDb.type = genresAPI.genres.find(g => g._id === movie.genreId);
//   itemInDb.numberInStock = item.numberInStock;
//   itemInDb.dailyRentalRate = item.dailyRentalRate;

//   if (!itemInDb.id) {
//     itemInDb.id = Date.now();
//     businessItems.push(itemInDb);
//   }

//   return itemInDb;
// }

export function deleteBusinessItem(id) {
  let itemInDb = businessItems.find(m => m.id === id);
  businessItems.splice(businessItems.indexOf(itemInDb), 1);
  return itemInDb;
}

export function deleteEmployeeItem(id) {
  let itemInDb = employeeItems.find(m => m.id === id);
  employeeItems.splice(employeeItems.indexOf(itemInDb), 1);
  return itemInDb;
}

export function deleteCustomerItem(id) {
  let itemInDb = customerItems.find(m => m.id === id);
  customerItems.splice(customerItems.indexOf(itemInDb), 1);
  return itemInDb;
}
