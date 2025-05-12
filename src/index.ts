import * as dotenv from "dotenv";
import { createServer } from "http";
import {getData} from "./crud";
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = createServer((req, res) => {
try {
   switch (req.method) {
    case "GET":
      getData(req, res);
      break;
    case "POST":
      // postRequest(req, res);
      break;
    case "PUT":
      // putRequest(req, res);
      break;
    case "DELETE":
      // deleteRequest(req, res);
      break;
    default:
      break;
  }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
