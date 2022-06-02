import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { keyword, page }) =>
      client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
        where: {
          name: {
            startsWith: keyword,
          },
        },
      }),
  },
};
