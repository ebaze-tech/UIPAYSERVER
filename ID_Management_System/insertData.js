const mysql = require("mysql");
require("dotenv").config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // e.g., 'localhost'
  user: process.env.DB_USER, // e.g., 'root'
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

// Array of records to insert
const insertRecords = 
  [
    // PENDING
    {
      "id": 1,
      "userId": 123456,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:41:00Z",
      "updatedAt": "2024-10-24T10:41:00Z"
    },
    {
      "id": 2,
      "userId": 234567,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:42:00Z",
      "updatedAt": "2024-10-24T10:42:00Z"
    },
    {
      "id": 3,
      "userId": 345678,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:43:00Z",
      "updatedAt": "2024-10-24T10:43:00Z"
    },
    {
      "id": 4,
      "userId": 456789,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:44:00Z",
      "updatedAt": "2024-10-24T10:44:00Z"
    },
    {
      "id": 5,
      "userId": 567890,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:45:00Z",
      "updatedAt": "2024-10-24T10:45:00Z"
    },
    {
      "id": 6,
      "userId": 678901,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:46:00Z",
      "updatedAt": "2024-10-24T10:46:00Z"
    },
    {
      "id": 7,
      "userId": 789012,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:47:00Z",
      "updatedAt": "2024-10-24T10:47:00Z"
    },
    {
      "id": 8,
      "userId": 890123,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:48:00Z",
      "updatedAt": "2024-10-24T10:48:00Z"
    },
    {
      "id": 9,
      "userId": 901234,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:49:00Z",
      "updatedAt": "2024-10-24T10:49:00Z"
    },
    {
      "id": 10,
      "userId": 123457,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:50:00Z",
      "updatedAt": "2024-10-24T10:50:00Z"
    },
    {
      "id": 11,
      "userId": 234568,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:51:00Z",
      "updatedAt": "2024-10-24T10:51:00Z"
    },
    {
      "id": 12,
      "userId": 345679,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:52:00Z",
      "updatedAt": "2024-10-24T10:52:00Z"
    },
    {
      "id": 13,
      "userId": 456780,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:53:00Z",
      "updatedAt": "2024-10-24T10:53:00Z"
    },
    {
      "id": 14,
      "userId": 567891,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:54:00Z",
      "updatedAt": "2024-10-24T10:54:00Z"
    },
    {
      "id": 15,
      "userId": 678902,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:55:00Z",
      "updatedAt": "2024-10-24T10:55:00Z"
    },
    {
      "id": 16,
      "userId": 789013,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:56:00Z",
      "updatedAt": "2024-10-24T10:56:00Z"
    },
    {
      "id": 17,
      "userId": 890124,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:57:00Z",
      "updatedAt": "2024-10-24T10:57:00Z"
    },
    {
      "id": 18,
      "userId": 901235,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:58:00Z",
      "updatedAt": "2024-10-24T10:58:00Z"
    },
    {
      "id": 19,
      "userId": 123458,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "PENDING",
      "createdAt": "2024-10-24T10:59:00Z",
      "updatedAt": "2024-10-24T10:59:00Z"
    },
    {
      "id": 20,
      "userId": 234579,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "PENDING",
      "createdAt": "2024-10-24T11:00:00Z",
      "updatedAt": "2024-10-24T11:00:00Z"
    },
  
    // APPROVED
    {
      "id": 21,
      "userId": 345680,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:01:00Z",
      "updatedAt": "2024-10-24T11:01:00Z"
    },
    {
      "id": 22,
      "userId": 456781,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:02:00Z",
      "updatedAt": "2024-10-24T11:02:00Z"
    },
    {
      "id": 23,
      "userId": 567892,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:03:00Z",
      "updatedAt": "2024-10-24T11:03:00Z"
    },
    {
      "id": 24,
      "userId": 678903,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:04:00Z",
      "updatedAt": "2024-10-24T11:04:00Z"
    },
    {
      "id": 25,
      "userId": 789014,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:05:00Z",
      "updatedAt": "2024-10-24T11:05:00Z"
    },
    {
      "id": 26,
      "userId": 890125,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:06:00Z",
      "updatedAt": "2024-10-24T11:06:00Z"
    },
    {
      "id": 27,
      "userId": 901236,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:07:00Z",
      "updatedAt": "2024-10-24T11:07:00Z"
    },
    {
      "id": 28,
      "userId": 123459,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:08:00Z",
      "updatedAt": "2024-10-24T11:08:00Z"
    },
    {
      "id": 29,
      "userId": 234580,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:09:00Z",
      "updatedAt": "2024-10-24T11:09:00Z"
    },
    {
      "id": 30,
      "userId": 345681,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:10:00Z",
      "updatedAt": "2024-10-24T11:10:00Z"
    },
    {
      "id": 31,
      "userId": 456782,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:11:00Z",
      "updatedAt": "2024-10-24T11:11:00Z"
    },
    {
      "id": 32,
      "userId": 567893,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:12:00Z",
      "updatedAt": "2024-10-24T11:12:00Z"
    },
    {
      "id": 33,
      "userId": 678904,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:13:00Z",
      "updatedAt": "2024-10-24T11:13:00Z"
    },
    {
      "id": 34,
      "userId": 789015,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:14:00Z",
      "updatedAt": "2024-10-24T11:14:00Z"
    },
    {
      "id": 35,
      "userId": 890126,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:15:00Z",
      "updatedAt": "2024-10-24T11:15:00Z"
    },
    {
      "id": 36,
      "userId": 901237,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:16:00Z",
      "updatedAt": "2024-10-24T11:16:00Z"
    },
    {
      "id": 37,
      "userId": 123460,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:17:00Z",
      "updatedAt": "2024-10-24T11:17:00Z"
    },
    {
      "id": 38,
      "userId": 234581,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:18:00Z",
      "updatedAt": "2024-10-24T11:18:00Z"
    },
    {
      "id": 39,
      "userId": 345682,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:19:00Z",
      "updatedAt": "2024-10-24T11:19:00Z"
    },
    {
      "id": 40,
      "userId": 456783,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "APPROVED",
      "createdAt": "2024-10-24T11:20:00Z",
      "updatedAt": "2024-10-24T11:20:00Z"
    },
  
    // REJECTED
    {
      "id": 41,
      "userId": 567894,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:21:00Z",
      "updatedAt": "2024-10-24T11:21:00Z"
    },
    {
      "id": 42,
      "userId": 678905,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:22:00Z",
      "updatedAt": "2024-10-24T11:22:00Z"
    },
    {
      "id": 43,
      "userId": 789016,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:23:00Z",
      "updatedAt": "2024-10-24T11:23:00Z"
    },
    {
      "id": 44,
      "userId": 890127,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:24:00Z",
      "updatedAt": "2024-10-24T11:24:00Z"
    },
    {
      "id": 45,
      "userId": 901238,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:25:00Z",
      "updatedAt": "2024-10-24T11:25:00Z"
    },
    {
      "id": 46,
      "userId": 123461,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:26:00Z",
      "updatedAt": "2024-10-24T11:26:00Z"
    },
    {
      "id": 47,
      "userId": 234582,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:27:00Z",
      "updatedAt": "2024-10-24T11:27:00Z"
    },
    {
      "id": 48,
      "userId": 345683,
      "userType": "Student",
      "requestType": "StudentReplacement",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:28:00Z",
      "updatedAt": "2024-10-24T11:28:00Z"
    },
    {
      "id": 49,
      "userId": 456784,
      "userType": "Student",
      "requestType": "StudentUpgrade",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:29:00Z",
      "updatedAt": "2024-10-24T11:29:00Z"
    },
    {
      "id": 50,
      "userId": 567895,
      "userType": "Student",
      "requestType": "StudentApplication",
      "status": "REJECTED",
      "createdAt": "2024-10-24T11:30:00Z",
      "updatedAt": "2024-10-24T11:30:00Z"
    }
  
  
]

// Insert records into the database
insertRecords.forEach(record => {
  const query = 'INSERT INTO Requests (id, userId, userType, requestType, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(query, [record.id, record.userId, record.userType, record.requestType, record.status, record.createdAt, record.updatedAt], (err, results) => {
    if (err) {
      console.error("Error inserting record: ", err);
    } else {
      console.log("Inserted record with id: ", record.id);
    }
  });
});

// Close the connection when done
connection.end();
