using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTWebsite.Models;

namespace VTWebsite.Controllers
{
    public class JPController : Controller
    {
        dbVTEntities db = new dbVTEntities();
        public ActionResult VTDiscovery()
        {
            ViewBag.Message = "Your contact page.";
            var JpallVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in JpallVideo)
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
            var MemIntro_jp = (from member_jp in db.tMember_jp
                            join intro_jp in db.tIntro_jp
                            on member_jp.tMemberId equals intro_jp.tMemberId
                            select new
                            {
                                member_jp,
                                intro_jp
                            }).ToList();

            List<MembersIntro_jp> model = new List<MembersIntro_jp>();
            foreach (var item in MemIntro_jp)
            {
                model.Add(new MembersIntro_jp()
                {
                    member_jp = item.member_jp,
                    intro_jp = item.intro_jp
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
            var todo = db.tToDo_jp
                .OrderByDescending(m => m.fDate).ToList();
            return View(todo);
        }
        public ActionResult VT_Video(string id)
        {

            var JpallVideo = (from video in db.Video_List
                            join vtuber in db.VTuber_List
                            on video.yt_channel_id equals vtuber.yt_channel_id
                            orderby Guid.NewGuid()
                            select new
                            {
                                video,
                                vtuber
                            }).Take(22740).ToList();

            List<VideoVtuber> model = new List<VideoVtuber>();
            foreach (var item in JpallVideo)
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