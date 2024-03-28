import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const URL_CLIENT = process.env.URL_CLIENT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const URL_SEVER = process.env.URL_SEVER;
