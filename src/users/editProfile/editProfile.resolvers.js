import { createWriteStream } from "fs";
import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadPhoto } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, location, password: newPassword, avatarURL },
        { loggedInUser }
      ) => {
        let uploadAvatarURL = null;
        if (avatarURL) {
          uploadAvatarURL = await uploadPhoto(
            avatarURL,
            loggedInUser.id,
            "avatar"
          );
          // const { filename, createReadStream } = await avatarURL;
          // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          // const readStream = createReadStream();
          // const writeStream = createWriteStream(
          //   process.cwd() + "/avatar/" + newFilename
          // );
          // console.log(process.cwd() + "/avatar/" + newFilename);
          // readStream.pipe(writeStream);
          // uploadAvatarURL = `http://localhost:4000/static/${newFilename}`;
        }
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarURL && { avatarURL: uploadAvatarURL }),
          },
        });
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "could not update Profile",
          };
        }
      }
    ),
  },
};
