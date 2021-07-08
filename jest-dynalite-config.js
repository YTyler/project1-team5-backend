module.exports = {
    tables: [
      {
        TableName: "SYLPH_MOCK",
        KeySchema: [{ AttributeName: "type", KeyType: "HASH" }, {AttributeName:"id", KeyType: "RANGE"}],
        AttributeDefinitions: [
          { AttributeName: "test", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    basePort: 8000,
  };