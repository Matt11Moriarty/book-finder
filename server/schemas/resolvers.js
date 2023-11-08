const { User } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth')

const resolvers = {
    Query: {
        getAllUsers: async () => {
            return User.find();
        },
        getSingleUser: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        }
    }
}

module.exports = resolvers;