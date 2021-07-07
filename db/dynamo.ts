import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {config} from "dotenv";
config();

const REGION:string = "us-east-2"
const config_dev = { 
    region: REGION, 
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! } 
}
const config_test = {
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
    })
}
const isTest: boolean = process.env.NODE_ENV === 'test';

const ddb:DynamoDBClient = isTest ? new DynamoDBClient(config_test) : new DynamoDBClient(config_dev)

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
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
