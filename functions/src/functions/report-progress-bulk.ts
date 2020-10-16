import * as functions from 'firebase-functions';
import { RequestHelper } from '../request-helper';
import { ProgressManager } from '../progress-manager';
import * as admin from 'firebase-admin';

export const reportProgressBulk = functions.https.onRequest((request, response) => {
    const requestHelper: RequestHelper = new RequestHelper();
    requestHelper.logRequestDetails(request);

    if (requestHelper.isPostMethod(request)) {
        const progressManager: ProgressManager = new ProgressManager(admin.firestore());
        progressManager.updateProgressPointsFromJson(request.body)
            .then(progressDocument => {
                response.status(200).send(progressDocument);
            })
            .catch(errors => {
                console.log("Promise rejected (validation failed). Errors: ", errors);
                requestHelper.respondWithError(response, 422, errors);
            });
    } else {
        requestHelper.respondWithError(response, 403, "Forbidden!");
    }
});