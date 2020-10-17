import * as functions from 'firebase-functions';
import { BigQuery } from"@google-cloud/bigquery"
import { Progress } from '../models/progress';
import { hash } from 'hash-it'
import { Config } from '../config'

export const reportProgressToBQ = functions.firestore
    .document( Config.PROGRESS_FIRESTORE_ROOT + '/{project}/' + Config.PROGRESS_FIRESTORE_PROJECT_COLLECTION + '/{point}')
    .onCreate((snapshot, context) => {
        console.log(`New create event with params: ${JSON.stringify(context.params)}`)
        console.log(`New create event data: ${JSON.stringify(snapshot.data())}`)

        // DB Schema (it needs to be created in BigQuery first)
        // project	STRING	REQUIRED	
        // timestamp	INTEGER	REQUIRED
        // progress	FLOAT	REQUIRED	

        const bq = new BigQuery();
        const datasetName = "reporting_dataset"
        const tableName = "datapoints"
        const dataset = bq.dataset(datasetName)

        dataset.exists().catch(err => {
          console.error(
            `dataset.exists: dataset "${datasetName}" does not exist: ${JSON.stringify(
              err
            )}`
          )
          return err
        })

        const table = dataset.table(tableName)
        table.exists().catch(err => {
          console.error(
            `table.exists: table "${tableName}" does not exist: ${JSON.stringify(err)}`
          )
          return err
        })

        const progressData = snapshot.data() as Progress
        const rowsToInsert: Array<any> = [];

        const row = {
          insertId: hash(progressData.project + "_" + progressData.timestamp),
          json: {
              project: progressData.project,
              progress: progressData.progress,
              timestamp: progressData.timestamp
          }
        }
        rowsToInsert.push(row)
        
        return table.insert(row, { raw: true }).catch(err => {
          console.error(`table.insert: ${JSON.stringify(err)}`)
          return err
        })
    });