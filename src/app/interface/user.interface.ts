enum Position {
  Owner = "Owner",
  FinancialManager = "Financial manager",
  CustomerSpecialist = "Customer specialist",
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  token: string;
  userAvatar: string;
  positionInTheCompany: Position[];
}
