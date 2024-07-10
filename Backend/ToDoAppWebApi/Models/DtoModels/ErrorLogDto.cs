﻿namespace Models.DtoModels
{
    public class ErrorLogDto
    {
        public string Errormessage { get; set; }

        public string Filename { get; set; }

        public string Methodname { get; set; }

        public string Timestamp { get; set; }

        public int Linenumber { get; set; }

        public string Stacktrace { get; set; }
    }
}
