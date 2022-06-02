import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    // when token doesn't exist
    if (!token) {
      return null;
    }
    // token -> find user
    const { id: tokenId } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id: tokenId } });
    if (user) {
      return user;
      // token -> dont' find user
    } else {
      return null;
    }
    // any error
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
