require('dotenv/config');

const { UserModel } = require('../../models/user.model');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const _userModel = new UserModel(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async (event) => {
  const users = await _userModel.list();

  return ok(users);
};