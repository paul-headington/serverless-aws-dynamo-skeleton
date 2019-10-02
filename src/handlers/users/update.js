require('dotenv/config');

const { UserModel } = require('../../models/user.model');
const { withStatusCode } = require('../../utils/response.util');
const { parseWith } = require('../../utils/request.util');
const { withProcessEnv } = require('../../dynamodb.factory');

const docClient = withProcessEnv(process.env)();
const _userModel = new UserModel(docClient);
const ok = withStatusCode(200);
const badRequest = withStatusCode(400);
const notFound = withStatusCode(404);
const parseJson = parseWith(JSON.parse);

exports.handler = async (event) => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;

  const existingUser = await _userModel.get(id);
  const user = parseJson(body);

  if (!existingUser) {
    return notFound();
  }

  if (existingUser.id !== user.id) {
    return badRequest();
  }

  await _userModel.put(user);

  return ok(user);
};