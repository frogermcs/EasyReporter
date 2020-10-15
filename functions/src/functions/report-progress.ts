import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { RequestHelper } from '../request-helper';
import { ProgressManager } from '../progress-manager';
import { Progress } from '../models/progress';

export const reportProgress = functions.https.onRequest((request, response) => {
    const requestHelper: RequestHelper = new RequestHelper();
    requestHelper.logRequestDetails(request);
    if (requestHelper.isPostMethod(request)) {
        const progressManager: ProgressManager = new ProgressManager(admin.firestore());
        progressManager.updateProgressFromJson(request.body as Progress)
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