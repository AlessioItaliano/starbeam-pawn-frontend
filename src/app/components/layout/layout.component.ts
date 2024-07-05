import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [RouterModule, SidebarComponent],
})
export class LayoutComponent {
  apiService = inject(ApiService);

  ngOnInit() {
    console.log('middleware');
    this.apiService.getCurrentUser().subscribe((val) => console.log(val));
  }
  // constructor(private apiService: ApiService) // private router: Router
  // {}
}
