import { Component, inject } from "@angular/core";

// import { ApiService } from "../../services/api.service";
// import { GoodsItemComponent } from "../../components/goods/goods-item/goods-item.component";

@Component({
  selector: "app-main-page",
  standalone: true,
  imports: [],
  templateUrl: "./main-page.component.html",
  styleUrl: "./main-page.component.scss",
})
export class MainPageComponent {
  title = "starbeam-pawn-frontend";

  // apiService = inject(ApiService);

  // goodsList: IGoods[] = [];

  //   constructor() {
  //     this.apiService.getAllGoods().subscribe((goods: IGoods[]) => {
  //       this.goodsList = goods;
  //       console.log(goods);
  //     });
  //   }
}
