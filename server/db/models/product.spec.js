const { expect } = require("chai");
const { db } = require("../../db");
const seed = require("../../../script/seed");
const { Product } = require("./product");

describe("Sequelize Model", () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  it("has fields name, gender, age, skills, cost, imageUrl", async () => {
    const newProduct = await Product.create({
      name: "Suzy",
      gender: "female",
      age: 81,
      skills: ["yelling", "smoking", "napping"],
      cost: 200,
      imageUrl: "https://content.fakeface.rest/female_66_be5c09c89a8c1170cd614293a0108000f9011c1f.jpg",
    });
    expect(newProduct.name).to.equal("Suzy");
    expect(newProduct.gender).to.equal("female");
    expect(newProduct.age).to.equal(81);
    expect(newProduct.skills).to.equal(["yelling", "smoking", "napping"]);
    expect(newProduct.cost).to.equal(200);
    expect(newProduct.imageUrl).to.equal("https://content.fakeface.rest/female_66_be5c09c89a8c1170cd614293a0108000f9011c1f.jpg");
  });

  it("*** requires name and address", async () => {
    const campus = Campus.build({});
    try {
      await campus.validate();
      throw Error("requires name and address");
    } catch (err) {}
  });

  it("name and address cannot be empty", async () => {
    const campus = Campus.build({ name: "", address: "" });
    try {
      await campus.validate();
      throw Error("validation should have failed with empty name and address");
    } catch (err) {
      expect(err.message).to.contain("Validation notEmpty on name");
      expect(err.message).to.contain("Validation notEmpty on address");
    }
  });

  it("default imageUrl if left blank", async () => {
    const campus = Campus.build({
      name: "Jupiter Jumpstart",
      address: "5.2 AU",
    });
    await campus.validate();
    expect(campus.imageUrl).to.be.a("string");
    expect(campus.imageUrl.length).to.be.greaterThan(1);
  });
});
