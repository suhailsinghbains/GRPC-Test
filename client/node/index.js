const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
const proto = grpc.load({root: protoPath, file: 'work_leave.proto' });

//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.work_leave.validation_Student('localhost:50050', grpc.credentials.createInsecure());

const student_to_be_checked={
  isThere:{
    roll_no: 1,
    name: 'Suhail'
  },
  notThere:{
    roll_no: 10,
    name: 'Ramesh'
  },
  inValid:{
    roll_no: 2,
    name: 'Test'
  },
  illegal:{
    roll_no: -1,
    name: 'Test'
  }
}
client.search_for_roll_no(student_to_be_checked.isThere, (error, response) =>{
  if(!error){
    if(response.value){
      console.log('Student Found');
    }
    else {
      console.log('Roll no found but, Student name not found');
    }
  }
  else {
    console.log("Error: ",error.message);
  }
});
