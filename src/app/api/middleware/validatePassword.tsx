const bcrypt = require("bcrypt");

export async function validatePassword(
  requestPassword: string,
  storedPassword: string
) {
  const isPasswordCorrect: boolean = await bcrypt.compare(
    requestPassword,
    storedPassword
  );

  return isPasswordCorrect;
}
