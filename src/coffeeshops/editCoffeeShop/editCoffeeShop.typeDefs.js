import { gql } from "apollo-server";

export default gql`
  type editCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      photo: Upload
    ): editCoffeeShopResult!
  }
`;
