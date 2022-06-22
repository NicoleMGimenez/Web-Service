import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LibroComponent } from './components/libro/libro.component';
import { LibroFormComponent } from './components/libro-form/libro-form.component';
import { DivisaFormComponent } from './components/divisa-form/divisa-form.component';
import { DivisaComponent } from './components/divisa/divisa.component';
import { PasajeComponent } from './components/pasaje/pasaje.component';
import { PasajeFormComponent } from './components/pasaje-form/pasaje-form.component';

const routes: Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'HOME', component: HomeComponent},
  {path: 'libros', component:LibroComponent},
  {path: 'libro-form', component:LibroFormComponent},
  {path: 'divisas', component:DivisaComponent},
  {path: 'divisa-form', component:DivisaFormComponent},
  {path: 'pasajes', component:PasajeComponent},
  {path: 'pasaje-form/:id', component:PasajeFormComponent},
  {path: '**', pathMatch:'full', redirectTo:'HOME'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
