import * as admin from 'firebase-admin';

admin.initializeApp()

export { reportProgress } from './functions/report-progress'

// export { reportReleasesBulk } from './functions/report-releases-bulk'
// export { reportRelease } from './functions/report-release'
// export { reportReleaseToBQ } from './functions/report-release-to-bq'
// export { reportProgress } from './functions/report-progress'
// export { reportProgressItemsBulk } from './functions/report-progress-points-bulk'
// export { reportProgressToBQ } from './functions/report-progress-to-bq'