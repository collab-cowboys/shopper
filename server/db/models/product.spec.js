const { expect } = require("chai");
const app = require("../../index");
const agent = require("supertest")(app);
const {
  db,
  models: { Product },
} = require("../../db");

describe("Product Model and API Routes", () => {
  describe("Sequelize Model", () => {
    beforeEach(async () => await db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    it("has fields name, gender, age, skills, cost, imageUrl", async () => {
      const newProduct = await Product.create({
        name: "Suzy",
        gender: "female",
        age: 81,
        skills: ["yelling", "smoking", "napping"],
        cost: 200,
        imageUrl:
          "https://content.fakeface.rest/female_66_be5c09c89a8c1170cd614293a0108000f9011c1f.jpg",
      });
      expect(newProduct.name).to.equal("Suzy");
      expect(newProduct.gender).to.equal("female");
      expect(newProduct.age).to.equal(81);
      expect(newProduct.skills).to.deep.equal([
        "yelling",
        "smoking",
        "napping",
      ]);
      expect(newProduct.cost).to.equal(200);
      expect(newProduct.imageUrl).to.equal(
        "https://content.fakeface.rest/female_66_be5c09c89a8c1170cd614293a0108000f9011c1f.jpg"
      );
    });

    it("requires name, gender", async () => {
      const product = Product.build({});
      try {
        await product.validate();
      } catch (err) {
      expect(err.message).to.contain('name cannot be null')
      expect(err.message).to.contain('gender cannot be null')
      }
      
    });

    it("default imageUrl if left blank", async () => {
      const product = Product.build({
        name: "Bill",
        gender: "male",
      });
      await product.validate();
      expect(product.imageUrl).to.be.a("string");
      expect(product.imageUrl.length).to.be.greaterThan(1);
      expect(product.imageUrl).to.equal(
        "https://static.vecteezy.com/system/resources/previews/001/196/554/large_2x/person-png.png"
      );
    });
  });

  describe("API Routes", () => {
    beforeEach(async () => await db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    it("GET /api/products responds with all products", async () => {
      const response = await agent.get("/api/products").expect(200);
      expect(response.body).to.deep.equal([
        {
          name: "Suzy",
          gender: "female",
          age: 81,
          skills: ["yelling", "smoking", "napping"],
          cost: 200,
          imageUrl:
            "https://content.fakeface.rest/female_66_be5c09c89a8c1170cd614293a0108000f9011c1f.jpg",
        },
        {
          name: "Jeff",
          gender: "male",
          age: 72,
          skills: ["yelling", "drinking", "napping"],
          cost: 150,
          imageUrl:
            "https://content.fakeface.rest/male_74_ddd343138dfc9cedc148fa53a993be02036743d6.jpg",
        },
      ]);
      expect(Product.findAll.calledOnce).to.be.equal(true);
    });
  });
});
