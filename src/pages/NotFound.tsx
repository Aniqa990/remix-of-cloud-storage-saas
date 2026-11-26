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
      <main id="public-main" tabIndex={-1} className="public-not-found flex-1" data-enter>
        <div className="public-wrap">
          <p className="text-sm font-medium text-muted-foreground mb-3">404</p>
          <h1 className="public-display">
            {t("marketing.notFound")}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t("marketing.notFoundBody")}
          </p>
          <Button className="public-button" asChild>
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
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
