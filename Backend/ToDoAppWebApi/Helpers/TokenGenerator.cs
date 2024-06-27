using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace Common
{
    public class TokenGenerator
    {
        private IConfiguration _config;
        public TokenGenerator(IConfiguration configuration)
        {
            _config = configuration;
        }
        public async Task<string> GenerateToken(int id)
        {
            var dateTime = DateTime.UtcNow;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("Jwt:Key")));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
                Issuer = _config.GetValue<string>("Jwt:Issuer"),
                Audience = _config.GetValue<string>("Jwt:Audience"),
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim("Id",id.ToString()),
                    new Claim("CreatedOn",dateTime.ToString()),
                })
            };
            var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
