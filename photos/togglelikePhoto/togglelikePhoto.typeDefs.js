import { gql } from "apollo-server-express";

export default gql`
  type ToggleLikePhotoResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    togglelikePhoto(id: Int!): ToggleLikePhotoResult!
  }
`;
