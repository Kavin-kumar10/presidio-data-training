using TodoModernizingApplication.Exceptions;
using TodoModernizingApplication.Exceptions.AuthExceptions;
using TodoModernizingApplication.Interfaces;
using TodoModernizingApplication.Models;
using TodoModernizingApplication.Models.DTOs.RequestDTO.AuthReqDTOs;
using TodoModernizingApplication.Models.DTOs.ResponseDTO.LoginResponseDTOs;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;
using System.Text;
using TodoModernizingApplication.Modals;

namespace TodoModernizingApplication.Services
{
    public class UserServices : BaseServices<User>,IUserServices
    {
        private readonly IRepository<int, Member> _memrepo;
        private readonly IRepository<int,User> _userRepo;
        private readonly ITokenServices _tokenServices;

        #region Constructor
        public UserServices(IRepository<int, Member> memrepo, IRepository<int, User> repo, ITokenServices tokenservices) : base(repo)
        {
            _memrepo = memrepo;
            _userRepo = repo;
            _tokenServices = tokenservices;
        }
        #endregion

        #region Login with loginDTO
        /// <summary>
        /// Login using loginDTO -> INPUT , HashProtected compared with the Key in database 
        /// </summary>
        /// <param name="loginDTO"></param>
        /// <returns></returns>
        /// <exception cref="UnauthorizedUserException"></exception>
        /// <exception cref="UserNotActiveException"></exception>
        public async Task<LoginReturnDTO> Login(UserLoginDTO loginDTO)
        {
            var userDB = await _userRepo.Get(loginDTO.UserId);
            if (userDB == null)
            {
                throw new UnauthorizedUserException("Invalid username or password");
            }
            HMACSHA512 hMACSHA = new HMACSHA512(userDB.HashedPassword);
            var encrypterPass = hMACSHA.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
            bool isPasswordSame = ComparePassword(encrypterPass, userDB.Password);
            if (isPasswordSame)
            {
                var member = await _memrepo.Get(loginDTO.UserId);
                LoginReturnDTO loginReturnDTO = MapMemberToLoginReturn(member);
                return loginReturnDTO;
            }
            throw new UnauthorizedUserException("Invalid username or password");
        }
        #endregion

        #region Map (Member -> LoginReturnDTO)
        [ExcludeFromCodeCoverage]
        private LoginReturnDTO MapMemberToLoginReturn(Member member)
        {
            LoginReturnDTO returnDTO = new LoginReturnDTO();
            returnDTO.MemberID = member.MemberId;
            returnDTO.Token = _tokenServices.GenerateToken(member);
            return returnDTO;
        }
        #endregion

        #region Compare Password
        private bool ComparePassword(byte[] encrypterPass, byte[] password)
        {
            for (int i = 0; i < encrypterPass.Length; i++)
            {
                if (encrypterPass[i] != password[i])
                {
                    return false;
                }
            }
            return true;
        }
        #endregion

        #region Register with registerRequestDTO
        /// <summary>
        /// Register using RegisterRequestDTO -> INPUT, Add new User model and Member model to the database with password hashed
        /// </summary>
        /// <param name="registerRequestDTO"></param>
        /// <returns></returns>
        /// <exception cref="MemberWithMailIdAlreadyFound"></exception>
        /// <exception cref="UnableToRegisterException"></exception>
        public async Task<Member> Register(RegisterRequestDTO registerRequestDTO)
        {
            Member member = new Member();
            User user = new User();
            var allMember = await _memrepo.Get();
            var check = allMember.FirstOrDefault(m => m.Email == registerRequestDTO.email);
            if (check != null)
            {
                throw new MemberWithMailIdAlreadyFound();
            }
            try
            {
                member = new Member();
                member.Email = registerRequestDTO.email;
                member.Name = registerRequestDTO.Name;
                member = await _memrepo.Add(member);
                user = await MapRegisterRequestDTOtoUser(registerRequestDTO);
                user.MemberId = member.MemberId;
                user.Email = member.Email;
                user.Name = member.Name;
                user = await _userRepo.Add(user);
                return member;
            }
            catch (Exception ex) {
            }
            //if (user == null)
            //    await RevertMemberInsert(member);
            //if (member == null)
            //    await RevertUserInsert(user);
            throw new UnableToRegisterException("Unable to Register");
        }
        #endregion

        #region Revert Inserts
        [ExcludeFromCodeCoverage]
        private async Task RevertUserInsert(User user)
        {
            await _userRepo.Delete(user.MemberId);
        }

        [ExcludeFromCodeCoverage]
        private async Task RevertMemberInsert(Member member)
        {

            await _memrepo.Delete(member.MemberId);
        }
        #endregion

        #region Map (RegisterRequestDTO -> User)
        public async Task<User> MapRegisterRequestDTOtoUser(RegisterRequestDTO registerRequestDTO)
        {
            User user = new User();
            HMACSHA512 hMACSHA = new HMACSHA512();
            user.HashedPassword = hMACSHA.Key;
            user.Password = hMACSHA.ComputeHash(Encoding.UTF8.GetBytes(registerRequestDTO.password));
            return user;
        }
        #endregion

    }
}
