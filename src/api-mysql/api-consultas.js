var Client = require('node-rest-client').Client;
var client = new Client();
var http = require('http');
var _ = require('lodash');
var api = process.env.apimysqlURL;//require('./api.json');


var consultas ={
    post:async (args,tableName)=>{
        return new Promise((resolve,reject)=>{
            client.post(api.url+tableName,args,(data,response)=>{
                console.log({post:{data:data,response:response}});
            });
        })
       
    },
    get:async (args,tableName)  =>{
        return new Promise((resolve,reject)=>{
            client.get(api.url+tableName,(data,response)=>{
                resolve({data:data,response:response});
            });
        })
       
    }
}

module.exports =consultas;