import * as admin from 'firebase-admin';

admin.initializeApp()

export { reportProgress } from './functions/report-progress'
export { reportProgressBulk } from './functions/report-progress-bulk'