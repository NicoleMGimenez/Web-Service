import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { Persona } from 'src/app/models/persona';
import { PasajeService } from 'src/app/services/pasaje.service';

@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {

  pasajes: Array<Pasaje> = []
  filtro: string = "";
  
  constructor(private pasajeService: PasajeService, private router: Router) {
    this.obtenerPasajes();
  }

  ngOnInit(): void {
    this.obtenerPasajes();
  }

  obtenerPasajes() {
    this.pasajeService.getPasajes().subscribe(
      (result) => {
        console.log(result);
        this.pasajes = result;
        console.log(this.pasajes, 'pasajes cargados')
      },
      error => { alert("Error en la petición"); }
    )
  }

  elegirPasajero(pasaje: Pasaje): void {
    this.router.navigate(['pasaje-form', pasaje._id])
    console.log(pasaje)
  }

  borrarPasajero(pasaje: Pasaje) {
    this.pasajeService.deletePasaje(pasaje._id).subscribe()
    window.location.reload()
    this.router.navigate(['pasajes'])
  }

  filtrar() {
    //this.filtro='adultos';
    console.log(this.pasajes, 'transacciones pasadas antes')
    this.pasajeService.filtrarPasajes(this.filtro).subscribe(
      (result: any) => {
        
        this.pasajes = [] // vacio el array que tenia con todas las transacciones
        console.log(this.pasajes, 'transacciones pasadas')
        Object.assign(this.pasajes, result) //al array vacio le asigno los resultados del filtro
        console.log(this.pasajes, 'filtradas')
      }
    )
  }

  mostrarTodo(){
    window.location.reload()
  }
  
}
