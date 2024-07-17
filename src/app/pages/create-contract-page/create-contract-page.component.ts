import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NewClientFormComponent } from "../../components/forms/new-client-form/new-client-form.component";
import { SearchClientFormComponent } from "../../components/forms/search-client-form/search-client-form.component";
import { MatRadioModule } from "@angular/material/radio";
import { ClientDataService } from "../../services/client.service";
import { IClient } from "../../interface/client.interface";
import { ItemFormComponent } from "../../components/forms/item-form/item-form.component";

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

  // onSubmit(): void {}
}
