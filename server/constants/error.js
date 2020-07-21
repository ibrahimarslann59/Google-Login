const ERROR = {
  NOT_USE_GOOGLE_LOGIN: {
    message:
      "Daha önceden normal kayıt yaptığınızdan dolayı google girişi yapamazsınız.Lütfen email ve şifrenizle giriş yapınız.",
    code: "not-use-google-login",
    status: 400,
  },
  NULL_USER_ID: {
    message: "kullanıcı idsi boş!",
    code: "null-user-id",
    status: 400,
  },
};

module.exports = {
  ERROR,
};
