using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VTWebsite.Models
{
    public class VideoVtuber
    {
        public Video_List video { get; set; }
        public VTuber_List vtuber { get; set; }
    }
}