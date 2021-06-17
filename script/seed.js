"use strict";

const {
  db,
  models: { User, Product, Transaction, Order },
} = require("../server/db");
const { produceProducts } = require("./getProducts");
const { produceUsers } = require("./getUsers");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const numberOfProducts = 20;
const numberOfUsers = 10;

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const tempUsers = await produceUsers(numberOfUsers);
  const users = await Promise.all(
    tempUsers.map(async (user) => await User.create(user))
  );

  // Creating Products
  const tempProducts = await produceProducts(numberOfProducts);
  const products = await Promise.all(
    tempProducts.map(async (product) => await Product.create(product))
  );

  // Create Order
  const orderNoUserNoItems = await Order.create();
  const orderWithUserNoItems = await Order.create({ userId: 1 });
  const orderWithUserWithItems = await Order.create({ userId: 2 });

  const prod1 = await Product.findByPk(3);
  const prod2 = await Product.findByPk(5);
  const prod3 = await Product.findByPk(7);

  await orderWithUserWithItems.addProducts([prod3], {through: {quantity: 2, totalPrice: prod3.cost * 2}});
  await orderWithUserWithItems.addProduct(prod1, {through: {quantity: 1, totalPrice: prod1.cost * 1}});

  console.log(`seeded ${products.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
