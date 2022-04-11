import { 
    Context, 
    ConnectContactFlowEvent, 
    ConnectContactFlowResult,
    ConnectContactFlowCallback
} from 'aws-lambda';
import * as AWS from 'aws-sdk';

export const lambdaHandler = async (
    event: ConnectContactFlowEvent,
    context: Context,
    callback: ConnectContactFlowCallback,
): Promise<ConnectContactFlowResult> => {
    let response: ConnectContactFlowResult;

    

    try {
        response = {
            statusCode: '200',
            status: 'Success',
            body: JSON.stringify({
                message: 'vanity numbers created',
                vanityNumbers: []
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
