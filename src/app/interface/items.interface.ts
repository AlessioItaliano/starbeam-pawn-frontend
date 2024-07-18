enum ItemsCategories {
  jewelry = "jewelry",
  electronics = "electronics",
  watches = "watches",
  tools = "tools",
  musical_instruments = "musical instruments",
  sporting_goods = "sporting goods",
  luxury_items = "luxury items",
  collectibles = "collectibles",
  household_items = "household items",
  miscellaneous = "miscellaneous",
}

interface IPriceHistory {
  estimatedPrice: number;
  commission: number;
  changeDate: Date;
}

export interface IItems {
  _id: string;
  itemName: string;
  category: ItemsCategories[];
  description: string;
  estimatedPrice: number;
  commission: number;
  dateOfAcceptance: Date;
  dateValidUntil: Date;
  clientId: string;
  archived: boolean;
  priceHistory: IPriceHistory[];
}
