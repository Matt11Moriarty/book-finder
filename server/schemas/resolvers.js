const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getSingleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        }
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, profile }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password)
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, { bookId, token }) => {
            // const userId = DECRYPT TOKEN AND GET THE USER ID SOMEHOW
            return User.findOneAndUpdate(
                { _id: userId },
                { 
                    $addToSet: { savedBooks: bookId }
                },
                { new: true }
            )
        },
        deleteBook: async (parent, { bookId, token }) => {
            // const userId = DECRYPT TOKEN AND GET THE USER ID SOMEHOW
            return User.findOneAndUpdate(
                { _id: userId },
                {
                    $pull: { savedBooks: bookId }
                },
                { new: true }
            )
        }
    }
}

module.exports = resolvers;