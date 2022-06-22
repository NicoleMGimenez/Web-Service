import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libros: Array<Libro> = []
  libroActual!:Libro;
  
  indice: number = 0;

  constructor(private libroService: LibroService, private router:Router) {
    this.obtenerLibros();
    this.iniciar();
   }

  ngOnInit(): void {
  }

  obtenerLibros(){
    this.libroService.getLibrosDestacados().subscribe(
      (result) =>{
        var libro = new Libro();
        result.forEach((element:any) => {
          Object.assign(libro, element)
          this.libros.push(libro);
          libro = new Libro();
          this.libroActual = this.libros[0];
        });
        console.log(this.libros, 'libros')
        console.log(this.libroActual, 'libro actual')
      },
      error=>{ alert("Error en la petición"); }
    )
  }

  iniciar() {
    if (this.indice < this.libros.length){
      this.libroActual = this.libros[this.indice]
    };
  }

  siguiente(){
    this.indice = this.indice +1;
    if (this.indice < this.libros.length){
      this.libroActual = this.libros[this.indice]
    };
  }

  anterior(){
    this.indice = this.indice -1;
    if (this.indice < this.libros.length){
      this.libroActual = this.libros[this.indice]
    };
  }

  agregarLibro(){
    this.router.navigate(['libro-form'])
  }

}
