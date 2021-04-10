using System.Web;
using System.Web.Optimization;

namespace GuessTheNum
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap.bundle.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            //Toastr
            bundles.Add(new ScriptBundle("~/bundles/ToastrJS").Include(
                      "~/Scripts/Toastr.js"));

            bundles.Add(new StyleBundle("~/Content/ToastrCSS").Include(
                      "~/Content/Toastr.css"));

            //Main JS
            bundles.Add(new ScriptBundle("~/bundles/GuessTheNum").Include(
                      "~/Scripts/App/gessTheNum.js"));
            
            bundles.Add(new ScriptBundle("~/Content/GuessTheNum").Include(
                      "~/Content/App/gessTheNum.css"));

            //Language Control
            bundles.Add(new ScriptBundle("~/bundles/LanguageControl").Include(
                      "~/Scripts/Lang/LanguageControl.js",
                      "~/Scripts/Lang/Lang.es.js"));
        }
    }
}
