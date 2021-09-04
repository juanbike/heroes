import { Component, OnInit } from '@angular/core';

//PASO-4: AGREGANDO UN SERVICIO
import { Hero } from '../../interface/hero';

/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

Agregar mensajes adicionales al servicio de héroe
El siguiente ejemplo muestra cómo enviar y mostrar un mensaje cada vez que el usuario hace clic en
 un héroe, mostrando un historial de las selecciones del usuario. Esto será útil cuando llegue a la siguiente
  sección sobre Enrutamiento .

  https://angular.io/tutorial/toh-pt4#add-additional-messages-to-hero-service
----------------------------------------------------------------
*/

import { MessageService } from '../../services/message.service';
/*



Paso-2: Mostrar la lista de heroes
Mostrando héroes
Abra el HeroesComponentarchivo de clase e importe el simulacro HEROES

PASO-4: AGREGANDO UN SERVICIO
https://angular.io/tutorial/toh-pt4#add-services
LOS SERVICIOS SON UNA EXCELENTE MANERA DE COMPARTIR INFORMACIÓN (DATA) ENTRE CLASES QUE NO SE CONOCEN ENTRE SÍ

ELIMANAMOS "HEROES" POR QUE LO IMPLEMENTAMOS EN EL SERVICIO HERO.SERVICE.TS

//import { HEROES } from '../../../assets/mock-heroes';

*/



import { HeroService } from '../../services/hero.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	

/*
 hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  
PASO-4: AGREGANDO UN SERVICIO
definition of the heroes
  heroes = HEROES;
*/

//PASO-4: Replace the definition of the heroes property with a declaration.
  heroes: Hero[] =  [];

  

/*
PASO-4: AGREGANDO UN SERVICIO
//Paso-4.6: Inyectar el servicio HeroService
*/

  constructor(private heroService: HeroService,  private messageService: MessageService) { }

/*
<!----
PASO-5: Agregar navegación con enrutamiento
https://angular.io/tutorial/toh-pt5#add-navigation-with-routing

Si bien la clase HeroesComponent todavía funciona, el método onSelect() y la
 propiedad selectedHero ya no se utilizan.
*/



 
 /*
 PASO-4: AGREGANDO UN SERVICIO
 Crea un método para recuperar a los héroes del servicio.
 llame getHeroes()dentro del enlace del ciclo de vida ngOnInit y deje que Angular llame ngOnInit()en el momento apropiado después
  de construir una HeroesComponentinstancia
 */ 

  ngOnInit(): void {
  	this.getHeroes();
  }

	//AGREGAR EL CONTROLADOR DE EVENTOS DE CLIC
  /*
  PASO2: MOSTRAR UNA LISTA
  Agregar el controlador de eventos de clic
  https://angular.io/tutorial/toh-pt2#add-the-click-event-handler
   asigna el héroe en el que se hizo clic de la plantilla al componente selectedHero.
  */

  /*
	selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
*/


/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

Agregar mensajes adicionales al servicio de héroe
El siguiente ejemplo muestra cómo enviar y mostrar un mensaje cada vez que el usuario hace clic en
 un héroe, mostrando un historial de las selecciones del usuario. Esto será útil cuando llegue a la siguiente
  sección sobre Enrutamiento .

  https://angular.io/tutorial/toh-pt4#add-additional-messages-to-hero-service



Actualice el navegador para ver la lista de héroes y desplácese hasta la parte inferior para ver los mensajes
 del HeroService. Cada vez que haces clic en un héroe, aparece un nuevo mensaje para registrar la selección.
  Utilice el botón Borrar mensajes para borrar el historial de mensajes.


----------------------------------------------------------------
*/


/*
<!----
PASO-5: Agregar navegación con enrutamiento
https://angular.io/tutorial/toh-pt5#add-navigation-with-routing

Si bien la clase HeroesComponent todavía funciona, el método onSelect() y la
 propiedad selectedHero ya no se utilizan.
*/


/*
---------------------------------------
  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  Usamos el método getHeroes()
  -------------------------------------
*/
 

/*
PASO-4: AGREGANDO UN SERVICIO
  PASO-7: agregar el metodo getHeroes para recuperar a los héroes sincronicamente que no es bueno

  Observable HeroService

*/
// 


// Retornamos el listado sin un objeto observable

/*
  getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
}
*/


/*
Retornamos el listado con un objeto observable en su método subscribe
https://angular.io/tutorial/toh-pt4#subscribe-in-heroescomponent

*/

getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
}



/*
6- Obtener datos de un servidor
 https://angular.io/tutorial/toh-pt6
Cuando el nombre de pila no está en blanco, el controlador crea un objeto Hero similar al nombre (solo le falta el id) 
y lo pasa al método addHero() services .

Cuando addHero()guarda con éxito, la devolución de llamada subscribe() recibe al nuevo héroe y lo empuja a la lista
 heroes para mostrarlo.

*/



add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.addHero({ name } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
    });
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

delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero.id).subscribe();
      }

}
