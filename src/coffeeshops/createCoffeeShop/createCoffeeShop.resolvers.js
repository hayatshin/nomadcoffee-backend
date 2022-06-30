import client from "../../client";
import { uploadPhoto } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photo, categories },
        { loggedInUser }
      ) => {
        let photoUrl = null;
        // if (photo) {
        //   const { filename, createReadStream } = await photo;
        //   const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        //   const readStream = createReadStream();
        //   const writeStream = createWriteStream(
        //     `${process.cwd()}/cafe/${newFilename}`
        //   );
        //   readStream.pipe(writeStream);
        //   uploadCafePhotoURL = `http://localhost:4000/cafe/${newFilename}`;
        // }
        // const existingCafe = await client.coffeeShop.findFirst({
        //   where: {
        //     AND: [{ name }, { latitude }, { longitude }],
        //   },
        // });
        if (photo) {
          photoUrl = await uploadPhoto(
            photo,
            loggedInUser.id,
            "coffeeShopPhoto"
          );
        }
        // if (existingCafe) {
        //   return {
        //     ok: false,
        //     error: "This CoffeeShop already exists.",
        //   };
        // }
        await client.coffeeShop.create({
          data: {
            name,
            latitude,
            longitude,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: photoUrl,
            categories: {
              connectOrCreate: {
                where: {
                  name: categories,
                },
                create: {
                  name: categories,
                },
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
