const userTypeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        name: String!
        email: String!
        password: String!
        profilePicture: String
        gender: String!
        address: Address
        phone: String
    }

    type Address {
        street: String
        city: String
        zipcode: String
    }

    type Query {
        users: [User!]!
        authUser: User
        user(userId: ID!): User
    }

    type Mutation {
        signUp(input: SignUpInput!): User
        signIn(input: SignInInput!): User
        logout: LogoutResponse
    }

    input SignUpInput {
        name: String!
        username: String!
        email: String!
        password: String!
        gender: String!
        address: AddressInput
        phone: String
    }

    input SignInInput {
        username: String!
        password: String!
    }

    input AddressInput {
        street: String
        city: String
        zipcode: String
    }

    type LogoutResponse {
        message: String!
    }
`;
export { userTypeDefs };
