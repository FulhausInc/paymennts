const isEmail = require("sane-email-validation");

const validateEmail = (email) => {
  if (!email) {
    return false;
  }

  return isEmail(email);
};

const validateFullName = (fullName) => {
  if (!fullName) {
    return false;
  }

  const minNameLength = 2;
  const fullNameSplit = fullName.split(" ");

  if (!fullNameSplit[0] || !fullNameSplit[1]) {
    return false;
  }

  if (
    (fullNameSplit[0] && fullNameSplit[0].length < minNameLength) ||
    (fullNameSplit[1] && fullNameSplit[1].length < minNameLength)
  ) {
    return false;
  }

  return true;
};

const validatePassword = (password) => {
  return password && password.length > 5;
};

const validateTextRequired = (text) => {
  return text && ("" + text).length > 0;
};

export {
  validateEmail,
  validateFullName,
  validatePassword,
  validateTextRequired,
};
