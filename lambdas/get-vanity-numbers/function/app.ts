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

 export interface ICaller {
    callerPhoneNumber: string,
    vanityNumbers: string[],
    dateCreated: string,
    timestampOfDateCreated: number
}

const sortCallsAsc = (firstCaller: ICaller,secondCaller: ICaller) => firstCaller.timestampOfDateCreated - secondCaller.timestampOfDateCreated;

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {

        const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
        
        const getAllVanityNumbers = await dynamoDBClient
            .scan({
                TableName: vanityNumberTableName,
                Select: "ALL_ATTRIBUTES"
            })
            .promise()
            .then((callersData: any) => {
                console.log('callersData',callersData)
                return callersData;
            });

        console.log('getAllVanityNumbers',getAllVanityNumbers);
        const lastFiveCallers = getAllVanityNumbers.Items
            .sort(sortCallsAsc)
            .reverse()
            .splice(0,5);

        response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Last 5 calls successfully obtained!',
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
                message: 'We encountered error while processing your request',
                errorMessage: err
            }),
        };
    }

    return response;
};
