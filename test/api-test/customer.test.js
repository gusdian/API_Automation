const assert = require("chai").expect;
const LoginPage = require("../page/LoginPage");
const request = require("supertest");

const request_url = "https://kasir-api.belajarqa.com";

describe("Customer", function () { 

  it("7. Add customer successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Add categories
    const response = await request(request_url)
      .post("/customers")
      .set(headers)
      .send({
        name: "Melati",
        phone: "081234567890",
        address: "Jatinegara",
        description: "customer royal"
            })
           
    assert(response.body).to.include.keys("status","message");
    assert(response.body.status).to.eql("success");
    assert(response.body.message).to.eql("Customer berhasil ditambahkan");

  }).timeout(10000);

  it("8. Get customer detail", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Get customer detail
    const response = await request(request_url)
      .get(`/customers/fa5e57a5-523d-477f-9808-a866fccc48c2`)
      .set(headers)
           
    assert(response.body).to.include.keys("status","data");
    assert(response.body.status).to.eql("success");
    assert(response.body.data.customer.name).to.eql("Melati");

  }).timeout(10000);

})