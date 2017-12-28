const grpc = require('grpc');

const proto = grpc.load('proto/work_leave.proto');
const server = new grpc.Server();

/*
  Considering the following statement before-hand:
  Morning : 00:00 to 11:59
  Afternoon : 12:00 to 14:59
  Evening : 15:00 to 20:59
  Night : 21:00 to 23:59
*/

server.addProtoService(proto.work_leave.get_phrase.service,{
  catch_Phrase(call, callback){
    if(0<=call.request.hour&&call.request.hour<12){
      callback(null,{value: 1});
    }else if (call.request.hour<15) {
      callback(null,{value: 2});
    }else if (call.request.hour<21) {
      callback(null,{value: 3});
    }else {
      callback(null,{value: 4});
    }
  }
});
//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');
