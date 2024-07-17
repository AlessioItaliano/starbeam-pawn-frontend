import { Routes } from "@angular/router";
import { canActivateAuth } from "./guards/accese.guard";

import { LoginPageComponent } from "./pages/login-page/login-page.component";

import { LayoutComponent } from "./components/layout/layout.component";
import { TransactionPageComponent } from "./pages/transaction-page/transaction-page.component";
import { ClientsPageComponent } from "./pages/clients-page/clients-page.component";
import { CreateContractPageComponent } from "./pages/create-contract-page/create-contract-page.component";
import { ArchivesPageComponent } from "./pages/archives-page/archives-page.component";

export const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "transaction", component: TransactionPageComponent },
      { path: "clients", component: ClientsPageComponent },
      { path: "archives", component: ArchivesPageComponent },
      { path: "create-contract", component: CreateContractPageComponent },
    ],
    canActivate: [canActivateAuth],
  },
];
