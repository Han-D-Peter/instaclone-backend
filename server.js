import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT;

server
  .listen()
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
