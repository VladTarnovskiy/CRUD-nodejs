import { IncomingMessage, ServerResponse } from "node:http";
import {
  API_URL,
  existUserError,
  dataError,
  requestError,
  idError,
} from "../constant";
import { getCurrentData, updateUsers } from "../data";
import { getUrlIdParam, isReqDataValid, parseResponse } from "../utils";
import { IUser } from "../model";
import { validate } from "uuid";
import { deleteUser } from "../data/deleteUser";

export const deleteRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const idParam = getUrlIdParam(req.url!);
  const currentData = await getCurrentData();

  if (req.url?.startsWith(API_URL) && idParam) {
    const userToDelete = currentData.find((user: IUser) => user.id !== idParam);
    if (validate(idParam))
      if (userToDelete) {
        deleteUser(idParam);
        parseResponse(204, userToDelete, res);
      } else {
        parseResponse(404, existUserError, res);
      }
    else {
      parseResponse(400, idError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};
