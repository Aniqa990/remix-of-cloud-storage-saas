import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, CloudUpload, Maximize2, ReceiptText, Wifi, BarChart3, BookOpen, Boxes, BriefcaseBusiness, CreditCard, ChefHat, Clock3, Plug, Sparkles, Store, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkspaceGallery, ScreenshotZoom, type Screenshot } from "@/components/marketing/WorkspaceGallery";
import checkout from "@/assets/cevora-terminal.png";
import dashboard from "@/assets/cevora-dashboard.png";
import stock from "@/assets/cevora-stock.png";
import promotions from "@/assets/cevora_promotions.png";
import products from "@/assets/cevora-products.png";
import stores from "@/assets/cevora-stores.png";
import journal from "@/assets/cevora-jv_details.png";
import transactions from "@/assets/cevora-transaction_history.png";
import arabicCheckout from "@/assets/ar-terminal.png";
import arabicDashboard from "@/assets/ar-dashboard.png";
import arabicStock from "@/assets/ar-stock.png";
import arabicPromotions from "@/assets/ar-promotions.png";
import arabicProducts from "@/assets/ar-products.png";
import arabicStores from "@/assets/ar-stores.png";
import arabicJournal from "@/assets/ar-jv_details.png";
import arabicTransactions from "@/assets/ar-transaction_history.png";
const workspaceScreenshots = [
  { id: "checkout", src: checkout, arabicSrc: arabicCheckout },
  { id: "transactions", src: transactions, arabicSrc: arabicTransactions },
  { id: "products", src: products, arabicSrc: arabicProducts },
  { id: "promotions", src: promotions, arabicSrc: arabicPromotions },
  { id: "stock", src: stock, arabicSrc: arabicStock },
  { id: "stores", src: stores, arabicSrc: arabicStores },
  { id: "journal", src: journal, arabicSrc: arabicJournal },
];

const modules = [
  { id: "payments", Icon: CreditCard },
  { id: "shifts", Icon: Clock3 },
  { id: "catalog", Icon: Tags },
  { id: "inventory", Icon: Boxes },
  { id: "kitchen", Icon: ChefHat },
  { id: "customers", Icon: BriefcaseBusiness },
  { id: "accounting", Icon: BookOpen },
  { id: "reporting", Icon: BarChart3 },
  { id: "branches", Icon: Store },
  { id: "ai", Icon: Sparkles },
  { id: "integrations", Icon: Plug },
];

export default function Landing() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage === "ar";
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const screenshots = workspaceScreenshots.map(({ id, src, arabicSrc }) => ({
    id,
    src: isArabic ? arabicSrc : src,
    title: t(`marketing.screenshot_${id}_title`),
  }));

  const dashboardScreenshot: Screenshot = {
    id: "dashboard",
    src: isArabic ? arabicDashboard : dashboard,
    title: t("marketing.screenshot_dashboard_title"),
  };
  const zoomed = zoomedId === dashboardScreenshot.id
    ? dashboardScreenshot
    : screenshots.find(({ id }) => id === zoomedId) ?? null;

  return (
    <>
      <section className="ceevora-hero" data-enter>
        <div className="public-wrap hero-layout">
          <div className="hero-heading">
            <h1 className="public-display">
              <span>{t("marketing.heroLine1")}</span>
              <span>{t("marketing.heroLine2")}</span>
            </h1>
          </div>
          <div className="hero-summary">
            <p className="hero-market">{t("marketing.heroBadge")}</p>
            <p>{t("marketing.heroBody")}</p>
            <div className="public-actions">
              <Button className="public-button" asChild>
                <Link to="/contact">{t("marketing.contact")}<ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button className="public-button public-button-outline" variant="outline" asChild>
                <Link to="/#workspace">{t("marketing.tour")}</Link>
              </Button>
            </div>
          </div>
          <div className="hero-product">
            <button
              type="button"
              className="hero-screen"
              aria-label={t("marketing.zoom", { title: dashboardScreenshot.title })}
              onClick={() => setZoomedId(dashboardScreenshot.id)}
            >
              <img src={dashboardScreenshot.src} alt={dashboardScreenshot.title} width={isArabic ? 1893 : 1896} height={isArabic ? 831 : 830} />
              <span className="screen-zoom" aria-hidden="true"><Maximize2 /></span>
            </button>
          </div>
        </div>
      </section>

      <section className="public-section workspace-section" id="workspace" aria-labelledby="workspace-gallery-title">
        <div className="public-wrap">
          <div className="public-section-heading">
            <h2 id="workspace-gallery-title">{t("marketing.galleryTitle")}</h2>
            <p>{t("marketing.galleryIntro")}</p>
          </div>
          <WorkspaceGallery screenshots={screenshots} onZoom={({ id }) => setZoomedId(id)} />
        </div>
      </section>

      <section className="public-section modules-section" id="features" aria-labelledby="modules-heading">
        <div className="public-wrap">
          <div className="public-section-heading">
            <h2 id="modules-heading">{t("marketing.featuresTitle")}</h2>
            <p>{t("marketing.featuresIntro")}</p>
          </div>
          <div id="modules" className="module-index">
            {modules.map(({ id, Icon }) => (
              <article key={id} className="module-entry">
                <Icon aria-hidden="true" />
                <div>
                  <h3>{t(`marketing.module_${id}_title`)}</h3>
                  <p>{t(`marketing.module_${id}_description`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section offline-section" id="offline" data-moment="offline-sync" aria-labelledby="offline-heading">
        <div className="public-wrap offline-layout">
          <div className="offline-intro">
            <h2 id="offline-heading">{t("marketing.offlineTitle")}</h2>
            <p>{t("marketing.offlineBody")}</p>
            <p>{t("marketing.offlinePayments")}</p>
          </div>
          <ol className="offline-steps" role="list">
            {[
              { id: "offlineRecord", Icon: ReceiptText },
              { id: "offlineRestore", Icon: Wifi },
              { id: "offlineSync", Icon: CloudUpload },
            ].map(({ id, Icon }) => (
              <li key={id}>
                <span className="offline-icon"><Icon aria-hidden="true" /></span>
                <span>{t(`marketing.${id}`)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="public-section closing-section" aria-labelledby="closing-heading">
        <div className="public-wrap closing-layout">
          <div>
            <h2 id="closing-heading">{t("marketing.ctaTitle")}</h2>
            <p>{t("marketing.ctaBody")}</p>
          </div>
          <div className="closing-action">
            <p>{t("marketing.ready")}</p>
            <Button className="public-button" asChild>
              <Link to="/contact">{t("marketing.contact")}<ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
          <p className="closing-support">{t("marketing.support")}</p>
        </div>
      </section>
      <ScreenshotZoom screenshot={zoomed} onClose={() => setZoomedId(null)} />
    </>
  );
}
