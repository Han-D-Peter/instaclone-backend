import client from "../src/client";

export default {
  Room: {
    users: ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }) => client.message.findMany({ where: { roomId: id } }),
    unseenTotal: ({ id }, _, { loggedInUser }) =>{
      if(!loggedInUser){
        return 0
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      }),
    }
  },
};
