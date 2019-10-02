require('dotenv/config');

const { UserModel } = require('../../models/user.model');
const { withStatusCode } = require('../../utils/response.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const _userModel = new UserModel(docClient);
const noContent = withStatusCode(204);

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  await _userModel.delete(id);

  return noContent();
};