const ERRORS = {
    TEST_ERROR: "Test error",
    NOT_AUTHENTICATED: "Sorry, you're not an authenticated user!",
    NO_USER:"This user doesn't exist. Please, make sure to type the right login.",
    WRONG_PASSWORD:"You password is incorrect!",
    LOGIN_ALREADY_TAKEN: "This login is already taken. Please, use a different login.",
    NO_PET: "The pet doesn't exist.",
    NOT_ALLOWED_TO_ACCESS_PET:"You don't have access to this pet.",
    PET_HAS_BEEN_ADOPTED:"The pet has already been adopted",
    ALREADY_OWNED_PET:"The pet already belongs to the current user",
    PET_HAS_NOT_BEEN_ADOPTED_BY_CURRET_USER: "The pet has not been adopted by the current user"
};

const MESSAGES = {
    SERVER_STARTED: "The server started on port",
    TEST_MESSAGE: "Test working"
};

const strings = {
    ERRORS,
    MESSAGES
};

module.exports = strings;