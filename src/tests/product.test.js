require('../models')

const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");

let categoryId;
let productId;
let token;
let category;

const BASE_URL = "/api/v1/products";
const login_url = "/api/v1/users/login";

let product;

beforeAll(async () => {
  const hits = {
    email: "academlo@gmail.com",
    password: "academlo123",
  };
  const res = await request(app).post(login_url).send(hits);

  token = res.body.token;

  category = await Category.create({ name: "men jackets" });
  product = {
    title: "Rice",
    description: " 20 kilograms",
    price: 20.5,
    categoryId: category.id,
  };

  categoryId = category.id;

  //    console.log(category);
});

afterAll(async () => {
  const jose = await Category.destroy({ where: { id: categoryId } });
  // await category.destroy()  another simpler way`
  //console.log("hola soy yo  ", jose);
});

test("POST -- > BASE_URL, should return status code 201, and res.body.title === product.title ", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set("authorization", `Bearer ${token}`);

  productId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
  expect(res.body.categoryId).toBe(category.id)
});

test("GET-- > BASE_URL  MUST RETURN 200 AND res.body.length =1 ", async () => {
  const res = await request(app).get(BASE_URL);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  //1:n
  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].id).toBe(category.id);
});

test("GET --> BASE_URL/:id, must return 200 and  res.body.title = product.title, res.body.categoryId = category.id", async()=>{
  const res = await request(app)
      .get(`${BASE_URL}/${productId}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe(product.title)
      expect(res.body.description).toBe(product.description);
      expect(res.body.categoryId).toBe(category.id)

})

test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {

  const updateProduct = {
    title: 'Jeans levis'
  }
  const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(updateProduct)
    .set('Authorization', `Bearer ${token}`)


  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(updateProduct.title)

  //1:n
  expect(res.body.categoryId).toBeDefined()
  expect(res.body.categoryId).toBe(category.id)
})


test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${productId}`)
      .set('Authorization', `Bearer ${token}`)

    // console.log(res.body);

    expect(res.status).toBe(204)
  })
