export interface IClient {
  _id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  email: string;
  taxNumber: number;
  passport: {
    passportSerie: string;
    passportNumber: string;
    passportDateOfIssue: Date;
  };
}
