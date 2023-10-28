function validatePassword(password: string) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return re.test(password);
}

function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function vulgarCheck(words: string) {
  //const re = "some check for bad words"
  //return re.test(words);
  return true;
}

export function validatePost(postText: string) {
  return postText.length > 0 && !vulgarCheck(postText);
}

export function validateLogin(username: string, password: string) {
  return validateEmail(username) && validatePassword(password);
}
