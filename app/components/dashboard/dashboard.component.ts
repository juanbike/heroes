import { Component, OnInit } from '@angular/core';
		import { Hero } from '../../interface/hero';
		import { HeroService } from '../../services/hero.service';

		@Component({
		  selector: 'app-dashboard',
		  templateUrl: './dashboard.component.html',
		  styleUrls: [ './dashboard.component.css' ]
		})
	

	/*----------------------------------
	Paso para Agregar una vista de panel
	*/
		export class DashboardComponent implements OnInit {
			//Define una propiedad heroes, recupera la interfaz
		  heroes: Hero[] = [];

		  //El constructor espera que Angular inyecte el HeroService en una propiedad privada heroService
		  constructor(private heroService: HeroService) { }

		  //El gancho ngOnInit() del ciclo de vida llama getHeroes().
		  ngOnInit() {
			this.getHeroes();
		  }

		  /*
		  getHeroes()devuelve la lista dividida de héroes en las posiciones 1 y 5, devolviendo solo cuatro de los mejores héroes 
		(segundo, tercero, cuarto y quinto)
		  */

		  getHeroes(): void {
			this.heroService.getHeroes()
			  .subscribe(heroes => this.heroes = heroes.slice(1, 5));
		  }
		}