module.exports = {
  tables: [
    {
      TableName: `SYLPH_TABLE`,
      KeySchema: [{ AttributeName: "kind", KeyType: "HASH" }, { AttributeName: "id", KeyType: "RANGE" }],
      AttributeDefinitions: [
        { AttributeName: 'kind', AttributeType: 'S' },
        { AttributeName: 'id', AttributeType: 'N' }
      ],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
    // etc
  ],
};