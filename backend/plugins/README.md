# Cartella Plugin

I plugin definiscono il comportamento comune a tutti i percorsi nel tuo
applicazione. Autenticazione, memorizzazione nella cache, modelli e tutto il resto
 dovrebbero essere gestiti dai plugin inseriti in questa cartella.

I file in questa cartella sono in genere definiti tramite
il modulo [`fastify-plugin`](https://github.com/fastify/fastify-plugin),
rendendoli non incapsulati. Possono definire decoratori e impostare hooks
che verranno quindi utilizzati nel resto dell'applicazione.

Maggiori informazioni:

* [Guida per principianti ai plugin](https://www.fastify.io/docs/latest/Guides/Plugins-Guide/)
* [Fastify decorator](https://www.fastify.io/docs/latest/Reference/Decorators/).
* [Fastify ciclo di vita](https://www.fastify.io/docs/latest/Reference/Lifecycle/).
