const User = require("../../models/User");


const user = {
    firstName: "academlo",
    lastName: "fullStack",
    email: "academlo@gmail.com",
    password: "academlo123",
    phone : "+51986785674"
  };


const createUser = async()=>{
       await  User.create(user);
}
  
module.exports = createUser;