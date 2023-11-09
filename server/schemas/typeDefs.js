const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [String]!
    }

    type Book {
        bookId: String!
        authors: [String]!
        description: String!
        title: String!
        image: String!
        link: String!
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

        saveBook(authors: [authors!]!, description: String!, title: String!, image: String!, link: String!)
    }
`;

module.exports = typeDefs;