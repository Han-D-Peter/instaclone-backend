import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    photos: [Photo]
    following: [User]
    followers: [User]
    photos: [Photo]
    totalFollowing: Int!
    totalFollowers: Int!
    isFollowing: Boolean!
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
