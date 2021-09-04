/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6
13-Buscar por nombre
	--------------------
1- Observe la declaración de heroes$como Observable:

			src / app / hero-search / hero-search.component.ts
			--------------------------------------------------
			heroes$!: Observable<Hero[]>;
			
			Lo instalarás ngOnInit(). Antes de hacerlo, concéntrese en la definición de searchTerms.

		2-El sujeto searchTerms RxJS
		--------------------------
			La propiedad searchTerms es un RxJS Subject.

			src / app / hero-search / hero-search.component.ts
			--------------------------------------------------
			private searchTerms = new Subject<string>();

			// Push a search term into the observable stream.
			search(term: string): void {
			  this.searchTerms.next(term);
			}
		
			Un Subject es tanto una fuente de valores observables como un Observable en sí mismo. Puede suscribirse a un Subject como lo haría con 
			cualquier otro Observable.

			También puede insertar valores en eso Observable llamando a su método next(value) como lo hace el método search().

			El evento que se vincula al evento del cuadro de texto input llama al método search().


		3- src / app / hero-search / hero-search.component.html
		----------------------------------------------------
			<input #searchBox id="search-box" (input)="search(searchBox.value)" />
			
			Cada vez que el usuario escribe en el cuadro de texto, el enlace llama al método search()con el valor del cuadro de texto, un "término de búsqueda".
			Se convierte searchTerms en un emisor Observable de un flujo constante de términos de búsqueda.

		4-Encadenamiento de operadores RxJS
		---------------------------------
			Pasar un nuevo término de búsqueda directamente searchHeroes()después de cada pulsación de tecla del usuario crearía una cantidad excesiva de 
			solicitudes HTTP, gravando los recursos del servidor y quemando los planes de datos.

			En cambio, el método ngOnInit() canaliza el observable searchTerms  a través de una secuencia de operadores RxJS que reducen el número de llamadas
			al método searchHeroes(), y finalmente devuelven un observable de resultados de búsqueda de héroes oportunos (cada a Hero[]).

			Aquí hay un vistazo más de cerca al código.

			src / app / hero-search / hero-search.component.ts
			--------------------------------------------------
			this.heroes$ = this.searchTerms.pipe(
			  // wait 300ms after each keystroke before considering the term
			  debounceTime(300),

			  // ignore new term if same as previous term
			  distinctUntilChanged(),

			  // switch to new search observable each time the term changes
			  switchMap((term: string) => this.heroService.searchHeroes(term)),
			);

		Cada operador trabaja de la siguiente manera:

		A-debounceTime(300) espera hasta que el flujo de nuevos eventos de cadena se detiene durante 300 milisegundos antes de pasar la última cadena. Nunca
		  realizarás solicitudes con una frecuencia superior a 300 ms.

		B-El método distinctUntilChanged() se asegura que se envíe una solicitud solo si el texto del filtro cambió.

		C- El método switchMap()llama al servicio de búsqueda para cada término de búsqueda que pasa por debounce()y distinctUntilChanged(). Cancela y descarta los 	observables de búsqueda anteriores,
		   observables devolviendo solo el último servicio de búsqueda.
	   

  Con el operador switchMap, cada evento clave calificado puede desencadenar una llamada a un método HttpClient.get().
   Incluso con una pausa de 300
	   ms entre solicitudes, podría tener varias solicitudes HTTP en curso y es posible que no regresen en el pedido 
	   enviado.

		El método switchMap()conserva el orden de solicitud original mientras devuelve solo lo observable de la llamada 
		al método HTTP más reciente.
		Los resultados de llamadas anteriores se cancelan y descartan.

		Tenga en cuenta que cancelar un searchHeroes()Observable anterior en realidad no aborta una solicitud HTTP 
		pendiente. Los resultados no deseados
		se descartan antes de que lleguen al código de su aplicación




*/


import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
		   debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../../interface/hero';
import { HeroService } from '../../services/hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
		  heroes$!: Observable<Hero[]>;
		  private searchTerms = new Subject<string>();

		  constructor(private heroService: HeroService) {}

		  // Push a search term into the observable stream.
		  search(term: string): void {
			this.searchTerms.next(term);
		  }

		  ngOnInit(): void {
			this.heroes$ = this.searchTerms.pipe(
			  // wait 300ms after each keystroke before considering the term
			  debounceTime(300),

			  // ignore new term if same as previous term
			  distinctUntilChanged(),

			  // switch to new search observable each time the term changes
			  switchMap((term: string) => this.heroService.searchHeroes(term)),
			);
		  }
		}
