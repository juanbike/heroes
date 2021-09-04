import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importamos el primer componente que lista los items del arreglo 
import { HeroesComponent } from './components/heroes/heroes.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

/*
Agregar una ruta de detalle de héroe
*/

import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

// Como app-routing.module.ts ya se importa HeroesComponent, puede usarlo en la matriz routes
/*
Una ruta de Angular tiene dos propiedades:
		-------------------------------------------

		1-path: una cadena que coincide con la URL en la barra de direcciones del navegador.
		2-component: el componente que debe crear el enrutador al navegar a esta ruta.
		
		Esto le dice al enrutador que haga coincidir esa URL path: 'heroes' y muestre HeroesComponent cuando la URL
		 es algo así como localhost:4200/heroes.

Se llama al método forRoot()porque configura el enrutador en el nivel raíz de la aplicación. El método forRoot() 
proporciona los proveedores de 		servicios y las directivas necesarias para el enrutamiento y realiza la navegación inicial en función de
		la URL del navegador actual.

A continuación, AppRoutingModule exporta RouterModule para que esté disponible en toda la aplicación


agregue una ruta parametrizada a la matriz routes que coincida con el patrón de ruta de la vista de detalles del héroe.
{ path: 'detail/:id', component: HeroDetailComponent },
*/
const routes: Routes = [
	 { path: 'heroes', component: HeroesComponent },
	 { path: 'dashboard', component: DashboardComponent },
	 { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	 { path: 'detail/:id', component: HeroDetailComponent },
	 { path: '**', component: DashboardComponent }, // si intentan navegar a un componente que no existe
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }