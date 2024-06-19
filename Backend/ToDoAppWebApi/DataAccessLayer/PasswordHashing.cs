using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace DataAccessLayer
{
    public class PasswordHashing
    {
        public PasswordHashing() { }
        public static string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Compute hash from the password bytes
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
                Console.WriteLine(bytes);
                // Convert byte array to a string representation
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2")); // Convert byte to hexadecimal string
                }
                return builder.ToString();
            }
        }
        public static bool VerifyPassword(string hashedPassword, string enteredPassword)
        {
            string hashedEnteredPassword = HashPassword(enteredPassword);
            return hashedPassword.Equals(hashedEnteredPassword, StringComparison.OrdinalIgnoreCase);
        }
    }
}
