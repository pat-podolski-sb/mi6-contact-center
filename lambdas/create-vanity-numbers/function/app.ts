/* eslint-disable prettier/prettier */
import {
    Context, 
    ConnectContactFlowEvent, 
    ConnectContactFlowResult,
    ConnectContactFlowCallback
} from 'aws-lambda';
import * as AWS from 'aws-sdk';

const vanityNumberTableName = 'phone-vanity-numbers';

const dialNumberSet = [ "0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" ];

const createVanityKeyValuePairs = (initialVanityObject: {[key: string]: string}, vanityNumber: string, index: number) => {
    initialVanityObject['vanity' + index.toString()] = vanityNumber;
    return initialVanityObject;
};

const createVanityNumbers = (
    numberToBeChanged:  number[], 
    currentCount: number, 
    output: string[], 
    digitsCount: number, 
    vanityInside: string[]
): void => {

if (currentCount == digitsCount) {
    vanityInside.push(output.join(""));
    return;
}

for(let i = 0; i < dialNumberSet[numberToBeChanged[currentCount]].length; i++) {
    output.push(dialNumberSet[numberToBeChanged[currentCount]][i]);
    createVanityNumbers(numberToBeChanged, currentCount + 1, output, digitsCount, vanityInside);

    output.pop();

    if(numberToBeChanged[currentCount] == 0 || numberToBeChanged[currentCount] == 1) return;
    }
}

export const lambdaHandler = async (
    event: ConnectContactFlowEvent,
    context: Context,
    callback: ConnectContactFlowCallback,
): Promise<ConnectContactFlowResult | undefined> => {
    
    try {
        const callersNumber = event.Details.ContactData.CustomerEndpoint?.Address ;// getting phone number passed by Connect
        
        // Check if user already exists in DB
        const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
        const vanityNumbersForCurrentCaller: AWS.DynamoDB.DocumentClient.GetItemOutput = await dynamoDBClient
            .get({
                TableName: vanityNumberTableName,
                Key: {
                    callerPhoneNumber: callersNumber
                }
            })
            .promise()
            .then((dynamoDbResponse) => dynamoDbResponse);

        if(vanityNumbersForCurrentCaller.Item && vanityNumbersForCurrentCaller.Item.callerPhoneNumber) {
            return vanityNumbersForCurrentCaller.Item.vanityNumbers
                .reduce(createVanityKeyValuePairs,{} as {[key:string]: string});
        };

        // Calculation of Vanity Numbers
        const numberOfDigits = 6;
        const lastSixDigitsOfPhoneNumber = callersNumber!
            .slice(callersNumber!.length - numberOfDigits,callersNumber!.length)
            .split("")
            .map(item => Number(item));
        
        const firstPartOfPhoneNumber = callersNumber!
            .slice(0,callersNumber!.length - numberOfDigits);
        
        const vanityInside: string[] = [];
        createVanityNumbers(lastSixDigitsOfPhoneNumber, 0, [], numberOfDigits ,vanityInside);
        

        const newVanityNumbers: string[] = vanityInside
            .slice(0,5)
            .map( vanityPart => firstPartOfPhoneNumber.concat(vanityPart));
        
        // Creation of Vanity Numbers in Database
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
            .slice(0,3)
            .reduce(createVanityKeyValuePairs,{} as {[key:string]: string});

        callback(null, vanityNumbersForAmazonConnect);

    } catch (err) {
        console.log(err);
        return {
            statusCode: '500',
            body: JSON.stringify({
                message: 'We encountered an error',
                errMessage: err,
            }),
        };
    }
};
