import client from "../../client";
import { uploadPhoto } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (_, { id, name, latitude, longitude, photo }, { loggedInUser }) => {
        try {
          let coffeeShopPhotoUrl = null;
          if (photo) {
            coffeeShopPhotoUrl = await uploadPhoto(
              photo,
              loggedInUser.id,
              "coffeeShopPhoto"
            );
          }
          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name,
              latitude,
              longitude,
              ...(coffeeShopPhotoUrl && { photo: coffeeShopPhotoUrl }),
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: e,
          };
        }
      }
    ),
  },
};
