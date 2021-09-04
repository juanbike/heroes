
/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6

-------------
	
		1- En HeroService, importar HttpClient y HttpHeaders:

		src / app / hero.service.ts (importar símbolos HTTP)

*/

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Injectable } from '@angular/core';


/*

6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6
6-Manejo de errores
--------------------
Las cosas salen mal, especialmente cuando obtiene datos de un servidor remoto. El método HeroService.getHeroes() 
debería detectar errores y hacer algo apropiado.
Para detectar errores, "canaliza" el resultado del observable "http.get()" a través de un método "catchError()" 
del operador RxJS.
*/

import { catchError, map, tap } from 'rxjs/operators';




/*
El servicio Hero puede obtener los datos desde cualquier lugar: servicio web, almacenamiento local, o una
 fuente de datos simulada.

			ELIMINAR EL ACCESO A LOS DATOS DE LOS COMPONENTES SIGNIFICA QUE PUEDE CAMBIAR DE OPINIÓN SOBRE
			 LA IMPLEMENTACIÓN EN CUALQUIER MOMENTO, SIN TOCAR
			NINGÚN COMPONENTE. LOS COMPONENTES No SABEN CÓMO FUNCIONA EL SERVICIO.

			La implementación en este tutorial continuará ofreciendo héroes simulados .
*/
import { Hero } from '../interface/hero';
import { HEROES } from '../../assets/mock-heroes';


/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts
----------------------------------------------------------------
*/

import { MessageService } from './message.service';


/*
----------------------------------------------------------
4-AGREGAR SERVICIOS - COMPARTIR DATOS ENTRE CLASES
https://angular.io/tutorial/toh-pt4#add-services
		11- Objetos Observables en el servicio HeroService
----------------------------------------------------------
*/
import { Observable, of } from 'rxjs';



/*
@Injectable() servicios
Observe que el nuevo servicio importa el Injectablesímbolo angular y anota la clase con el decorador. 
Esto marca a la clase como una que participa en el sistema de inyección de dependencia . 
*/
@Injectable({
  providedIn: 'root'
})
export class HeroService {


constructor(private messageService: MessageService,
  	private http: HttpClient) { }




/*
Agregar servicios
Por que servicios
Agregar getHeroes
*/
//método getHeroes para devolver los héroes simulados

/*

getHeroes(): Hero[] {
  return HEROES;
}

*/

/*
11- Objetos Observables en el servicio HeroService
Reemplace el método getHeroes() con lo siguiente:

*/

/*

getHeroes(): Observable<Hero[]> {
	 const heroes = of(HEROES);
	 return heroes;
}
*/



/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

Modifica el getHeroes()método para enviar un mensaje cuando se recuperan los héroes.
----------------------------------------------------------------
*/





/*
El actual método HeroService.getHeroes() usa la función "of()" de RxJS para devolver una matriz de héroes simulados
 como un archivo Observable<Hero[]>.

 getHeroes(): Observable<Hero[]> {
		  const heroes = of(HEROES);
		  return heroes;
		}
		





getHeroes(): Observable<Hero[]> {
  const heroes = of(HEROES);
  this.messageService.add('HeroService: fetched heroes');
  return heroes;
}
*/


/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6
4-Consigue héroes con HttpClient
	---------------------------------
	1-Convierta ese método para usarlo de la HttpClient de la siguiente manera:	
*/

/*
 GET heroes from the server  SIN MANEJO DE ERRORES
		getHeroes(): Observable<Hero[]> {
		  return this.http.get<Hero[]>(this.heroesUrl)
		}

/*

/*
*/


/**
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6

El método handleError
---------------------
El siguiente método handleError()será compartido por muchos métodos de HeroService , por lo que se generaliza para
 satisfacer sus diferentes
	necesidades.

En lugar de manejar el error directamente, devuelve una función de manejo de errores a la funcion "catchError" que 
ha configurado con el nombre
	de la operación que falló y un valor de retorno seguro.



RECUPERAR DATOS DEL SERVIDOR CON MANEJO DE ERRORES
--------------------------------------------------


				 * Handle Http operation that failed.
				 * Let the app continue.
				 * @param operation - name of the operation that failed
				 * @param result - optional value to return as the observable result
				 */
				private handleError<T>(operation = 'operation', result?: T) {
				  return (error: any): Observable<T> => {

					// TODO: send the error to remote logging infrastructure
					console.error(error); // log to console instead

					// TODO: better job of transforming error for user consumption
					this.log(`${operation} failed: ${error.message}`);

					// Let the app keep running by returning an empty result.
					return of(result as T);
				  };
				}

/*
Después de informar el error a la consola, el controlador crea un mensaje fácil de usar y devuelve un valor seguro a la 
aplicación para que la 	aplicación pueda seguir funcionando.

Debido a que cada método de servicio devuelve un tipo de resultado Observable diferente , handleError() toma un
 parámetro de tipo para que pueda devolver el valor seguro como el tipo que espera la aplicación.


 7-Aprovecha el objeto observable
	--------------------------------
		Los métodos HeroService aprovecharán el flujo de valores observables y enviarán un mensaje, utilizando el
		 método log(), al área de mensajes en 
		la parte inferior de la página.

		Lo harán con el tap()operador RxJS , que mira los valores observables, hace algo con esos valores y 
		los transmite. La devolución tap() de llamada
		no toca los valores en sí.

		Aquí está la versión final de getHeroes()con tap()que registra la operación.









*/



/** GET heroes from the server 8 */
		getHeroes(): Observable<Hero[]> {
		  return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
			  tap(_ => this.log('heroes recuperados')),
			  catchError(this.handleError<Hero[]>('getHeroes', []))
			);
		}



