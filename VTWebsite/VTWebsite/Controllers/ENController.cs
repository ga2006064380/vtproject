using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTWebsite.Models;

namespace VTWebsite.Controllers
{
    public class ENController : Controller
    {
        dbVTEntities db = new dbVTEntities();
        public ActionResult VTDiscovery()
        {
            ViewBag.Message = "Your contact page.";
            var EnallVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in EnallVideo)
            {
                model.Add(new VideoVtuber()
                {
                    video = item.video,
                    vtuber = item.vtuber
                });

            }
            return View(model);
        }
        public ActionResult DisMuti()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult VTWiki()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult VTWiki_Firm()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult VTWiki_People()
        {
            var people = db.Member_List.ToList();
            ViewBag.Message = "Your contact page.";

            return View(people);
        }
        public ActionResult VTWiki_Members(string id, string org)
        {
            var MemIntro_en = (from member_en in db.tMember_en
                            join intro_en in db.tIntro_en
                            on member_en.tMemberId equals intro_en.tMemberId
                            select new
                            {
                                member_en,
                                intro_en
                            }).ToList();

            List<MembersIntro_en> model = new List<MembersIntro_en>();
            foreach (var item in MemIntro_en)
            {
                model.Add(new MembersIntro_en()
                {
                    member_en = item.member_en,
                    intro_en = item.intro_en
                });
                ViewBag.yt_channel_name = id;
                ViewBag.org = org;

            }
            return View(model);
        }
        public ActionResult VTWiki_News()
        {
            var twitter = db.Tweet_List
                .OrderByDescending(m => m.tweet_created_at).ToList();

            ViewBag.Message = "Your contact page.";

            return View(twitter);
        }
        public ActionResult VT_About()
        {
            var todo = db.tToDo_en
                .OrderByDescending(m => m.fDate).ToList();
            return View(todo);
        }
        public ActionResult VT_Video(string id)
        {

            var EnallVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in EnallVideo)
            {
                model.Add(new VideoVtuber()
                {
                    video = item.video,
                    vtuber = item.vtuber
                });
                ViewBag.msgv = id;

            }
            return View(model);
        }

        public ActionResult VT_Set()
        {
            return View();
        }
    }
}