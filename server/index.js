const grpc = require('grpc');

const proto = grpc.load('proto/work_leave.proto');
const server = new grpc.Server();
var flag = 0;
const Students = {
  1:{
    "name": 'Suhail'
  },
  2:{
    "name": 'Ramesh'
  },
  3:{
    "name": 'Aleix'
  },
  4:{
    "name": 'Don'
  },
  5:{
    "name": 'JSON'
  }
}
server.addProtoService(proto.work_leave.validation_Student.service,{
  search_for_roll_no(call, callback){
    if(call.request.roll_no<=0){
      callback(new Error('Invalid Roll No'));
    }
    var i = 1;
    for(;i<Students.length;i++){
      if(i==call.request.roll_no){
        flag = 1;
        if(call.request.name==Students[i]["name"]){
          callback(null, {value: true});
        }
        else {
          callback(null, {value:false});
        }
      }
    }
    if(flag){
      callback(new Error('Roll No not found'));
    }
  }
});
//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');
