const request = require("supertest");
const app = require("../app");

const {user, rejectedUser,acceptedUser, updatedUser} = require("./testUtils/userUtils")
let userId;
let token;

const BASE_URL = '/api/v1/users';

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

  
  token = res.body.token;    
  
  expect(res.status).toBe(201);
})

test ("GET --> BASE_URL should return status code 200",  async()=>{
  const res =await request(app)
      .get(BASE_URL)
      .set("authorization", `Bearer ${token}`)



  expect(res.status).toBe(200);
})

test("GET --> BASE_URL/:id  should return status code 201", async()=>{
   const res= await request(app)
      .get(`${BASE_URL}/${userId}`)
      .set("authorization", `Bearer ${token}`)

  expect(res.status).toBe(201);
})

test("PUT --> BASE_URL/:id should return status code 201", async()=>{
  const res = await request(app)
      .put(`${BASE_URL}/${userId}`)
      .send(updatedUser)
      .set("authorization", `Bearer ${token}`)

  expect(res.status).toBe(201);
})

test("DELETE --> BASE_URL/:id shoudl return status code 204", async()=>{
  const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set("authorization", `Bearer ${token}`)

  expect(res.status).toBe(204);
})