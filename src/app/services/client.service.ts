import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IClient } from "../interface/client.interface";

@Injectable({
  providedIn: "root",
})
export class ClientDataService {
  private tempDataSubject: BehaviorSubject<IClient | null> =
    new BehaviorSubject<IClient | null>(null);

  setClientData(data: IClient | null): void {
    this.tempDataSubject.next(data);
  }

  getClientData(): Observable<IClient | null> {
    return this.tempDataSubject.asObservable();
  }
}
