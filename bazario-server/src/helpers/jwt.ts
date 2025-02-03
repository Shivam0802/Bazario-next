import jwt from "jsonwebtoken";
import Dotenv from "dotenv";

interface JwtPayload {
  userId: string;
  role: string;
  [key: string]: any; // Allows for additional dynamic properties
}


Dotenv.config()

export const generateAccessJwt = async (obj: JwtPayload): Promise<string> => {
  return jwt.sign(
    {
      ...obj,
      exp: Math.floor(Date.now() / 1000) + 604800, //valid for 7 days
    },
    process.env.JWT_ACCESS_TOKEN_SECRET as string
  );
};

export const generateRefreshJwt = async (obj: JwtPayload): Promise<string> => {
  return jwt.sign(
    {
      ...obj,
      exp: Math.floor(Date.now() / 1000) + 604800, //7 days
    },
    process.env.JWT_REFRESH_ACCESS_TOKEN_SECRET as string
  );
};
