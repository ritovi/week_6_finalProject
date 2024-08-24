const request = require("supertest");
const app = require("../app");

let token;
let categoryId;
const BASE_URL = "/api/v1/categories";
const login_url = "/api/v1/users";

beforeAll(async()=>{
    const hits = {
      email: "academlo@gmail.com",
      password: "academlo123",
    }
  
    const res = await request(app)
        .post(`${login_url}/login`)
        .send(hits)
  
    token = res.body.token;    
  
  })

const category = {
    name : "sport clothes"
}

test("POST --> must return a 201 status, category and their properties must be dfined", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set("authorization", `Bearer ${token}`)


    categoryId = res.body.id
    
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})

test("GET --> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
      .get(BASE_URL)

    console.log(res.body);  
      
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  }) 
  
  test("DELETE -> BASE_URL/categoryId, should return statusCode 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(204)
  })