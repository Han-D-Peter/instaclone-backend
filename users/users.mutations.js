import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      // check if username or email are already on DB
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              userName,
            },
            {
              email,
            },
          ],
        },
      });
      const uglyPassword = await bcrypt.hash(password, 10);
      const user = await client.user.create({
        data: {
          userName,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
      return user;
      //hash password
      //save and return the user
    },
  },
};
