import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = await client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: 10,
        skip: (page - 1) * 5,
      });
      return {
        ok: true,
        users,
        totalPages: Math.ceil(users.length / 5),
      };
    },
  },
};
