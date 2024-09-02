﻿using System.Runtime.Serialization;

namespace TodoModernizingApplication.Exceptions.AuthExceptions
{
    [Serializable]
    public class UserNotFoundException : Exception
    {
        string message;
        public UserNotFoundException()
        {
            message = "User not Found";
        }

        public UserNotFoundException(string? message) : base(message)
        {
            this.message = message;
        }

        public override string Message => message;

    }
}