node-red-contrib-ethermine
================

Node-RED node for ethermine


## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-ethermine, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-ethermine

## Wrapper Ethermine  API  
- https://ethermine.org/api/

## Sample parameters
```js
// msg.payload = {};
// msg.payload.api = 'miner'; //pool or miner or worker
// msg.payload.action = 'dashboard'; // if api is miner then action is history, poyouts, rounds, settings, currnetStats
// msg.payload.api = 'pool'; //pool or miner or worker
// msg.payload.action = 'poolStats'; // if api is pool then action is poolStats, blocksHistory, networkStats, serversHistory
// msg.payload.api = 'worker'; //pool or miner or worker
// msg.payload.action = 'workers'; // if api is worker then action is worker, history, currentStats, monitor

return msg;
```
## Sample flows
```json
[{"id":"748930ca.60e81","type":"inject","z":"2422d0a1.5c053","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":190,"y":80,"wires":[["8980037d.66ffb"]]},{"id":"8980037d.66ffb","type":"function","z":"2422d0a1.5c053","name":"","func":"// msg.payload = {};\n// msg.payload.api = 'miner'\n// msg.payload.action = 'dashboard'\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":380,"y":80,"wires":[["8186cef9.9d81"]]},{"id":"8186cef9.9d81","type":"ethermine","z":"2422d0a1.5c053","name":"","api":"miner","action":"currentStats","sort":"","start":"","creds":"7534ad3b.61b354","x":570,"y":80,"wires":[["53d0ea43.c95fc4"]]},{"id":"53d0ea43.c95fc4","type":"debug","z":"2422d0a1.5c053","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":80,"wires":[]},{"id":"7534ad3b.61b354","type":"ethermine-miner","name":""}]
```
