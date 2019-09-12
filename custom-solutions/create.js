import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.identity.cognitoIdentityId;
  const params = {
    TableName: process.env.customSolutionsTableName,
    Item: {
      userId: userId,
      solutionId: uuid.v1(),
      solutionName: data.solutionName,
      problemId: data.problemId,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false, error: e });
  }
}
