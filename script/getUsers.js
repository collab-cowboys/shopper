const axios = require('axios');
require('dotenv').config()

async function getInfo() {
  const { data } = await axios.get(
    `https://randomuser.me/api/?inc=login,email&nat=US`
  );
  const { results } = data;
  const {
    login: { username, password },
    email,
  } = results[0];
  return { username, email, password };
}

async function produceUsers(userVolume) {
  const seedUsers = [];
  for (let i = 0; i < userVolume; i++) {
    seedUsers.push(await getInfo());
  }

  const admin = {username: process.env.ADMIN_USERNAME, email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, isAdmin: true}
  seedUsers.push(admin)

  return seedUsers;
}

module.exports = { produceUsers };
