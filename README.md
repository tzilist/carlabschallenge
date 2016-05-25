# CarLabs Backend Challenge
Clustered API based server for discovering facts about pickles

## Installation
```bash
npm install
npm start
```
## Dependencies and Notes
This server requires a Redis server to be running. Gulp was chosen as a build tool to minify the source code to enhance performance by a small amount. It also allowed full exposure of ES6 features via babel.

## API
The current api stands as follows, there are two routes
```http://localhost:8080/fact```
This particular route makes a request to hook.io/samhavens/pickle for pickle facts and sends them to the user
```http://localhost:8080/recent/:number```
This route sends an array of the most recent :number of facts back to the user

Both of these can be tested via pickleClient.html, where an xhr request is sent to the localhost to demonstrate how both of these work.

## Testing
Testing is a little lacking on this particular project. In order to test, one must have the local server running. In order to circumvent this, tests must be re-written incorporating Sinon. Unfortunately due to the time constraints in this particular project, this was not handled appropriately. This is a future portion of this project that needs to be fixed.
