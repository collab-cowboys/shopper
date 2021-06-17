const axios = require("axios");


async function getInfo() {
  const { data } = await axios.get(
    `https://randomuser.me/api/?inc=name&nat=US&email`
  );
  const { results } = data;
  const { login: { username }, email  } = results[0];
  return {username, email, password: 'password' };
}

async function produceUsers(userVolume) {
const seedUsers = [];
    for (let i = 0; i < userVolume; i++) {
    seedProducts.push(await getInfo());
  }
  return seedProducts
}


module.exports = { produceProducts };
