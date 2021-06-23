const axios = require('axios');

const skills = [
  'drinking',
  'baking',
  'cursing',
  'knitting',
  'complaining',
  'reminiscing',
  'shouting',
  'crosswords',
  'gardening',
  'walking slowly',
  'tinkering',
];

const getGender = () => {
  const num = Math.floor(Math.random() * 2);
  const result = num ? 'female' : 'male';
  return result;
};

async function getNames(reqGender) {
  const { data } = await axios.get(
    `https://randomuser.me/api/?inc=name&gender=${reqGender}&nat=US`
  );
  const { results } = data;
  const { name } = results[0];
  return name.first;
}

const getSkills = (numSkills) => {
  let result = [];
  for (let i = 0; i < numSkills; i++) {
    const skillsLeft = skills.filter((skill) => !result.includes(skill));
    result.push(skillsLeft[Math.floor(Math.random() * skillsLeft.length)]);
  }
  return result;
};

async function getOldie() {
  const whatGender = getGender();
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return {
    name: await getNames(whatGender),
    gender: whatGender,
    age: Math.ceil(Math.random() * 10) + 60,
    skills: getSkills(Math.round(Math.random() + 3)),
    cost: Math.ceil((Math.random() * 10000) / 1000) * 100,
    inStock: Math.ceil(Math.random() * 30) + 10,
    imageUrl : `https://robohash.org/${randomString}.png`
  };
}

async function produceProducts(productVolume) {
  const seedProducts = [];
  for (let i = 0; i < productVolume; i++) {
    seedProducts.push(await getOldie());
  }
  return seedProducts;
}

module.exports = { produceProducts };
