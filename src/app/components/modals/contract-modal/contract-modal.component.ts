import { Component, Inject } from "@angular/core";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { LogoComponent } from "../../logo/logo.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-contract-modal",
  standalone: true,
  imports: [LogoComponent, CommonModule],
  templateUrl: "./contract-modal.component.html",
  styleUrl: "./contract-modal.component.scss",
})
export class ContractModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  getPdf(id: string) {
    const elementToPrint: any = document.getElementById("pdf-contract");

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
      pdf.save(`contract_${id}.pdf`);
    });
  }
}
