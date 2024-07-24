import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";

import { NewClientFormComponent } from "../../components/forms/new-client-form/new-client-form.component";
import { SearchClientFormComponent } from "../../components/forms/search-client-form/search-client-form.component";
import { ItemFormComponent } from "../../components/forms/item-form/item-form.component";

import { ClientDataService } from "../../services/client.service";

import { IClient } from "../../interface/client.interface";

import { IsMobileDirective } from "../../directives/is-mobile.directive";
import { IsTabletDirective } from "../../directives/is-tablet.directive";
import { IsLaptopDirective } from "../../directives/is-laptop.directive";

@Component({
  selector: "app-create-contract-page",
  standalone: true,
  templateUrl: "./create-contract-page.component.html",
  styleUrls: ["./create-contract-page.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    NewClientFormComponent,
    SearchClientFormComponent,
    MatRadioModule,
    ItemFormComponent,
    IsMobileDirective,
    IsTabletDirective,
    IsLaptopDirective,
  ],
  providers: [],
})
export class CreateContractPageComponent {
  public clientType: string = "existingClient";
  public clientData: IClient | null = null;

  constructor(private clientDataService: ClientDataService) {}

  ngOnInit() {
    this.clientDataService.getClientData().subscribe((data: IClient | null) => {
      this.clientData = data;
    });
  }
}
