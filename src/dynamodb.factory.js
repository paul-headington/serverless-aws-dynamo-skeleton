const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const withProcessEnv = ({ IS_OFFLINE, SLS_A_ENDPOINT, SLS_A_REGION, SLS_A_ACCESS_KEY_ID, SLS_A_SECRET_ACCESS_KEY }) => () => {
  let options;
  if (IS_OFFLINE == 'true') {
    console.log("internal", IS_OFFLINE);
    options = {
      endpoint: SLS_A_ENDPOINT,
      region: SLS_A_REGION,
      accessKeyId: SLS_A_ACCESS_KEY_ID,
      secretAccessKey: SLS_A_SECRET_ACCESS_KEY
    };
  }else{
    options = {
      region: SLS_A_REGION
    };
  }
  console.log('options', options)

  return new DocumentClient(options);
};

module.exports = {
  withProcessEnv
};