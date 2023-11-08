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
`;

module.exports = typeDefs;