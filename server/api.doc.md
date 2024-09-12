# Game API Documentation

## Models

### Guess

```txt
- id : integer, required, primary key
- description : string, required

Here's the API documentation for your project, formatted in Markdown:

markdown
Copy code
# Game API Documentation

## Models

### Guess

```txt
- id : integer, required, primary key
- description : string, required
Endpoints
List of available endpoints:

GET /guess
POST /createRoom
POST /joinRandomRoom
POST /correctAnswer
1. GET /guess
Description:

Get all guess data from the database.
Response (200 - OK)

[
  {
    "id": 1,
    "description": "Sample Guess 1"
  },
  {
    "id": 2,
    "description": "Sample Guess 2"
  }
]

Response (500 - Internal Server Error)
{
  "message": "Internal Server Error"
}

2. POST /createRoom
Description:

Create a new game room.
Request:

body: (no specific body required)
Response (200 - OK)

{
  "roomId": "string"
}

3. POST /joinRandomRoom
Description:

Join a random game room.
Request:

body: (no specific body required)
Response (200 - OK)

{
  "roomId": "string"
}

Response (400 - Bad Request)

{
  "message": "Room full"
}

Response (404 - Not Found)

{
  "message": "No rooms available"
}

4. POST /correctAnswer
Description:

Submit a correct answer for the current game.
Request:

body:

{
  "roomId": "string"
}
Response (200 - OK)
{
  "message": "Answer accepted"
}

Response (404 - Not Found)

{
  "message": "Room not found"
}

WebSocket Events
Connection Events
connection: Triggered when a new user connects.
disconnect: Triggered when a user disconnects.
Game Events
online:users: Sent to all clients when the list of online users changes.
roomCreated: Sent to the creator of a new room.
roomJoined: Sent to a user who successfully joins a room.
startGame: Sent to all users in a room when a game starts.
timeUp: Sent to all users in a room when the time for the current round is up.
playerLeft: Sent to all users in a room when a player leaves.
gameEnded: Sent to all users in a room when the game ends.
Error Handling
Response (500 - Internal Server Error)

{
  "message": "Internal server error"
}