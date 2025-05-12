import * as dotenv from "dotenv";
import { createServer } from "http";
import { getData, postRequest } from "./crud";
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = createServer((req, res) => {
  console.log(req.url);
  try {
    switch (req.method) {
      case "GET":
        getData(req, res);
        break;
      case "POST":
        postRequest(req, res);
        break;
      // case "PUT":
      //   // putRequest(req, res);
      //   break;
      // case "DELETE":
      //   // deleteRequest(req, res);
      //   break;
      // default:
      //   break;
    }
  } catch (err) {
    console.error(err);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
