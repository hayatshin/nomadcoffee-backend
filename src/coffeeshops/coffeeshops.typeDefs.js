import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: CoffeeShop!
  }

  type CoffeeShop {
    id: Int!
    name: String!
    latitude: String!
    longitude: String!
    user: User
    photo: String
    categories: [Category]
  }

  type Category {
    id: Int!
    name: String!
    slug: String
    shop: [CoffeeShop]
    totalShops: Int!
  }
`;
