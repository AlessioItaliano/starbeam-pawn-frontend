import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IGoods } from '../interface/goods.interface';
import { IAuthToken } from '../interface/auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseApiUrl: string = 'http://localhost:3000';
  public cookiesService = inject(CookieService);

  public authToken: string | null = null;

  get isAuth() {
    if (!this.authToken) {
      this.authToken = this.cookiesService.get('token');
    }
    return !!this.authToken;
  }

  constructor(private http: HttpClient) {}

  getAllGoods(): Observable<IGoods[]> {
    return this.http.get<IGoods[]>(`${this.baseApiUrl}/goods`);
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/auth/login`, payload);
  }

  signup(payload: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<IAuthToken>(`${this.baseApiUrl}/auth/signup`, payload)
      .pipe(
        tap((val: IAuthToken) => {
          this.authToken = val.token;

          this.cookiesService.set('token', this.authToken);
        })
      );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/auth/current`);
  }
}
