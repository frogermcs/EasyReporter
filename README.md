# EasyReporter
Firebase Cloud Functions for basic reporting purposes.

## List of functions

For source code check `src/functions/` directory. The list of implemented functions:

### Progress tracking

* **reportProgress** -  HTTPS function for reporting single progress point for any project. Progress entry is saved to Firebase Firestore.

### reportProgress HTTPS Function

**URL**
https://<firebase project base path>/reportProgress

**Method**
`POST`

**Headers**
`Content-Type: application/json`

**Request data**

**Progress** object: 
* `project` - string, required
* `progress` - float, required
* `timestamp` - integer, required

**Example request:**

POST: `https://<forebase projects base path>/reportProgress`

Headers: `Content-Type: application/json`

Body:
```json
{
    "project": "migration-progress",
    "progress" : 80.76,
    "timestamp" : 1
}
```

### reportProgressBulk HTTPS Function

**URL**
https://<forebase projects base path>/reportProgressBulk

**Method**
`POST`

**Request data**

**Progress** object: 
* `project` - string, required
* `progress` - float, required
* `timestamp` - integer, required

**Example request:**

POST: `https://<forebase projects base path>/reportProgressBulk`

Headers: `Content-Type: application/json`

Body:
```json
[
	{
		"project": "migration-progress",
		"progress" : 77.11,
		"timestamp" : 1
	},
	{
		"project": "migration-progress",
		"progress" : 80.76,
		"timestamp" : 2
	}
]
```


### reportProgressToBQ Firestore Trigger Function

This is Firestore Function trigger that copy newly created Firestore document into Big Query table.

Firestore document path: `progress_tracking/{project}/datapoints/{point}`

**Big Query setup**

Dataset name: `reporting_dataset`

Table name: `datapoints`

Database schema:
```
project		STRING	REQUIRED		
timestamp	INTEGER	REQUIRED
progress	FLOAT	REQUIRED	
```

## Firestore Data Scheme

Functions `reportProgress` and `reportProgressBulk` add documents into Firebase Firestore collections. Collections path:

`progress_tracking/{project}/datapoints/{point}`

Document scheme:

* `project` - string
* `timestamp` - number
* `progress` - number
