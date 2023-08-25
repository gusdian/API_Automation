const assert = require("chai").expect;
const LoginPage = require("../page/LoginPage");
const request = require("supertest");

const request_url = "https://kasir-api.belajarqa.com";

describe("User", function () { 

  it("1. Create user successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Creating new user
    const response = await request(request_url)
      .post("/users")
      .set(headers)
      .send({
        name: "kasir-serbaguna2",
        email: "user2@example.com",
        password: "123"
            })
           
    assert(response.body).to.include.keys("status","message");
    assert(response.body.status).to.eql("success");
    assert(response.body.message).to.eql("User berhasil ditambahkan");

  }).timeout(10000);

  it("2. Get user detail successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Get user detail
    const response = await request(request_url)
      .get(`/users/9a1236dd-ecbe-4c14-bcd2-60c202398c86`)
      .set(headers)
           
    assert(response.body).to.include.keys("status","data");
    assert(response.body.status).to.eql("success");
    assert(response.body.data.user.name).to.eql("kasir-serbaguna2");

  }).timeout(10000);
  
})