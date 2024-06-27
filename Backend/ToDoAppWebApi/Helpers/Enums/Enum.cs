using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Enums
{
    public  enum Status
    {
        active,
        completed
    }
    public enum Messages
    {
        [Description("Successfully completed")] Success = 1,
        [Description("Something Went wrong")] Exception = 2,
        [Description("Operation Failed")] Failure = 3,
    }
    public static class Description
    {
        public static string GetEnumDescription(this Enum enumValue)
        {
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            var descriptionAttributes = (DescriptionAttribute[])fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);

            return descriptionAttributes.Length > 0 ? descriptionAttributes[0].Description : enumValue.ToString();
        }
    }

}
