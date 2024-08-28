require("../models")

const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

let token;

let category, product,cart;



const BASE_URL = "/api/v1/purchase";
const login_url = "/api/v1/users/login";

beforeAll(async () => {
  const hits = {
    email: "academlo@gmail.com",
    password: "academlo123",
  };
  const res = await request(app).post(login_url).send(hits);

  token = res.body.token;
  
  category = await Category.create({ name: "Slacks" });


  const productObject = {
    title: "dark blue",
    description: "dark blue for men",
    price: 20.5,
    categoryId: category.id,
  };
  
  product = await Product.create(productObject);

  const cartObject = {
    productId : product.id,
    quantity: 5,
    userId : res.body.user.id
  }

  cart = await Cart.create(cartObject);

  //console.log(cart);
  

});

afterAll(async () => {
  await category.destroy() 
  await product.destroy()
  await cart.destroy();
});

test("POST -- > BASE_URL, should return  201 and res.body.length() = 1", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .set("authorization", `Bearer ${token}`);
  
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);


    //console.log(res.body);
    
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

