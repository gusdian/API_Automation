const assert = require("chai").expect;
const LoginPage = require("../page/LoginPage");
const request = require("supertest");

const request_url = "https://kasir-api.belajarqa.com";

describe("Categories", function () { 

  it("5. Add categories successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Add categories
    const response = await request(request_url)
      .post("/categories")
      .set(headers)
      .send({
            name: "snack",
            description: "snack dari unilever"    
            })
           
    assert(response.body).to.include.keys("status","message");
    assert(response.body.status).to.eql("success");
    assert(response.body.message).to.eql("Category berhasil ditambahkan");

  }).timeout(10000);

  it("6. Get categories list successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Get categories list
    const response = await request(request_url)
      .get(`/categories?q=snack&page=1`)
      .set(headers)
           
    assert(response.body).to.include.keys("status");
    assert(response.body.status).to.eql("success");

  }).timeout(10000);

})