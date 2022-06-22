import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {

  constructor(private _http: HttpClient) { }

  baseURL: string = "http://localhost:3000/api/transaccion";

  public getDivisas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host': 'currency-converter13.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1447bf366msh78719d2e5b4bdccp1566f2jsnbfa83a614060'
      }),
    }
    return this._http.get("https://currency-converter13.p.rapidapi.com/list", httpOptions);
  }

  public convertirDiv(monto: number, tipoA: string, tipoB: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host': 'currency-converter23.p.rapidapi.com',
        'X-RapidAPI-Key': 'f1447bf366msh78719d2e5b4bdccp1566f2jsnbfa83a614060',
      }),
    };
    return this._http.get(
      'https://currency-converter23.p.rapidapi.com/rate?amount='+monto+'&from='+tipoA+'&to='+tipoB, httpOptions);
  }

  createTransaccionNueva(trans: Transaccion): Observable<any> {
    const options = {
      method: "POST",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    const body = JSON.stringify(trans);
    console.log(body, 'JSON')
    return this._http.post(this.baseURL, body, options);

  }

  getTransacciones(): Observable<any> {
    const options = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    return this._http.get(this.baseURL, options);
  }

  filtrarTransacciones(origen: string, destino: string):Observable<any> {
    const options = {
      method: 'GET',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this._http.get(this.baseURL + '/'+origen+'/'+destino, options)
  }

}
