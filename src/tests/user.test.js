const request = require("supertest");
const app = require("../app");

//===============================================================================================
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
  firstName: "pepo",
}  

let userId;
let token;

const BASE_URL = '/api/v1/users';


//=======================================================================================================

beforeAll(async()=>{
  const hits = {
    email: "academlo@gmail.com",
    password: "academlo123",
  }

  const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(hits)

  token = res.body.token;    

})

test("POST --> BASE_URL should return status code 201 and res.body.<property> = actor.<property>", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(user);

  userId= res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.lastName).toBe(user.lastName);
  expect(res.body.email).toBe(user.email);
  expect(res.body.phone).toBe(user.phone);



});

test("POST  --> BASE_URL/login should return status code 401", async()=>{
  const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(rejectedUser)

  
  expect(res.status).toBe(401);
})

test("POST  --> BASE_URL/login should return status code 201", async()=>{
  const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(acceptedUser)

  //console.log(res.body);
  
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.token).toBeDefined()
  expect(res.body.user.email).toBe(acceptedUser.email)

  //console.log(res.body);

})

test ("GET --> BASE_URL should return status code 200",  async()=>{
  const res =await request(app)
      .get(BASE_URL)
      .set("authorization", `Bearer ${token}`)



  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(2);

})

// test("GET/:id --> BASE_URL/:id  should return status code 201", async()=>{
//    const res= await request(app)
//       .get(`${BASE_URL}/${userId}`)
//       .set("authorization", `Bearer ${token}`)

//   expect(res.status).toBe(200);
//   expect(res.body).toBeDefined();
// })

test("PUT --> BASE_URL/:id should return status code 201", async()=>{
  const res = await request(app)
      .put(`${BASE_URL}/${userId}`)
      .send(updatedUser)
      .set("authorization", `Bearer ${token}`)

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(updatedUser.firstName);
})

test("DELETE --> BASE_URL/:id shoudl return status code 204", async()=>{
  const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set("authorization", `Bearer ${token}`)

  expect(res.status).toBe(204);
})