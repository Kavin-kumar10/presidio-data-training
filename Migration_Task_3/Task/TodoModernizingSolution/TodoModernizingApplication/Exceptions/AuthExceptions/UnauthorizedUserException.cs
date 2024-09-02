﻿using System.Runtime.Serialization;

namespace TodoModernizingApplication.Exceptions.AuthExceptions
{
    [Serializable]
    public class UnauthorizedUserException : Exception
    {
        string message;
        public UnauthorizedUserException()
        {
            message = "You are Not authorized";
        }

        public UnauthorizedUserException(string? message) : base(message)
        {
            this.message = message;
        }

        public override string Message => message;
    }
}