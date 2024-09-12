const request = require("supertest");
const ioClient = require("socket.io-client");
const app = require("../app"); // Your Express app
const { Guess, sequelize } = require("../models");
const { queryInterface } = sequelize;
let httpServer, io;


let guessTest = [
  { id: 1, word: "apple" },
  { id: 2, word: "banana" },
];


beforeAll(async () => {
  httpServer = require("http").createServer(app);
  io = require("socket.io")(httpServer);
  
  await queryInterface.bulkDelete("Guesses", null, {});
  await queryInterface.bulkInsert("Guesses", guessTest, {});
});


afterAll(async () => {
  await queryInterface.bulkDelete("Guesses", null, {});
  await httpServer.close();
});


describe("GET /guess", () => {
  test("200 Success - Fetch all guesses", (done) => {
    request(httpServer)
      .get("/guess")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("word");
        done();
      })
      .catch((err) => done(err));
  });
});


describe("Socket.io connection", () => {
  let socket;

  beforeAll((done) => {
    socket = ioClient(`http://localhost:${process.env.PORT || 3000}`, {
      auth: { username: "testUser" },
    });
    socket.on("connect", done);
  });

  afterAll(() => {
    if (socket.connected) socket.disconnect();
  });

  test("should receive online:users event", (done) => {
    socket.once("online:users", (users) => {
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      expect(users[0]).toHaveProperty("id");
      expect(users[0]).toHaveProperty("username", "testUser");
      done();
    });
  });

  test("should create a room and receive roomCreated event", (done) => {
    socket.emit("createRoom");
    socket.once("roomCreated", (roomId) => {
      expect(typeof roomId).toBe("string");
      expect(roomId).toHaveLength(13); 
      done();
    });
  });
  
  test("should join a random room and receive roomJoined event", (done) => {
    socket.emit("joinRandomRoom");
    socket.once("roomJoined", (roomId) => {
      expect(typeof roomId).toBe("string");
      done();
    });
  });
});
