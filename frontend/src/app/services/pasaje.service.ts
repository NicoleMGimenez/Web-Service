import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pasaje } from '../models/pasaje';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  baseURL: string = "http://localhost:3000/api/pasaje";

  constructor(private _http: HttpClient) { }

  getPasajes(): Observable<any> {
    const httpOptions = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    return this._http.get(this.baseURL, httpOptions);
  }



  getPasaje(id: string): Observable<any> {
    const httpOptions = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      }).append("id", id)
    }
    return this._http.get(this.baseURL + '/' + id, httpOptions)
  }

  createPasaje(pasaje: Pasaje): Observable<any> {
    const httpOptions = {
      method: "POST",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
    const body = JSON.stringify(pasaje);
    console.log(body, 'JSON')
    return this._http.post(this.baseURL + '/create', body, httpOptions)
  }

  updatePasaje(pasaje: Pasaje): Observable<any> {
    const httpOptions = {
      method: "PUT",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
    }
    const body = JSON.stringify(pasaje);
    console.log(body, 'JSON')
    return this._http.put(this.baseURL + '/' + pasaje._id, body, httpOptions)
  }

  deletePasaje(id: string): Observable<any> {
    const httpOptions = {
      method: "DELETE",
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this._http.delete(this.baseURL + '/' + id, httpOptions)
  }

  filtrarPasajes(categoria:string):Observable<any>{
    const httpOptions = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this._http.get(this.baseURL + '/filtro/'+categoria, httpOptions);
  }

}
