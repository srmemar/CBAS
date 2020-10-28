using Microsoft.AspNetCore.Identity;

namespace AngularSPAWebAPI.Models
{
    public class Cogbytes
    {
        public int? ID { get; set; }
        public string Title { get; set; }
        public string Date { get; set; }
        public string Keywords { get; set; }
        public string DOI { get; set; }
        public int?[] AuthourID { get; set; }
        public string AuthorString { get; set; }
        public int?[] piID { get; set; }
        public string piString { get; set; }
        public string Link { get; set; }
        public bool PrivacyStatus { get; set; }
        public string Description { get; set; }
        public string AdditionalNotes { get; set; }
        public string DateRepositoryCreated { get; set; }
    }
}