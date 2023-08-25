const assert = require("chai").expect;
const LoginPage = require("../page/LoginPage");
const request = require("supertest");

const request_url = "https://kasir-api.belajarqa.com";

describe("Unit", function () { 

  it("3. Add unit successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Add unit
    const response = await request(request_url)
      .post("/units")
      .set(headers)
      .send({
        name: "gram",
        description: "weight measurement"
     })
           
    assert(response.body).to.include.keys("status","message");
    assert(response.body.status).to.eql("success");
    assert(response.body.message).to.eql("Unit berhasil ditambahkan");

  }).timeout(10000);

  it("4. Get unit detail successfully", async () => {
    const loginPage = new LoginPage(request_url);
    const { data: { accessToken } } = await loginPage.login();
    const headers = { Authorization: `Bearer ${accessToken}` };
    
    // Get unit detail
    const response = await request(request_url)
      .get(`/units/3efb27e2-2e21-4cb9-b651-a90e4c9dff60`)
      .set(headers)
           
    assert(response.body).to.include.keys("status","data");
    assert(response.body.status).to.eql("success");
    assert(response.body.data.unit.name).to.eql("gram");

  }).timeout(10000);

})