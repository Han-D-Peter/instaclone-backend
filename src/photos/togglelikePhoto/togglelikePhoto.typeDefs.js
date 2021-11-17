import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    togglelikePhoto(id: Int!): MutationResponse!
  }
`;
