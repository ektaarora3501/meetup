function isRollNumberValid(rollNumber) {
  const regex = /^[u,m,d,i,s]{1,2}\d\d[a-zA-Z]{1,2}\d{3}/i;
  return regex.test(rollNumber);
}

function isEmailValid(email) {
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
}

module.exports = {
  isRollNumberValid,
  isEmailValid
};