# CarLabs Backend Challenge
Clustered API based server for discovering facts about pickles

## Installation
```bash
npm install
npm start
```
## Dependencies and Notes
This server requires a Redis server to be running. Gulp was chosen as a build tool to minify the source code to enhance performance by a small amount. It also allowed full exposure of ES6 features via babel. The two main dependencies used were request and the node redis npm package (redis). These were used in order to create a simple https request to hook.io/samhavens/pickle and for interfacing with redis. Also used on the main server side was the cors package to allow outside sources to make requests securely. 

## API
The current api stands as follows, there are two routes
```http://localhost:8080/fact```
This particular route makes a request to hook.io/samhavens/pickle for pickle facts and sends them to the user
```http://localhost:8080/recent/:number```
This route sends an array of the most recent :number of facts back to the user

Both of these can be tested via ```client/pickleClient.html```, where an xhr request is sent to the localhost to demonstrate how both of these work.
## Methods
This particular project could potentially benefit from some liberal use of promises, co-routines, or FRP. That being said, the overall functionality was modularized fairly significantly and was hindered by the use of several npm modules and their structure (namely request and the redis node client).

## Testing
Testing is a little lacking on this particular project. Mocha and expect are the two forerunners here for the heavy lifting. A TDD practice was put in place with a watch command, run via npm run test:watch.  In order to test, one must have the local server running. In order to circumvent this, tests must be re-written incorporating Sinon. Unfortunately due to the time constraints in this particular project, this was not handled appropriately. This is a future portion of this project that needs to be fixed.