/*
PASO-5: Agregar navegación con enrutamiento
https://angular.io/tutorial/toh-pt5#add-navigation-with-routing

8- Obtener héroe por id
	-----------------------
		La mayoría de las API web admiten una solicitud de obtención por identificación en el formulario :baseURL/:id.

		Aquí, la URL base es la definida heroesURL en la sección Héroes y HTTP ( api/heroes) y la identificación es el número del héroe que desea recuperar.
		Por ejemplo api/heroes/11,.

Hay tres diferencias significativas de getHeroes():

		1-El método getHero() construye una URL de solicitud con la identificación del héroe deseado.
		2-El servidor debe responder con un solo héroe en lugar de una serie de héroes.
		3-El método getHero()devuelve un Observable<Hero>(" un observable de objetos Hero ") en lugar de un observable 
		de matrices de héroes .


*/


/*
getHero(id: number): Observable<Hero> {
			  // For now, assume that a hero with the specified `id` always exists.
			  // Error handling will be added in the next step of the tutorial.
			  const hero = HEROES.find(h => h.id === id)!;
			  this.messageService.add(`HeroService: fetched hero id=${id}`);
			  return of(hero);
			}
*/


		/** GET hero by id. Will 404 if id not found */
		getHero(id: number): Observable<Hero> {
		  const url = `${this.heroesUrl}/${id}`;
		  return this.http.get<Hero>(url).pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		  );
		}





/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6

-------------

3-Tenga en cuenta que sigue inyectando el MessageService pero como lo llamará con tanta frecuencia, envuélvalo 
en un método log() privado :

*/

/** Log a HeroService message with the MessageService */
		private log(message: string) {
		  this.messageService.add(`HeroService: ${message}`);
		}




/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6

-------------

4- Define la Url heroes del formulario :base/:collectionName con la dirección del recurso de héroes en el servidor. 
Aqui la base es el recurso 	al que se realizan las solicitudes y collectionName,  es el objeto de datos de héroes
 en in-memory-data-service.ts.
*/



private heroesUrl = 'api/heroes';


/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

Modifique el constructor con un parámetro que declare una messageService propiedad privada . Angular inyectará el 
singleton MessageService en esa propiedad cuando cree el HeroService
----------------------------------------------------------------
*/


/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6

-------------
3-Héroes y HTTP
	-------------
2-Aún en el HeroService, inyecte el constructor HttpClient en  en una propiedad privada llamada http.


*/

/*

10-Agregar HeroService.updateHero()
	----------------------------------
	La estructura general del método updateHero() es similar a la de getHeroes(), pero se usa http.put() para conservar
	 el héroe cambiado en el servidor.


El método HttpClient.put() toma tres parámetros:

		a-la URL
		b-los datos para actualizar (el héroe modificado en este caso)
		c-opciones
		
		La URL no se modifica. La API web de héroes sabe qué héroe actualizar al observar la del héroe id.

		La API web de héroes espera un encabezado especial en las solicitudes de guardado HTTP. Ese encabezado está 
		en la constante httpOptions
		definida en HeroService. Agregue lo siguiente a la clase HeroService.	 

*/

/** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}



/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6
10-Agregar HeroService.updateHero()
	----------------------------------
	La estructura general del método updateHero() es similar a la de getHeroes(), pero se usa http.put() para conservar
	 el héroe cambiado en el servidor.
-------------



La URL no se modifica. La API web de héroes sabe qué héroe actualizar al observar la del héroe id.

		La API web de héroes espera un encabezado especial en las solicitudes de guardado HTTP. Ese encabezado está en la constante httpOptions
		definida en HeroService. Agregue lo siguiente a la clase HeroService.
*/



httpOptions = {
		  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};
		




/*
6- Obtener datos de un servidor
https://angular.io/tutorial/toh-pt6
addHero()se diferencia de updateHero()dos formas:

			Llama al método HttpClient.post()en lugar de put().
			Espera que el servidor genere una identificación para el nuevo héroe, que devuelve Observable<Hero> a la persona que llama.
			Actualiza el navegador y agrega algunos héroes.
3-Agregue el siguiente método addHero() a la clase HeroService.

*/




/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}


/*
 - Obtener datos de un servidor
 https://angular.io/tutorial/toh-pt6
12-Eliminar un héroe
  -----------------
  Aunque el componente delega la eliminación de héroes en el HeroService, sigue siendo responsable de actualizar su propia lista de héroes.

      El método delete() del componente elimina inmediatamente el héroe a eliminar de esa lista, anticipando que HeroService tendrá éxito en el servidor.

      Realmente no hay nada que ver el componente con el Observable devuelto por, heroService.delete() pero debe suscribirse de todos modos .  


    --------------------------------------------------------------------------------------------------------------------------------------------------
    Si no lo hace subscribe(), el servicio no enviará la solicitud de eliminación al servidor. Como regla general, un Observable no hace nada hasta que
    algo se suscribe.

    Confirma esto por ti mismo eliminando temporalmente el subscribe(), haciendo clic en "Panel de control" y luego en "Héroes". Verás la lista 
    completa de héroes nuevamente.
    ---------------------------------------------------------------------------------------------------------------------------------------------------

 */

/** DELETE: delete the hero from the server */
			deleteHero(id: number): Observable<Hero> {
			  const url = `${this.heroesUrl}/${id}`;

			  return this.http.delete<Hero>(url, this.httpOptions).pipe(
				tap(_ => this.log(`deleted hero id=${id}`)),
				catchError(this.handleError<Hero>('deleteHero'))
			  );
			}
			



/*
Tenga en cuenta los siguientes puntos clave:

			a-deleteHero()llamadas HttpClient.delete().
			b-La URL es la URL del recurso de héroes más la iddel héroe que se va a eliminar.
			c-No envía datos como lo hizo con put()y post().
			d-Aún envías el Options http.
			
			Actualice el navegador y pruebe la nueva función de eliminación.
*/			




/*

	6- Obtener datos de un servidor
	https://angular.io/tutorial/toh-pt6


13-Buscar por nombre
	--------------------
		En este último ejercicio, aprenderá a encadenar operadores Observable para que pueda minimizar la cantidad de solicitudes
		 HTTP similares y consumir ancho de banda de la red de manera económica.

		Agregará una función de búsqueda de héroes al Tablero. A medida que el usuario escribe un nombre en un cuadro de búsqueda,
		 realizarás solicitudes HTTP repetidas para héroes filtrados por ese nombre. Su objetivo es emitir solo tantas 
		 solicitudes como sea necesario.








*/







/* GET heroes whose name contains search term */
			searchHeroes(term: string): Observable<Hero[]> {
			  if (!term.trim()) {
				// if not search term, return empty hero array.
				return of([]);
			  }
			  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
				tap(x => x.length ?
				   this.log(`found heroes matching "${term}"`) :
				   this.log(`no heroes matching "${term}"`)),
				catchError(this.handleError<Hero[]>('searchHeroes', []))
			  );
			}
			



  
}

