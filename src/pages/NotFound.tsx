import { useTranslation } from "react-i18next";
import { usePublicDocumentLanguage } from "@/components/layout/usePublicDocumentLanguage";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();
  usePublicDocumentLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="ceevora-public min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <p className="text-sm font-medium text-muted-foreground mb-3">404</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
            {t("marketing.notFound")}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t("marketing.notFoundBody")}
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 me-2 rtl:rotate-180" />
              {t("marketing.backHome")}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
