import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libro';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.css']
})
export class LibroFormComponent implements OnInit {

  libroGuardado!:Libro;
  stringimage: string = "";

  constructor(private libroService:LibroService, private router: Router) {
    this.libroGuardado = new Libro();
    this.libroGuardado.destacado = false;
    this.resetearForm;
  }

  ngOnInit(): void {
  }

  guardarLibro(){
    this.libroGuardado.imagen = this.stringimage;
    this.libroService.createLibroNuevo(this.libroGuardado).subscribe(
      (result) =>{
          console.log(result);
      },
      error=>{ alert("Error en la petición"); }
    )
    this.router.navigate(['libros'])
  }

  resetearForm(form: NgForm){
    form.reset();
  }

  onFileChanges(files: any) {
    console.log("File has changed:", files);
    this.stringimage = files[0].base64;
  }

}
