import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  baseURL: string = "http://localhost:3000/api/libro";
  
  constructor(private _http: HttpClient) { }

  getLibros(): Observable<any> {
    const options = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    return this._http.get(this.baseURL, options);
  }

  getLibrosDestacados(): Observable<any> {
    const options = {
      method: "GET",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
    return this._http.get(this.baseURL + '/destacado', options);
  }

  // createLibroNuevo(libro: Libro): Observable<any> {
  //   //fetch('https://cors-demo.glitch.me/allow-cors', {mode:'cors'});
  //   const options = {
  //     method: "POST",
  //     headers: new HttpHeaders({
  //       'access-control-allow-origin': "http://localhost:4200",
  //       "Content-Type": "application/json",
  //     })
  //   }
  //   const body = JSON.stringify(libro);
  //   console.log(body, 'JSON')
    
  //   return this._http.post(this.baseURL, body, options);
  // }

  public createLibroNuevo(libro:Libro): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({})
    };
    let body = JSON.stringify(libro);
    console.log(body, 'JSON')
    return this._http.post(this.baseURL,body, httpOptions);
  }
}
