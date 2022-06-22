import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pasaje } from 'src/app/models/pasaje';
import { Persona } from 'src/app/models/persona';
import { PasajeService } from 'src/app/services/pasaje.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-pasaje-form',
  templateUrl: './pasaje-form.component.html',
  styleUrls: ['./pasaje-form.component.css']
})
export class PasajeFormComponent implements OnInit {

  pasaje!: Pasaje;
  personas : Array<Persona> = []
  accion: string = "new";
  precio!: number;

  categorias: Array<string> = ['Menor', 'Adulto', 'Jubilado'];
  
  constructor(private personaService: PersonaService, private pasajeService: PasajeService, 
    private router: Router, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) {
      this.obtenerPersonas();
      this.pasaje = new Pasaje();
      this.pasaje.fechaCompra = new Date().toDateString();
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if (params['id']){
        if(params['id'] == 'crear') this.accion = "new"
       else {
        this.accion = "update";
        this.cargarPasaje(params['id']);
        
      }
    }
    })
    // this.activatedRoute.params.subscribe( params =>{
    //   if (params['id']){
    //     this.accion = "new"
    //   } else{
    //     this.accion = "update";
    //     this.cargarPasaje(params['id']);
    //   }
    // })

    // this.pasajeService.getPasaje(params['id']).subscribe(
    //   (result) => {
    //     result.forEach((element:any) => {
    //     this.pasaje = new Pasaje();
    //     Object.assign(this.pasaje, element)
    //   });
    // }
    // )
  }

  cargarPasaje(id:string){
    this.pasaje=new Pasaje();
    this.pasajeService.getPasaje(id).subscribe(
      (result) => {
        Object.assign(this.pasaje, result)
        this.pasaje.pasajero = this.personas.find((item) =>item._id== this.pasaje.pasajero._id)!;
        console.log(result, 'un pasaje');
      },
      error => { alert("Error en la petición"); }
    )
  }

  obtenerPersonas(){
    this.personaService.getPersonas().subscribe(
      (result) =>{
        var persona = new Persona();
        result.forEach((element:any) => {
          Object.assign(persona, element)
          this.personas.push(persona);
          persona = new Persona();
        });
        console.log(this.personas, 'personas')
      },
      error => {alert("Error en la petición");}
    )
  }


  cambioPasaje(){
    if(this.pasaje.categoriaPasajero == "m"){
      this.pasaje.precioPasaje = this.pasaje.precioPasaje - (this.pasaje.precioPasaje * 0.25)
      this.precio = this.pasaje.precioPasaje;
    }
    else if(this.pasaje.categoriaPasajero == "j"){
      this.pasaje.precioPasaje = this.pasaje.precioPasaje - (this.pasaje.precioPasaje * 0.5)
      this.precio = this.pasaje.precioPasaje;
    }
    return this.precio;
  }

  guardarPasaje(){
    this.pasaje.precioPasaje = this.cambioPasaje();
    console.log(this.pasaje)
    if(this.accion == "new") {
      this.pasajeService.createPasaje(this.pasaje).subscribe()
      this.router.navigate(['pasajes'])
    }
  }

  actualizarPasaje(){
    console.log(this.pasaje)
    if(this.accion == "update") {
      this.pasajeService.updatePasaje(this.pasaje).subscribe(
      )
      this.router.navigate(['pasajes'])
    }
  }

  volver(){
    this.router.navigate(['pasajes'])
  }

}
