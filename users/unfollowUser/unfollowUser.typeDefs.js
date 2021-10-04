import { gql } from "apollo-server-express";

export default gql`
  type unfollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(userName: String!): unfollowUserResult
  }
`;
