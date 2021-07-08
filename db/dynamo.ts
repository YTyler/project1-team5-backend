import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {config} from "dotenv";
config();

const REGION:string = process.env.region || "us-east-2"

const isTest = process.env.JEST_WORKER_ID;

const DBconfig = {
    region: REGION,
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! },
    ...(isTest && { endpoint: 'localhost:8000', sslEnabled: false, region: 'local-env' })
}

const ddb:DynamoDBClient = new DynamoDBClient(DBconfig)

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDoc = DynamoDBDocumentClient.from(ddb, translateConfig);
export{ddbDoc};
