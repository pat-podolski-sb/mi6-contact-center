import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const vanityNumberTableName = 'phone-vanity-numbers';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {

        const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
        
        const getAllVanityNumbers = await dynamoDBClient
            .scan({
                TableName: vanityNumberTableName,
                Select: "ALL_ATTRIBUTES"
            }
            ).promise()
            .then((callersData: any) => {
                console.log('callersData',callersData)
                return callersData;
            });
            // , (err: Error, data: any) => {
            //     if (err) {
            //         console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            //     } else {
            //         console.log('data',data);
            //         return data.Items;
            //     }
            // }
        console.log('getAllVanityNumbers',getAllVanityNumbers);
        const lastFiveCallers = getAllVanityNumbers.Items
            .sort((a:any,b: any) => a.timestampOfDateCreated-b.timestampOfDateCreated)
            .reverse()
            .splice(0,5);

        response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'hello world',
                lastFiveCallers
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }

    return response;
};
