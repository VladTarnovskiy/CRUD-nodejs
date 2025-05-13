import * as dotenv from "dotenv";
import { createServer } from "http";
import { deleteRequest, getData, postRequest, putRequest } from "./crud";
import { parseResponse } from "./utils";
import { serverError } from "./constant";
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = createServer((req, res) => {
  try {
    switch (req.method) {
      case "GET":
        getData(req, res);
        break;
      case "POST":
        postRequest(req, res);
        break;
      case "PUT":
        putRequest(req, res);
        break;
      case "DELETE":
        deleteRequest(req, res);
        break;
      default:
        break;
    }
  } catch {
    parseResponse(500, serverError, res);
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

process.on("SIGINT", async () => {
  server.close(() => process.exit());
});
