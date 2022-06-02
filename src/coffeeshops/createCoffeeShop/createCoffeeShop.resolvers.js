import { createWriteStream } from "fs";
import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (
        _,
        { name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        let uploadCafePhotoURL = null;
        if (photos) {
          const { filename, createReadStream } = await photos;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/cafe/${newFilename}`
          );
          readStream.pipe(writeStream);
          uploadCafePhotoURL = `http://localhost:4000/cafe/${newFilename}`;
        }
        const existingCafe = await client.coffeeShop.findFirst({
          where: {
            AND: [{ name }, { latitude }, { longitude }],
          },
        });
        if (existingCafe) {
          return {
            ok: false,
            error: "This CoffeeShop already exists.",
          };
        }
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
            photos: {
              create: {
                url: uploadCafePhotoURL,
              },
            },
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
