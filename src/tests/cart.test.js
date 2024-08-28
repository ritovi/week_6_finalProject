require("../models")

const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");

let cartId;
let token;
let cart;

let category, product;

let updateCart = { quantity : 7}

const BASE_URL = "/api/v1/cart";
const login_url = "/api/v1/users/login";

beforeAll(async () => {
  const hits = {
    email: "academlo@gmail.com",
    password: "academlo123",
  };
  const res = await request(app).post(login_url).send(hits);

  token = res.body.token;
  
  category = await Category.create({ name: "men jackets" });


  const productObject = {
    title: "Rice",
    description: " 20 kilograms",
    price: 20.5,
    categoryId: category.id,
  };
  
  product = await Product.create(productObject);

  cart = {
    productId : product.id,
    quantity: 5,
  }
  

});

afterAll(async () => {
  await category.destroy() 
  await product.destroy()
});

test("POST -- > BASE_URL, should return  201 and res.body.userId = cart.userId and res.body.quantity = cart.quantity.toString()", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send(cart)
      .set("authorization", `Bearer ${token}`);
  
    cartId = res.body.id;

   // console.log(res.body);
  
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined()
    expect(res.body.productId).toBe(cart.productId)
    expect(res.body.quantity).toBe(cart.quantity)
  });


test("GET -- > BASE_URL, should return  200 and res.body[0].product,toBeDefined() and res.body[0].category.toBeDefined()", async () => {
    const res = await request(app)
      .get(BASE_URL)
      .set("authorization", `Bearer ${token}`);
  

    //console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].product.category).toBeDefined()
    expect(res.body[0].product.category.name).toBeDefined()

});

test("GET -- > BASE_URL/:cartId, should return  200 and res.body.product,toBeDefined() and res.body.category.toBeDefined()", async () => {
    const res = await request(app)
      .get(`${BASE_URL}/${cartId}`)
      .set("authorization", `Bearer ${token}`);
  

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body.product).toBeDefined()
    expect(res.body.product.category).toBeDefined()
    expect(res.body.product.category.name).toBeDefined()

});


test("UPDATE -- > BASE_URL/:cartId, should return  200 and res.body.quantity = updateCart.quantity ", async () => {
    const res = await request(app)
      .put(`${BASE_URL}/${cartId}`)
      
      .send(updateCart)
      .set("authorization", `Bearer ${token}`);
  

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(updateCart.quantity)
});


test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${cartId}`)
      .set('Authorization', `Bearer ${token}`)

    // console.log(res.body);

    expect(res.status).toBe(204)
  })