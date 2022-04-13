import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const vanityNumberTableName = 'phone-vanity-numbers';

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
        
        const getAllVanityNumbers: AWS.DynamoDB.DocumentClient.GetItemOutput = await dynamoDBClient
            .scan({
                TableName: vanityNumberTableName,
                Select: "ALL_ATTRIBUTES"
            })
            .promise()
            .then((callersData: any) => {
                console.log('callersData',callersData)
                return callersData;
            });

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
