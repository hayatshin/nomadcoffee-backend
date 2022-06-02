import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) =>
      client.user.findMany({
        take: 5,
        skip: (page - 1) * 5,
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
