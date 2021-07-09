import { PutCommandOutput } from "@aws-sdk/lib-dynamodb";

export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const sendFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));
// const sendFn = jest.fn().mockReturnValue(Promise.resolve())
console.log('mockDDB')

export const ddbDoc = {
  send : sendFn
}