require('dotenv/config');

const { UserModel } = require('../../models/user.model');
const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const _userModel = new UserModel(docClient);
const created = withStatusCode(201);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
  const { body } = event;
  const user = parseJson(body);

  await _userModel.put(user);

  return created();
};