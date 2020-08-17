// let's go!
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// Use express middleware to populate current user
// Decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future request to access
    req.userId = userId;
  }
  next();
});
server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL, process.env.PLAYGROUND_URL],
    },
  },
  (server) => {
    console.log(`Server is running on http://localhost:${server.port}`);
  }
);
