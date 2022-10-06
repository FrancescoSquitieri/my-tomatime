# Le rotte

I rotte definiscono i percorsi all'interno dell'applicazione. Fastify fornisce un percorso facile verso un'architettura di microservizi, in futuro potresti desiderare per distribuire in modo indipendente alcuni di questi.

In questa cartella dovresti definire tutte le rotte che definiscono gli endpoint della tua applicazione web.

Ogni servizio è un [plugin Fastify](https://www.fastify.io/docs/latest/Reference/Plugins/), è incapsulato (può avere i suoi plugin indipendenti) e lo è tipicamente memorizzato in un file; fai attenzione a raggruppare i tuoi percorsi in modo logico, per esempio. tutti i percorsi `/users` in un file `users.js`. Abbiamo aggiunto un file `root.js` per te con una radice '/' aggiunta.

Se un singolo file diventa troppo grande, crea una cartella e aggiungi un file `index.js` lì: questo file deve essere un plug-in Fastify e verrà caricato automaticamente dall'applicazione. Puoi aggiungere tutti i file che vuoi all'interno di quella cartella. In questo modo puoi creare percorsi complessi all'interno di un unico monolite, ed eventualmente estrarli.

Se hai bisogno di condividere la funzionalità tra i percorsi, posizionalo
funzionalità nella cartella `plugins` e condividila tramite
[decoratori](https://www.fastify.io/docs/latest/Reference/Decorators/).

Se sei un po' confuso sull'uso di `async/await` per scrivere percorsi, lo faresti
meglio dare un'occhiata a [Promise resolution](https://www.fastify.io/docs/latest/Reference/Routes/#promise-resolution) per maggiori dettagli.