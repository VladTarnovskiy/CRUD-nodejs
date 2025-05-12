import { IncomingMessage, ServerResponse } from "http";
import { parse } from "url";
import {
  API_URL,
  dataError,
  existUserError,
  idError,
  requestError,
} from "../constant";
import { createUsers, getCurrentData } from "../data";
import {
  parseData,
  isReqDataValid,
  generateUserID,
  parseResponse,
  getUrlIdParam,
} from "../utils";
import { IUser } from "../model";
import { validate } from "uuid";

export const getData = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const idParam = getUrlIdParam(req.url!);
  const currentData = await getCurrentData();

  if (req.url === API_URL) {
    parseResponse(200, currentData, res);
  } else if (req.url?.startsWith(API_URL) && idParam) {
    const filteredData = currentData.filter(
      (user: IUser) => user.id === idParam
    );
    if (!validate(idParam)) {
      parseResponse(400, idError, res);
    } else if (filteredData.length > 0) {
      parseResponse(200, filteredData, res);
    } else {
      parseResponse(404, existUserError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};
