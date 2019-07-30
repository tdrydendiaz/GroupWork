const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(item) {
    let errors = {};

    // if these values are not present in the user object we are validating then they will be set to empty strings for the Validator.isEmpty
    item.username = !isEmpty(item.username) ? item.username : "";
    item.content = !isEmpty(item.content) ? item.content : "";

    //username validation rules
    if (Validator.isEmpty(item.username)) {
        errors.username = "Username field is required";
    }

    if (!Validator.isLength(item.username, { min: 3, max: 20 }))  {
        errors.username = "Username is invalid";
    }

    if (!Validator.isAlphanumeric(item.username)){
        errors.username = "Username must contain letters and numbers";
    }

     //email validation rules
     if (Validator.isEmpty(item.email)) {
        errors.email = "email field is required";
    }

    if (!Validator.isLength(item.email, { min: 3, max: 320 }))  {
        errors.email = "email is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
