import { 
    Context, 
    ConnectContactFlowEvent, 
    ConnectContactFlowResult,
    ConnectContactFlowCallback
} from 'aws-lambda';
import * as AWS from 'aws-sdk';

const vanityNumberTableName = 'phone-vanity-numbers';


const createVanityKeyValuePairs = (initialVanityObject: {[key: string]: string}, vanityNumber: string, index: number) => {
    initialVanityObject['vanity' + index.toString()] = vanityNumber;
    return initialVanityObject;
}


export const lambdaHandler = async (
    event: ConnectContactFlowEvent,
    context: Context,
    callback: ConnectContactFlowCallback,
): Promise<ConnectContactFlowResult > => {
    let response: ConnectContactFlowResult ;

    
    try {
        const callersNumber = (event as any)['Details']['ContactData']['CustomerEndpoint']['Address']; // getting phone number passed by Connect
        
        console.log(event);

        const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
        const vanityNumbersForCurrentCaller: any = await dynamoDBClient
            .get({
                TableName: vanityNumberTableName,
                Key: {
                    callerPhoneNumber: callersNumber
                }
            })
            .promise()
            .then((dynamoDbResponse) => dynamoDbResponse);

        console.log(vanityNumbersForCurrentCaller);

        if(vanityNumbersForCurrentCaller.Item && vanityNumbersForCurrentCaller.Item.callerPhoneNumber) {
            return vanityNumbersForCurrentCaller.Item.vanityNumbers
                .reduce(createVanityKeyValuePairs,{} as {[key:string]: string});
        };


        // Function that will create vanity numbers
        const newVanityNumbers: string[] = [callersNumber,callersNumber,callersNumber,callersNumber,callersNumber];

        const currentDate = new Date();
        const createNewVanityPhoneNumbers = await dynamoDBClient
            .put({
                TableName: vanityNumberTableName,
                Item: {
                    callerPhoneNumber: callersNumber,
                    vanityNumbers: newVanityNumbers,
                    dateCreated: currentDate.toString(),
                    timestampOfDateCreated: Date.parse(currentDate.toString())
                }
            })
            .promise()
            .then((putResponse) => putResponse);
        
        console.log('put response:',createNewVanityPhoneNumbers);
        
        const vanityNumbersForAmazonConnect = newVanityNumbers
            .reduce(createVanityKeyValuePairs,{} as {[key:string]: string});

        callback(null, vanityNumbersForAmazonConnect);

        // response = 'Success';
        response = {
            statusCode: '200',
            status: 'Success',
            body: JSON.stringify({
                message: 'vanity numbers created',
                vanityNumbers: newVanityNumbers,
                createNewVanityPhoneNumbers,
                vanityNumbersForAmazonConnect
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: '500',
            body: JSON.stringify({
                message: 'We encountered an error',
                errMessage: err
            }),
        };
    }

    return response;
};
