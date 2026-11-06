import { createServer } from "node:http";
import { handle } from "./server.js";

const port = Number(process.env.PORT ?? 3000);
createServer(handle).listen(port, () => {
  console.log(`Todo API on http://localhost:${port}/todos`);
});
