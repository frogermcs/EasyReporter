import * as functions from 'firebase-functions';

export class RequestHelper {

    logRequestDetails(request: functions.https.Request) {
        console.log('Request headers: ' + JSON.stringify(request.headers));
        console.log('Request body: ' + JSON.stringify(request.body));
    }

    isPostMethod(request: functions.https.Request) {
        return request.method === 'POST';
    }
    
    respondWithError(response: any, status: number, errors: any) {
        response
            .set("Content-Type", "application/json")
            .status(status)
            .send({ error: errors })
    }
}