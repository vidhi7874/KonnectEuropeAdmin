export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Password must contain at least 8 characters, including at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const validatePhoneNumber = (phoneNumber) => {
  // Phone number must be a valid US phone number
  const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(phoneNumber);
};

export const validateURL = (url) => {
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  return re.test(url);
};
