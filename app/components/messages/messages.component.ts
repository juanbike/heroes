import { Component, OnInit } from '@angular/core';

/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

El MessagesComponentdebería mostrar todos los mensajes, incluido 
el mensaje enviado por el HeroServicecuando busca héroes.
----------------------------------------------------------------
*/

import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


/*
-----------------------------------------------------------------
MOSTRAR MENSAJES EN TODA LA APLICACION
https://angular.io/tutorial/toh-pt4#inject-it-into-the-heroservice
Inyectar el servico de mensajes en hero.service.ts

Modifique el constructor con un parámetro que declare una propiedad pública messageService .
 Angular inyectará el singleton MessageServiceen esa propiedad cuando cree el MessagesComponent.

 La messageServicepropiedad debe ser pública porque la vinculará en la plantilla.

Angular solo se une a las propiedades de los componentes públicos .
----------------------------------------------------------------
*/


  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
