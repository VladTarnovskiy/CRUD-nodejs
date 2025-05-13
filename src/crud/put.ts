import { IncomingMessage, ServerResponse } from "node:http";
import {
  API_URL,
  existUserError,
  dataError,
  requestError,
  idError,
} from "../constant";
import { getCurrentData, updateUsers } from "../data";
import {
  getUrlIdParam,
  isReqDataValid,
  parseData,
  parseResponse,
} from "../utils";
import { IUser } from "../model";
import { validate } from "uuid";

export const putRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const idParam = getUrlIdParam(req.url!);
  const currentData = await getCurrentData();

  if (req.url?.startsWith(API_URL) && idParam) {
    const filteredData = currentData.filter(
      (user: IUser) => user.id === idParam
    );
    const userData: any = await parseData(req);
    if (!validate(idParam)) {
      parseResponse(400, idError, res);
    } else if (isReqDataValid(userData)) {
      if (filteredData.length > 0) {
        const user = { ...userData, id: idParam };
        updateUsers(user);
        parseResponse(200, user, res);
      } else {
        parseResponse(404, existUserError, res);
      }
    } else {
      parseResponse(404, dataError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};
