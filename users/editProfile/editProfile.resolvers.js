import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { firstName, lastName, userName, email, password: newPassword },
        { loggedInUser, protectResolver }
      ) => {
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
            ...(uglyPassword && { password: uglyPassword }),
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
