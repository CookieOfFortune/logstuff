import { Handler, Context, Callback } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

/*
interface CpuLoads {
  id: string;
  timestamp: string;
  cpu_loads: {
    medians: number[];
    stds: number[];
  }
}
*/

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
    }

    if(data.Items == null)
    {
      callback(new Error("No items found."));
    }
    else
    {    
      callback(null, data.Items[0]);
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

export { getCurrentCpuLoads }