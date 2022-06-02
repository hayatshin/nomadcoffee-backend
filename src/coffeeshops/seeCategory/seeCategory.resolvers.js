import client from "../../client";

export default {
  Query: {
    seeCategory: (_, { name, page }) =>
      client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      }),
  },
};
