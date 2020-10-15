import { Progress, WrappedProgress } from './models/progress';
import { validateOrReject } from "class-validator";
import * as admin from 'firebase-admin';

export class ProgressManager {

    firestoreDb: admin.firestore.Firestore;

    constructor(firestoreDb: admin.firestore.Firestore) {
        this.firestoreDb = firestoreDb;
    }

    updateProgressFromJson(progressResp: Progress) {
        // New object so class-validator validation works
        const progress: Progress = new Progress(progressResp);
        const progressPointsList: WrappedProgress = new WrappedProgress([progress]);
        return this.validateAndSave(progressPointsList);
    }

    updateProgressPointsFromJson(progressPointsListResp: any) : Promise<any>{
        if (Array.isArray(progressPointsListResp)) {
            const progressPointsList: WrappedProgress = new WrappedProgress(progressPointsListResp.map(x => new Progress(x)));
            return this.validateAndSave(progressPointsList);
        } else {
            return Promise.reject(new Error("Expected array of objects."))
        }
    }

    private validateAndSave(progressPointsList: WrappedProgress) {
        return validateOrReject(progressPointsList, { validationError: { target: false } })
                .then(() => {
                    const batch = this.firestoreDb.batch();
                    progressPointsList.list.forEach(progressItem => {
                        const versionRef = this.firestoreDb.collection('progress_tracking')
                            .doc(progressItem.project)
                            .collection('datapoints')
                            .doc(progressItem.timestamp.toString())

                        batch.set(versionRef, {
                            project: progressItem.project,
                            progress: progressItem.progress,
                            timestamp: progressItem.timestamp
                        })
                    });

                    return batch.commit();
                })
    }
}