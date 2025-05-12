import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";

export const getData = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const { url } = req;

  const { path, query } = parse(url!, true);

  switch (path) {
    case "api/users":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
      break;
    case "api/users/{userId}":
  }
};
