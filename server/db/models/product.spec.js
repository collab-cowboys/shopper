const { expect } = require("chai");
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

    it("*** requires name, gender", async () => {
      const product = Product.build({});
      try {
        await product.validate();
        throw Error("requires name and gender");
      } catch (err) {}
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

    it("*** requires name, gender", async () => {
      const product = Product.build({});
      try {
        await product.validate();
        throw Error("requires name and gender");
      } catch (err) {}
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
});
