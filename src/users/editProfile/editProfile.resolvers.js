import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { deleteFromS3, uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser, protectResolver }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const removeTargetUser = await client.user.findFirst({
            where: {
              id: loggedInUser.id,
            },
          });
          await deleteFromS3(removeTargetUser.avatar);
          avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
          /* const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`; */
        }

        if (!loggedInUser) {
          return {
            ok: false,
            error: "You need to login.",
          };
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
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return { ok: false, error: "Could not update profile." };
        }
      }
    ),
  },
};
