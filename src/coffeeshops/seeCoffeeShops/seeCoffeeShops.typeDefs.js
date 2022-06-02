import { gql } from "apollo-server";

export default gql`
  type Query {
    seeCoffeeShops(keyword: String!, page: Int!): [CoffeeShop]
  }
`;
