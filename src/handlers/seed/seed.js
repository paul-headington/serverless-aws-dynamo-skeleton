require('dotenv/config');

const { withStatusCode } = require('../../utils/response.util');
const { SeedRunner } = require('../../../offline/seeds/seed.runner');

const ok = withStatusCode(200, JSON.stringify);
const _seedRunner = new SeedRunner();

exports.handler = async (event) => {   

  await _seedRunner.seedUsers()
    .then(() => log('Done!'))
    .catch(err => console.log(err));


  var message = [
    {
      "message": "Seeding Complete"
    }
  ];

  return ok(message);
};