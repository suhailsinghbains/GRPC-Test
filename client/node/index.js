const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({root: protoPath, file: 'work_leave.proto' });

//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.work_leave.get_phrase('localhost:50050', grpc.credentials.createInsecure());
var date = new Date();
const time_to_be_checked={
  morning:{
    "hour": 11
  },
  afternoon:{
    "hour": 14
  },
  evening:{
    "hour": 17
  },
  night:{
    "hour": 22
  },
  test:{
    "hour": 21
  }
}
//date.getHours() --> gives the user's current time(hour)
//For Testing: use time_to_be_checked.(test_case)
client.catch_Phrase(date.getHours(), (error, response) =>{
  if(!error){
    switch(response.value){
      case 1:
        console.log("Good Morning");
        break;
      case 2:
        console.log("Good Afternoon");
        break;
      case 3:
        console.log("Good Evening");
        break;
      case 4:
        console.log("Good Night");
        break;
    }
  }
  else {
    console.log(error.message);
  }
});
