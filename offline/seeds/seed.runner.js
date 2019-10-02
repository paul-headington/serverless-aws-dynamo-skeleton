require('dotenv/config');

const { UsersSeeder } = require('./users.seeder');
const { DynamoDB } = require('aws-sdk');
const { DocumentClient } = DynamoDB;
const usersData = require('./users-test-data.json');


class SeedRunner {

  constructor() {
    let options;
    if (process.env.IS_OFFLINE == 'true') {
      console.log("internal");
      options = {
        endpoint: process.env.SLS_A_ENDPOINT,
        region: process.env.SLS_A_REGION,
        accessKeyId: process.env.SLS_A_ACCESS_KEY_ID,
        secretAccessKey: process.env.SLS_A_SECRET_ACCESS_KEY
      };
    }else{
      options = {
        region: process.env.SLS_A_REGION
      };
    }
    console.log('options', options)
    
    this.dynamo = new DynamoDB(options);
    
    this.doclient = new DocumentClient({ service: this.dynamo });
    this.userSeeder = new UsersSeeder(this.dynamo, this.doclient);
  }

  async seedUsers() {
    if (process.env.IS_OFFLINE == 'true') {
      this.log(`Checking if 'users' table exists`);

      const exists = await this.userSeeder.hasTable();

      if (exists) {
        //this.log(`Table 'users' exists, deleting`);
        await this.userSeeder.deleteTable();
      }

      //this.log(`Creating 'users' table`);
      await this.userSeeder.createTable();
    }

      this.log('Seeding data');
      await this.userSeeder.seed(usersData);
  }

  async log(mgs) {
    console.log('>>', mgs);
  }   

}

exports.SeedRunner = SeedRunner;