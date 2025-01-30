import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface TokenPayload {
  id: string;
}
export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;    
   
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }

  // Extract the user ID from the decoded token
};
