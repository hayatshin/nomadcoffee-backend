import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          name: {
            startsWith: keyword,
          },
        },
      }),
  },
};
