import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  baseURL: string = "http://localhost:3000/api/persona";

  constructor(private _http: HttpClient) { }

  getPersonas(): Observable<any> {
    const options = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    return this._http.get(this.baseURL, options);
  }

}
