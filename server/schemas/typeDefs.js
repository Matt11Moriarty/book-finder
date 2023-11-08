const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getAllUsers: [User]!
        getSingleUser(userId: ID!): User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;