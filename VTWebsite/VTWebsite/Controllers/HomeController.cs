 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTWebsite.Models;

namespace VTWebsite.Controllers
{
    public class HomeController : Controller
    {
        dbVTEntities db = new dbVTEntities();
        public ActionResult VTDiscovery()
        {
            ViewBag.Message = "Your contact page.";
            var allVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in allVideo)
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
            var MemIntro = (from member in db.tMember
                            join intro in db.tIntro
                            on member.tMemberId equals intro.tMemberId
                            select new
                            {
                                member,
                                intro
                            }).ToList();

            List<MembersIntro> model = new List<MembersIntro>();
            foreach (var item in MemIntro)
            {
                model.Add(new MembersIntro()
                {
                    member = item.member,
                    intro = item.intro
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
        public ActionResult index()
        {
            var todo = db.tToDo
                .OrderByDescending(m => m.fDate).ToList();
            return View(todo);
        }
        public ActionResult VT_About()
        {
            var todo = db.tToDo
                .OrderByDescending(m => m.fDate).ToList();
            return View(todo);
        }
        public ActionResult VT_Video(string id)
        {

            var allVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in allVideo)
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