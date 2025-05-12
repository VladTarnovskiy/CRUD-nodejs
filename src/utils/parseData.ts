import { IncomingMessage } from "http";

export const parseData = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          const parsedData = JSON.parse(body);
          resolve(parsedData);
        }
        resolve("");
      });
    } catch (err) {
      reject(err);
    }
  });
};
