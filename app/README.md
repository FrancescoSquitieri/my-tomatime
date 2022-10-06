# TOMATIME APP

In questo progetto dovrete implementare tutti i componenti necessari per la vostra applicazione.

## react-bootstrap

Avete già familiarità con SASS quindi non vi sorprenderà se il design system utilizzato è [react-boostrap](https://react-bootstrap.github.io/).
React Boostrap altro non è che un kit di componenti React basati sul framework [Bootstrap](https://getbootstrap.com).

La documentazione è ricca di esempi quindi quando vi ritroverete davanti ai Mockup cercate di identificare i diversi componenti di cui avete bisogno.

## SASS

Il progetto è già predisposto per l'utilizzo di SASS e include già il framework bootstrap al suo interno.
Probabilmente per effettuare tutte le modifiche di stile (colori, form, fonts, etc etc) affinché rispettiate il [Mockup](https://getbootstrap.com/docs/5.2/customize/sass/) creato da Anna Grazia, vi basterà sovrascrivere le variabili di Bootstrap (date uno sguardo al file `src/style/index.scss` e `src/style/_variables.scss` :smile:). 

Nel caso abbiate la necessità di creare nuovi componenti non esistate a fare quanto avete già fatto alla prima lezione del corso, create variabili e implementate componenti.

## Scritp disponibili

Nel file `package.json` avrete a disposizione due comandi.

### `npm start`

Esegue l'applicazione React in locale in modalità sviluppo.

### `npm run build`

Esegue una build di produzione dell'applicazione.

## File di `.env`

Nel file di enviroment dell'applicazione potete inserire tutte le variabili globali che l'applicazione utilizza. Per esempio potete aggiungere l'endpoint dell'api. 
Maggiori informazioni su come utilizzare i file `.env` in un'applicazione creata con `create-react-app` date uno sguardo [alla documentazione](https://create-react-app.dev/docs/adding-custom-environment-variables)