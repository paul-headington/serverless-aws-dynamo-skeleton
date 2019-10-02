require('dotenv/config');

const { UserModel } = require('../../models/user.model');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const _userModel = new UserModel(docClient);
const ok = withStatusCode(200, JSON.stringify);
const notFound = withStatusCode(404);

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const user = await _userModel.get(id);

  if (!user){
    return notFound();
  }

  return ok(user);
};