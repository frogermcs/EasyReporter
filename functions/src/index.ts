import * as admin from 'firebase-admin';

admin.initializeApp()

export { reportProgress } from './functions/report-progress'
export { reportProgressBulk } from './functions/report-progress-bulk'
export { reportProgressToBQ } from './functions/report-progress-to-bq'