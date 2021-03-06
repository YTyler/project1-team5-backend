"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddbDoc = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const REGION = process.env.region || "us-east-2";
const isTest = process.env.JEST_WORKER_ID;
const DBconfig = {
    region: REGION,
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY },
    ...(isTest && { endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env' })
};
const ddb = new client_dynamodb_1.DynamoDBClient(DBconfig);
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false,
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true,
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDoc = lib_dynamodb_1.DynamoDBDocumentClient.from(ddb, translateConfig);
exports.ddbDoc = ddbDoc;
