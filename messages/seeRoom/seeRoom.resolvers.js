import client from "../../src/client";
import { protectedResolver } from "../../src/users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver((_, { id }, { loggedInUser }) => {
      client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
    }),
  },
};
