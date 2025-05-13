import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { IUser } from "../model";
import { createRequire } from "node:module";
import { getCurrentData } from ".";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const updateUsers = async (data: IUser) => {
  try {
    const currentData = await getCurrentData();
    const updatedUsers = currentData.map((user) => {
      if (user.id === data.id) {
        return data;
      } else {
        return user;
      }
    });
    const path = join(__dirname, "data.json");
    await writeFile(path, JSON.stringify(updatedUsers));
  } catch (err) {
    throw new Error();
  }
};
