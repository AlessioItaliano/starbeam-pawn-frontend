import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IItems } from "../interface/items.interface";
import { IAuthToken } from "../interface/auth.interface";
import { CookieService } from "ngx-cookie-service";
import { IUser } from "../interface/user.interface";
import { IClient } from "../interface/client.interface";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseApiUrl: string = "http://localhost:3000";
  public cookiesService = inject(CookieService);

  public authToken: string | null = null;

  currentUserProfile = signal<IUser | null>(null);

  get isAuth() {
    if (!this.authToken) {
      this.authToken = this.cookiesService.get("token");
    }
    return !!this.authToken;
  }

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<IItems[]> {
    return this.http.get<IItems[]>(`${this.baseApiUrl}/items`);
  }

  createItem(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}/items/create`, payload);
  }

  changeItemPrice(itemId: string, payload: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseApiUrl}/items/price/${itemId}`,
      payload
    );
  }

  getArchiveItems(): Observable<IItems[]> {
    return this.http.get<IItems[]>(`${this.baseApiUrl}/items/archive`);
  }

  moveToArchive(itemId: string): Observable<any> {
    return this.http.patch<any>(
      `${this.baseApiUrl}/items/archive/${itemId}`,
      {}
    );
  }

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http
      .post<IAuthToken>(`${this.baseApiUrl}/auth/login`, payload)
      .pipe(
        tap((val: IAuthToken) => {
          this.authToken = val.token;

          this.cookiesService.set("token", this.authToken);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.authToken = null;
        this.cookiesService.delete("token");
      })
    );
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseApiUrl}/auth/current`).pipe(
      tap((res: IUser) => {
        this.currentUserProfile.set(res);
      })
    );
  }

  getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.baseApiUrl}/clients`);
  }

  getClientByTaxNumber(taxNumber: string): Observable<IClient> {
    return this.http.get<IClient>(`${this.baseApiUrl}/clients/${taxNumber}`);
  }

  createClient(payload: IClient): Observable<IClient> {
    return this.http.post<IClient>(
      `${this.baseApiUrl}/clients/create`,
      payload
    );
  }
}
// signup(payload: {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   password: string;
// }): Observable<any> {
//   return this.http
//     .post<IAuthToken>(`${this.baseApiUrl}/auth/signup`, payload)
//     .pipe(
//       tap((val: IAuthToken) => {
//         this.authToken = val.token;

//         this.cookiesService.set("token", this.authToken);
//       })
//     );
// }
