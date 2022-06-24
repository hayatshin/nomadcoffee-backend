import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: (_, { offset }) =>
      client.coffeeShop.findMany({
        take: 4,
        skip: offset,
      }),
  },
};
