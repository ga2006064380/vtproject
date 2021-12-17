using System.Web;
using System.Web.Optimization;

namespace VTWebsite
{
    public class BundleConfig
    {
        // 如需統合的詳細資訊，請瀏覽 https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // 使用開發版本的 Modernizr 進行開發並學習。然後，當您
            // 準備好可進行生產時，請使用 https://modernizr.com 的建置工具，只挑選您需要的測試。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/CustomScripts/_Layout_DisIndex.js"                      
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/CustomCSS/_Layout_DisIndex.css",
                      "~/Content/CustomCSS/_Layout_DisMuti.css",
                      "~/Content/CustomCSS/_Layout_Wiki.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTWiki.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTWiki_Firm.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTWiki_News.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTWiki_People.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTWiki_Members.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTDis_About.css",
                      //"~/Content/CustomCSS/PageCss/_FrontPage_VTDis_Main.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTDis_Video.css",
                      "~/Content/CustomCSS/PageCss/_FrontPage_VTDis_Set.css",
                      "~/Content/CustomCSS/owl.carousel.min.css",
                      "~/Content/CustomCSS/owl.theme.default.min.css"));
        }
    }
}
