import { IncomingMessage, ServerResponse } from "http";
import { generateUserID, isReqDataValid, parseData } from "../utils";
import { API_URL, dataError, requestError } from "../constant";
import { parseResponse } from "../utils/response";
import { createUsers } from "../data";

export const postRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    if (req.url === API_URL) {
      const userData: any = await parseData(req);
      if (isReqDataValid(userData)) {
        userData.id = generateUserID();
        createUsers(userData);
        parseResponse(200, userData, res);
      } else {
        parseResponse(404, dataError, res);
      }
    } else {
      parseResponse(404, requestError, res);
    }
  } catch {
    throw new Error();
  }
};
