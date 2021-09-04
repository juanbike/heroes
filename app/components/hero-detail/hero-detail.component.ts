/*
PASO-5: Agregar navegación con enrutamiento
https://angular.io/tutorial/toh-pt5#add-navigation-with-routing

El HeroDetailComponent necesita una nueva forma de obtener el héroe-a-pantalla. Esta sección explica lo siguiente:

		1-Obtén la ruta que lo creó
		2-Extrae el id de la ruta
		3-Adquirir el héroe con eso id del servidor usando el servicio HeroService
Agregue las siguientes importaciones:

		PASO UNO
		--------

		src / app / hero-detail / hero-detail.component.ts
		-------------------------------------------------
		import { ActivatedRoute } from '@angular/router';
		import { Location } from '@angular/common';

		import { HeroService } from '../hero.service';

		PASO DOS
		--------
		
		Inyectar el ActivatedRoute, HeroService y Location los servicios en el constructor, el ahorro de sus valores en los
		 campos
		 privados:
		
		src / app / hero-detail / hero-detail.component.ts
		--------------------------------------------------
		constructor(
		  private route: ActivatedRoute,
		  private heroService: HeroService,
		  private location: Location
		) {}

El ActivatedRoute guarda información sobre la ruta a esta instancia del HeroDetailComponent. Este componente está interesado en
 los parámetros de
		la ruta extraídos de la URL. El parámetro "id" es el id del héroe para mostrar.

		La HeroService obtiene datos héroe desde el servidor remoto y este componente utilizarla para conseguir el
		 héroe-a-pantalla.

		El location es un servicio Angular para interactuar con el navegador. Lo usará más tarde para volver a la 
		vista que navegó 
		aquí.
		
	Extraer el idparámetro de ruta
	------------------------------
		En el ngOnInit() ciclo de vida, llame al ganchoget Hero() y defínalo de la siguiente manera.


		PASO  TRES
		----------

		src / app / hero-detail / hero-detail.component.ts
		--------------------------------------------------
		ngOnInit(): void {
		  this.getHero();
		}

		getHero(): void {
		  const id = Number(this.route.snapshot.paramMap.get('id'));
		  this.heroService.getHero(id)
			.subscribe(hero => this.hero = hero);
		}
		
		El route.snapshotes una imagen estática de la información de ruta poco después de que el componente fue creado.

		El paramMap es un diccionario de valores de parámetros de ruta extraídos de la URL. La clave "id" devuelve la id del héroe
		 a buscar.

		Los parámetros de ruta son siempre cadenas. La función Number JavaScript convierte la cadena en un número, que es lo que id 
		 debería ser un héroe .

		El navegador se actualiza y la aplicación se bloquea con un error del compilador. HeroService no tiene un método getHero().
		 Agréguelo ahora.


		 PASO CUATRO
		 -----------

		Agregar HeroService.getHero()
		----------------------------
			Abra HeroService y agregue el siguiente método getHero() con id el método getHeroes() despues :

			src / app / hero.service.ts (getHero)
			-------------------------------------
			getHero(id: number): Observable<Hero> {
			  // For now, assume that a hero with the specified `id` always exists.
			  // Error handling will be added in the next step of the tutorial.
			  const hero = HEROES.find(h => h.id === id)!;
			  this.messageService.add(`HeroService: fetched hero id=${id}`);
			  return of(hero);
			}	

			Tenga en cuenta las comillas invertidas (``) que definen un JavaScript plantilla literal para incrustar el id.
			
			Como getHeroes(), getHero()tiene una firma asincrónica. Devuelve un héroe simulado como un Observable, usando la función 
			of() RxJS .

			Podrá volver a implementarlo getHero() como una Http solicitud real sin tener que cambiar el HeroDetailComponent que 
			lo llama.



------------------------------------------------------------------------------------------------------------		
*/



import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../interface/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../services/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
@Input() hero?: Hero;

  constructor(private route: ActivatedRoute,
		  private heroService: HeroService,
		  private location: Location) { }

  ngOnInit(): void {
		  this.getHero();
		}

		getHero(): void {
		  const id = Number(this.route.snapshot.paramMap.get('id'));
		  this.heroService.getHero(id)
			.subscribe(hero => this.hero = hero);
		}
		

goBack(): void {
			  this.location.back();
	}			


/*
6- Obtener datos de un servidor
	https://angular.io/tutorial/toh-pt6
9-Actualizar héroes
	-------------------
		Edite el nombre de un héroe en la vista de detalles del héroe. A medida que escribe, el nombre del héroe actualiza el encabezado en la parte superior
		de la página. Pero cuando hace clic en el "botón retroceder", los cambios se pierden.

		Si desea que los cambios persistan, debe volver a escribirlos en el servidor.
*/

	save(): void {
			  if (this.hero) {
				this.heroService.updateHero(this.hero)
				  .subscribe(() => this.goBack());
			  }
			}




}
