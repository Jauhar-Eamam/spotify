const app = require("./src/app");
require("dotenv").config();
const connectToDb = require("./src/db/db");

connectToDb();

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
