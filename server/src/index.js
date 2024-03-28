import app from "./config/app.js";
import { PORT } from "./config/config.js";

function serverOn() {
  try {
    app.listen(PORT);
    console.log(`server on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}

serverOn();
