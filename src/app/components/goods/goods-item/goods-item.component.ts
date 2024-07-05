import { Component, Input } from '@angular/core';
import { IGoods } from '../../../interface/goods.interface';

@Component({
  selector: 'app-goods-item',
  standalone: true,
  imports: [],
  templateUrl: './goods-item.component.html',
  styleUrl: './goods-item.component.scss',
})
export class GoodsItemComponent {
  @Input() goods?: IGoods | undefined;
}
