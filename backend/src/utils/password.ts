import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

class PasswordUtil {
  /**
   * Hash a plain text password.
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  /**
   * Compare a plain text password with a hashed password.
   */
  async compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new PasswordUtil();