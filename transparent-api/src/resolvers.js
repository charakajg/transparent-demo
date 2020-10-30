const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { AuthenticationError, ForbiddenError, ValidationError } = require('apollo-server-express');

const {
    JWT_SECRET, BCRYPT_HASH_ROUNDS,
    EXPIRE_TIME_AFTER_REGISTRATION, EXPIRE_TIME_AFTER_LOGIN } = require("./config");
const { ERRORS, MESSAGES } = require("./strings");

const { User, Pet } = require("./models");

const resolvers = {
    Query: {
        async test(_) {
            return MESSAGES.TEST_MESSAGE;
        },

        async testError(_) {
            throw new Error(ERRORS.TEST_ERROR)
        },
        
        async current(_, args, { user }) {
            if (user) {
                return await User.findOne({ _id: user._id });
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async pet(_, { id }, { user }) {
            if (user) {
                const pet = await Pet.findOne({ _id: id });
                if (!pet) {
                    throw new ValidationError(ERRORS.NO_PET);
                }

                if ((pet.current_owner == user._id) ||
                    (pet.current_adopter == user._id) ||
                    (pet.current_adopter == null)) {

                    return pet;
                }
                throw new ForbiddenError(ERRORS.NOT_ALLOWED_TO_ACCESS_PET);
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async myOwnPets(_, args, { user }) {
            if (user) {
                return await Pet.find({ current_owner: user._id }).populate('current_owner').populate('current_adopter');
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async myAdoptedPets(_, args, { user }) {
            if (user) {
                return await Pet.find({ current_adopter: user._id }).populate('current_owner').populate('current_adopter');
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async availableToAdoptPets(_, args, { user }) {
            if (user) {
                return await Pet.find({ $and: [{ current_adopter: null }, { current_owner: { $ne: user._id } }] }).populate('current_owner').populate('current_adopter');
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        }
    },

    Mutation: {
        async register(_, { login, password }) {
            const existingUser = await User.findOne({ login: login });
            if (existingUser) {
                throw new ForbiddenError(ERRORS.LOGIN_ALREADY_TAKEN);
            }

            const user = await User.create({
                login,
                password: await bcrypt.hash(password, BCRYPT_HASH_ROUNDS),
            });

            return jsonwebtoken.sign({ _id: user._id, login: user.login }, JWT_SECRET, {
                expiresIn: EXPIRE_TIME_AFTER_REGISTRATION,
            });
        },

        async login(_, { login, password }) {
            const user = await User.findOne({ login: login });
            if (!user) {
                throw new AuthenticationError(ERRORS.NO_USER);
            }
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new AuthenticationError(ERRORS.WRONG_PASSWORD);
            }

            return jsonwebtoken.sign({ _id: user._id, login: user.login }, JWT_SECRET, {
                expiresIn: EXPIRE_TIME_AFTER_LOGIN,
            });
        },

        async addPet(_, { name, location, fee }, { user }) {
            if (user) {
                const pet = await Pet.create({
                    name,
                    location,
                    fee,
                    current_owner: user._id,
                    current_adopter: null
                });

                return pet._id;
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async deletePet(_, { pet_id }, { user }) {
            if (user) {
                const pet = await Pet.findOne({ _id: pet_id });
                if (!pet) {
                    throw new ValidationError(ERRORS.NO_PET);
                } else if (pet.current_adopter != null) {
                    throw new ForbiddenError(ERRORS.PET_HAS_BEEN_ADOPTED);
                } else if (pet.current_owner != user._id) {
                    throw new ForbiddenError(ERRORS.NOT_ALLOWED_TO_ACCESS_PET);
                }

                const result = await Pet.deleteOne({ _id: pet_id });

                return pet._id;
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async adoptPet(_, { pet_id }, { user }) {
            if (user) {
                const pet = await Pet.findOne({ _id: pet_id });
                if (!pet) {
                    throw new ValidationError(ERRORS.NO_PET);
                } else if (pet.current_adopter != null) {
                    throw new ForbiddenError(ERRORS.PET_HAS_BEEN_ADOPTED);
                } else if (pet.current_owner == user._id) {
                    throw new ForbiddenError(ERRORS.ALREADY_OWNED_PET);
                }

                const result = await Pet.updateOne({ _id: pet_id }, { current_adopter: user._id });

                return pet._id;
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        },

        async returnPet(_, { pet_id }, { user }) {
            if (user) {
                const pet = await Pet.findOne({ _id: pet_id });
                if (!pet) {
                    throw new ValidationError(ERRORS.NO_PET);;
                } else if (pet.current_adopter != user._id) {
                    throw new ForbiddenError(ERRORS.PET_HAS_NOT_BEEN_ADOPTED_BY_CURRET_USER);
                }

                const result = await Pet.updateOne({ _id: pet_id }, { current_adopter: null });

                return pet._id;
            }
            throw new AuthenticationError(ERRORS.NOT_AUTHENTICATED);
        }
    },
};

module.exports = resolvers;