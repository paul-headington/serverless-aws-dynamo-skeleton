// require('dotenv/config');

// const { UsersSeeder } = require('./users.seeder');
// const { DynamoDB } = require('aws-sdk');
// const { DocumentClient } = DynamoDB;
// const usersData = require('./users-test-data.json');

// if (process.env.IS_OFFLINE == 'true') {
//   console.log("internal");
//   options = {
//     endpoint: process.env.SLS_A_ENDPOINT,
//     region: process.env.SLS_A_REGION,
//     accessKeyId: process.env.SLS_A_ACCESS_KEY_ID,
//     secretAccessKey: process.env.SLS_A_SECRET_ACCESS_KEY
//   };
// }else{
//   options = {
//     region: process.env.SLS_A_REGION
//   };
// }
// console.log('options', options)

// const dynamo = new DynamoDB(options);

// const doclient = new DocumentClient({ service: dynamo });
// const userSeeder = new UsersSeeder(dynamo, doclient);

// const log = (...mgs) => console.log('>>', ...mgs);

// const seedUsers = async () => {
//   log(`Checking if 'users' table exists`);

//   const exists = await userSeeder.hasTable();

//   if (exists) {
//     log(`Table 'users' exists, deleting`);
//     await userSeeder.deleteTable();
//   }

//   log(`Creating 'users' table`);
//   await userSeeder.createTable();

//   log('Seeding data');
//   await userSeeder.seed(usersData);
// };

const { SeedRunner } = require('./seed.runner');
const _seedRunner = new SeedRunner();

_seedRunner.seedUsers()
  .then(() => log('Done!'))
  .catch(err => console.log(err));