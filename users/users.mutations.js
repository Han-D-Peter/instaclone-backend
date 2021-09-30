import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
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
      } catch (e) {
        return console.log(e);
      }
    },
    login: async (_, { userName, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({
        where: { userName },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    },
  },
};
