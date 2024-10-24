import json

data = [
    {"id": 1, "userId": 236737, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T21:40:20Z", "updatedAt": "2024-10-23T21:40:20Z"},
    
    {"id": 39, "userId": 236745, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-23T23:00:30Z", "updatedAt": "2024-10-23T23:00:30Z"},

  # // PENDING Requests
  { "id": 1, "userId": 236737, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T21:40:20Z", "updatedAt": "2024-10-23T21:40:20Z" },
  { "id": 2, "userId": 236738, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-23T21:50:30Z", "updatedAt": "2024-10-23T21:50:30Z" },
  { "id": 3, "userId": 236739, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-23T22:00:00Z", "updatedAt": "2024-10-23T22:00:00Z" },
  { "id": 4, "userId": 236740, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T22:10:45Z", "updatedAt": "2024-10-23T22:10:45Z" },
  { "id": 5, "userId": 236741, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-23T22:20:55Z", "updatedAt": "2024-10-23T22:20:55Z" },
  { "id": 6, "userId": 236742, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-23T22:30:25Z", "updatedAt": "2024-10-23T22:30:25Z" },
  { "id": 7, "userId": 236743, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T22:40:05Z", "updatedAt": "2024-10-23T22:40:05Z" },
  { "id": 8, "userId": 236744, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-23T22:50:15Z", "updatedAt": "2024-10-23T22:50:15Z" },
  { "id": 9, "userId": 236745, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-23T23:00:30Z", "updatedAt": "2024-10-23T23:00:30Z" },
  { "id": 10, "userId": 236746, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T23:10:50Z", "updatedAt": "2024-10-23T23:10:50Z" },
  { "id": 11, "userId": 236747, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-23T23:20:00Z", "updatedAt": "2024-10-23T23:20:00Z" },
  { "id": 12, "userId": 236748, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-23T23:30:15Z", "updatedAt": "2024-10-23T23:30:15Z" },
  { "id": 13, "userId": 236749, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-23T23:40:45Z", "updatedAt": "2024-10-23T23:40:45Z" },
  { "id": 14, "userId": 236750, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-23T23:50:50Z", "updatedAt": "2024-10-23T23:50:50Z" },
  { "id": 15, "userId": 236751, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T00:00:00Z", "updatedAt": "2024-10-24T00:00:00Z" },
  { "id": 16, "userId": 236752, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-24T00:10:10Z", "updatedAt": "2024-10-24T00:10:10Z" },
  { "id": 17, "userId": 236753, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-24T00:20:20Z", "updatedAt": "2024-10-24T00:20:20Z" },
  { "id": 18, "userId": 236754, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T00:30:30Z", "updatedAt": "2024-10-24T00:30:30Z" },
  { "id": 19, "userId": 236755, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-24T00:40:40Z", "updatedAt": "2024-10-24T00:40:40Z" },
  { "id": 20, "userId": 236756, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-24T00:50:50Z", "updatedAt": "2024-10-24T00:50:50Z" },
  { "id": 21, "userId": 236757, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T01:00:00Z", "updatedAt": "2024-10-24T01:00:00Z" },
  { "id": 22, "userId": 236758, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-24T01:10:10Z", "updatedAt": "2024-10-24T01:10:10Z" },
  { "id": 23, "userId": 236759, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-24T01:20:20Z", "updatedAt": "2024-10-24T01:20:20Z" },
  { "id": 24, "userId": 236760, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T01:30:30Z", "updatedAt": "2024-10-24T01:30:30Z" },
  { "id": 25, "userId": 236761, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-24T01:40:40Z", "updatedAt": "2024-10-24T01:40:40Z"},
  { "id": 26, "userId": 236762, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-24T01:50:50Z", "updatedAt": "2024-10-24T01:50:50Z" },
  { "id": 27, "userId": 236763, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T02:00:00Z", "updatedAt": "2024-10-24T02:00:00Z" },
  { "id": 28, "userId": 236764, "userType": "Student", "requestType": "StudentApplication", "status": "PENDING", "createdAt": "2024-10-24T02:10:10Z", "updatedAt": "2024-10-24T02:10:10Z" },
  { "id": 29, "userId": 236765, "userType": "Student", "requestType": "StudentReplacement", "status": "PENDING", "createdAt": "2024-10-24T02:20:20Z", "updatedAt": "2024-10-24T02:20:20Z" },
  { "id": 30, "userId": 236766, "userType": "Student", "requestType": "StudentUpgrade", "status": "PENDING", "createdAt": "2024-10-24T02:30:30Z", "updatedAt": "2024-10-24T02:30:30Z" },

  # // APPROVED Requests
  { "id": 31, "userId": 236737, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-23T21:40:20Z", "updatedAt": "2024-10-23T21:40:20Z" },
  { "id": 32, "userId": 236738, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-23T21:50:30Z", "updatedAt": "2024-10-23T21:50:30Z" },
  { "id": 33, "userId": 236739, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-23T22:00:00Z", "updatedAt": "2024-10-23T22:00:00Z" },
  { "id": 34, "userId": 236740, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-23T22:10:45Z", "updatedAt": "2024-10-23T22:10:45Z" },
  { "id": 35, "userId": 236741, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-23T22:20:55Z", "updatedAt": "2024-10-23T22:20:55Z" },
  { "id": 36, "userId": 236742, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-23T22:30:25Z", "updatedAt": "2024-10-23T22:30:25Z" },
  { "id": 37, "userId": 236743, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-23T22:40:05Z", "updatedAt": "2024-10-23T22:40:05Z" },
  { "id": 38, "userId": 236744, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-23T22:50:15Z", "updatedAt": "2024-10-23T22:50:15Z" },
  { "id": 39, "userId": 236745, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-23T23:00:30Z", "updatedAt": "2024-10-23T23:00:30Z" },
  { "id": 40, "userId": 236746, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-23T23:10:50Z", "updatedAt": "2024-10-23T23:10:50Z" },
  { "id": 41, "userId": 236747, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-23T23:20:00Z", "updatedAt": "2024-10-23T23:20:00Z" },
  { "id": 42, "userId": 236748, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-23T23:30:15Z", "updatedAt": "2024-10-23T23:30:15Z" },
  { "id": 43, "userId": 236749, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-23T23:40:45Z", "updatedAt": "2024-10-23T23:40:45Z" },
  { "id": 44, "userId": 236750, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-23T23:50:50Z", "updatedAt": "2024-10-23T23:50:50Z" },
  { "id": 45, "userId": 236751, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-24T00:00:00Z", "updatedAt": "2024-10-24T00:00:00Z" },
  { "id": 46, "userId": 236752, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-24T00:10:10Z", "updatedAt": "2024-10-24T00:10:10Z" },
  { "id": 47, "userId": 236753, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-24T00:20:20Z", "updatedAt": "2024-10-24T00:20:20Z" },
  { "id": 48, "userId": 236754, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-24T00:30:30Z", "updatedAt": "2024-10-24T00:30:30Z" },
  { "id": 49, "userId": 236755, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-24T00:40:40Z", "updatedAt": "2024-10-24T00:40:40Z" },
  { "id": 50, "userId": 236756, "userType": "Student", "requestType": "StudentReplacement", "status": "APPROVED", "createdAt": "2024-10-24T00:50:50Z", "updatedAt": "2024-10-24T00:50:50Z" },
  { "id": 51, "userId": 236757, "userType": "Student", "requestType": "StudentUpgrade", "status": "APPROVED", "createdAt": "2024-10-24T01:00:00Z", "updatedAt": "2024-10-24T01:00:00Z" },
  { "id": 52, "userId": 236758, "userType": "Student", "requestType": "StudentApplication", "status": "APPROVED", "createdAt": "2024-10-24T01:10:10Z", "updatedAt": "2024-10-24T01:10:10Z" }
]


insert_statements = []

for entry in data:
    insert_stmt = f"INSERT INTO Requests (id, userId, userType, requestType, status, createdAt, updatedAt) VALUES ({entry['id']}, {entry['userId']}, '{entry['userType']}', '{entry['requestType']}', '{entry['status']}', '{entry['createdAt']}', '{entry['updatedAt']}');"
    insert_statements.append(insert_stmt)

# Output the insert statements
for stmt in insert_statements:
    print(stmt)
