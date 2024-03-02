import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const verifyLogin = async (req, res, next) => {
  const token = await req.headers.authorization?.split(" ")[1];
  const isCustomized = (await token?.length) < 500;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  } else {
    if (isCustomized) {
      const decodedData = jwt.verify(token, process.env.TOKEN_CODE);
      req.userId = decodedData.userId;
    } else {
      const decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }

    next();
  }
};

export default verifyLogin;
