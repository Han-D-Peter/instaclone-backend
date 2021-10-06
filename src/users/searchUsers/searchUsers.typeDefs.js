import { gql } from "apollo-server-express";

export default gql`
  type SearchUsersQuery {
    ok: Boolean!
    error: String
    users: [User]
    totalPages: Int
  }

  type Query {
    searchUsers(keyword: String!, page: Int!): SearchUsersQuery!
  }
`;
