const request = require("supertest");

class LoginPage {
  constructor(url) {
    this.url = url;
  }

  async login() {
    const response = await request(this.url)
      .post("/authentications") 
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: "sanber47@mail.com",
        password: "123"
            }); 

    return response.body;
  }
}

module.exports = LoginPage;