const user = {
    firstName: "pepito",
    lastName: "pepin",
    email: "pepito@gmail.com",
    password: "pepito123",
    phone : "+51957654367"
  };
  
  const rejectedUser = {
    email : "pepito@gmail.com",
    password : "pepito12"
  }
  
  const acceptedUser = {
    email : "pepito@gmail.com",
    password : "pepito123"
  }
  
const updatedUser = {
    firstName: "Gabriel",
    lastName: "Mendoza",
    email: "gabriel@gmail.com",
    password: "gabriel123",
    phone : "+51957654367"
}  

module.exports = {user, rejectedUser, acceptedUser,updatedUser};