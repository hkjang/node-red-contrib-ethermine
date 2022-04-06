const axios = require("axios");
const url = 'https://api.ethermine.org';
module.exports = function (RED) {
    function FunctionNode(n) {
        RED.nodes.createNode(this, n);
        if (RED.nodes.getNode(n.creds)){
            this.miner = RED.nodes.getNode(n.creds).credentials.miner;
            this.worker = RED.nodes.getNode(n.creds).credentials.worker;
        } else {
            this.miner = "";
            this.worker = "";
        }
        var node = this;
        this.name = n.name;

        for (var key in n) {
            node[key] = n[key] || "";
        }
        this.on('input', function (msg) {
            for (var i in msg) {
                if (i !== 'req' | i !== 'res' | i !== 'payload' | i !== 'send' | i !== '_msgid') {
                    node[i] = msg[i] || node[i];
                }
            }

            node.options = {};
            // node.options.headers = {};
            if(n.api && n.action){
                node.payload = {};
                node.payload.api = n.api;
                node.payload.action = n.action;
            }else{
                if(!node.payload.api){
                    msg.payload = 'need to msg.payload.api';
                    node.send(msg);
                }else if(!node.payload.action){
                    msg.payload = 'need to msg.payload.action';
                    node.send(msg);
                }
            }
            if(node.payload.api.toLowerCase() === 'pool'){
                if(node.payload.action === 'poolStats'){
                    node.url = url +  '/poolStats';
                }else if(node.payload.action === 'blocksHistory'){
                    node.url = url +  '/blocks/history';
                }else if(node.payload.action === 'networkStats'){
                    node.url = url +  '/networkStats';
                }else if(node.payload.action === 'serversHistory'){
                    node.url = url +  '/servers/history';
                }
            }else if(node.payload.api.toLowerCase() === 'miner'){
                if(node.payload.action === 'dashboard'){
                    node.url = url +  '/miner/' + node.miner + '/dashboard';
                }else if(node.payload.action === 'history'){
                    node.url = url +  '/miner/' + node.miner + '/history';
                }else if(node.payload.action === 'payouts'){
                    node.url = url +  '/miner/' + node.miner + '/payouts';
                }else if(node.payload.action === 'rounds'){
                    node.url = url +  '/miner/' + node.miner + '/rounds';
                }else if(node.payload.action === 'settings'){
                    node.url = url +  '/miner/' + node.miner + '/settings';
                }else if(node.payload.action === 'currentStats'){
                    node.url = url +  '/miner/' + node.miner + '/currentStats';
                }
            }else if(node.payload.api.toLowerCase() === 'worker'){
                if(node.payload.action === 'workers'){
                    node.url = url +  '/miner/' + node.miner + '/workers';
                }else if(node.payload.action === 'history'){
                    node.url = url +  '/miner/' + node.miner + '/worker/' + node.worker + '/history';
                }else if(node.payload.action === 'currentStats'){
                    node.url = url +  '/miner/' + node.miner + '/worker/' + node.worker +'/currentStats';
                }else if(node.payload.action === 'monitor'){
                    node.url = url +  '/miner/' + node.miner + '/worker/' + node.worker +'/monitor';
                }
            }

            axios.get(node.url, node.options)
                .then(function (response){
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function (err){
                    msg.payload = err;
                    node.send(msg);
                });
        });
    }

    RED.nodes.registerType("ethermine", FunctionNode, {
        credentials: {
            miner: {type:"text"},
            worker: {type:"text"}
        }
    });

    function ethermineMiner(n){
        RED.nodes.createNode(this, n);
        this.miner = n.miner;
        this.worker = n.worker;
    }

    RED.nodes.registerType("ethermine-miner", ethermineMiner,{
        credentials: {
            miner: {type:"text"},
            worker: {type:"text"}
        }
    });
};
