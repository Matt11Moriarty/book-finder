const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getSingleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        }
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user }
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
        saveBook: async (parent, { bookDetails }, context) => {
            console.log(bookDetails)
            console.log(context.user._id)
            if (context.user) {
                const userToUpdate = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { 
                        $addToSet: { savedBooks: bookDetails }
                    },
                    { new: true }
                )
                return userToUpdate
            }
            throw AuthenticationError
        },
        deleteBook: async (parent, { bookId, userId }) => {
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