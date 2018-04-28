import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient();

const getCurrentCpuLoads: Handler = (_event: any, _context: Context, callback: Callback) => {
  const params : DynamoDB.DocumentClient.QueryInput = {
    TableName: "logstuff",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": "10s",
    },
    Limit: 1,
    ScanIndexForward: false,
  };

  db.query(params, (err, data) => {
    if(err) {
      callback(err);
      return;
    }

    if(data == null || data.Items == null)
    {
      callback(new Error("No items found."));
      return;
    }
     
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data.Items[0]),
    });
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

const getCpuLoadsSince: Handler<APIGatewayEvent> = (event, _context: Context, callback: Callback) => {
  if(!(event.queryStringParameters != null && event.queryStringParameters.timestamp != null))
  {
    callback(new Error("'timestamp' parameter not found."));
    return;
  }
  console.log(event.queryStringParameters);
  let timestamp = event.queryStringParameters.timestamp;

  const params : DynamoDB.DocumentClient.QueryInput = {
    TableName: "logstuff",
    KeyConditionExpression: "id = :id AND #timestamp > :timestamp",
    ExpressionAttributeNames: {
      "#timestamp": "timestamp",
    },
    ExpressionAttributeValues: {
      ":id": "10s",
      ":timestamp": timestamp,
    },
    Limit: 6 * 30,
    ScanIndexForward: false,
  };

  db.query(params, (err, data) => {
    if(err) {
      callback(err);
      return;
    }

    if(data == null || data.Items == null)
    {
      callback(new Error("No items found."));
      return;
    }
     
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data.Items),
    });
  });
};

export { getCpuLoadsSince, getCurrentCpuLoads }