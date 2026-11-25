import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Boxes, BriefcaseBusiness, CreditCard, ChefHat, Clock3, Plug, Sparkles, Store, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { WorkspaceGallery, ScreenshotZoom, type Screenshot } from "@/components/marketing/WorkspaceGallery";
import checkout from "@/assets/cevora-terminal.png";
import dashboard from "@/assets/cevora-dashboard.png";
import stock from "@/assets/cevora-stock.png";
import aiReport from "@/assets/cevora_AI-report.png";
import promotions from "@/assets/cevora_promotions.png";
import products from "@/assets/cevora-products.png";
import stores from "@/assets/cevora-stores.png";
import standardReports from "@/assets/cevora-static_report.png";
import journal from "@/assets/cevora-jv_details.png";
import transactions from "@/assets/cevora-transaction_history.png";
import arabicCheckout from "@/assets/ar-terminal.png";
import arabicDashboard from "@/assets/ar-dashboard.png";
import arabicStock from "@/assets/ar-stock.png";
import arabicAiReport from "@/assets/ar-AI_report.png";
import arabicPromotions from "@/assets/ar-promotions.png";
import arabicProducts from "@/assets/ar-products.png";
import arabicStores from "@/assets/ar-stores.png";
import arabicStandardReports from "@/assets/ar-static_report.png";
import arabicJournal from "@/assets/ar-jv_details.png";
import arabicTransactions from "@/assets/ar-transaction_history.png";
const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5
      }
    }
  }
};
const workspaceScreenshots = [
  { id: "checkout", src: checkout, arabicSrc: arabicCheckout },
  { id: "transactions", src: transactions, arabicSrc: arabicTransactions },
  { id: "products", src: products, arabicSrc: arabicProducts },
  { id: "promotions", src: promotions, arabicSrc: arabicPromotions },
  { id: "stock", src: stock, arabicSrc: arabicStock },
  { id: "standardReports", src: standardReports, arabicSrc: arabicStandardReports },
  { id: "stores", src: stores, arabicSrc: arabicStores },
  { id: "journal", src: journal, arabicSrc: arabicJournal },
  { id: "aiReport", src: aiReport, arabicSrc: arabicAiReport },
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

  return <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="ceevora-hero relative overflow-hidden -mt-16 pt-16">
        <div className="relative pt-24 md:pt-[96px] overflow-x-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                <p className="mx-auto w-fit rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-primary">
                  {t("marketing.heroBadge")}
                </p>
                <h1 className="mt-8 text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  <span className="block">{t("marketing.heroLine1")}</span>
                  <span className="block mt-2 text-primary">{t("marketing.heroLine2")}</span>
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                  {t("marketing.heroBody")}
                </p>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="h-11 px-6 text-base" asChild>
                    <Link to="/contact">
                      <span className="text-nowrap">{t("marketing.contact")}</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-11 px-6 text-base" asChild>
                    <Link to="/#workspace">
                      <span className="text-nowrap">{t("marketing.tour")}</span>
                    </Link>
                  </Button>
                </div>
              </AnimatedGroup>

              {/* Hero Image/Screenshot */}
              <AnimatedGroup variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75
                  }
                }
              },
              ...transitionVariants
            }}>
                <div className="relative mx-auto mt-16 sm:mt-20 w-full max-w-5xl md:max-w-[92vw] lg:max-w-6xl xl:max-w-7xl">
                  <button type="button" className="block w-full cursor-zoom-in rounded-2xl" aria-label={t("marketing.zoom", { title: dashboardScreenshot.title })} onClick={() => setZoomedId(dashboardScreenshot.id)}>
                    <img
                      src={dashboardScreenshot.src}
                      alt={dashboardScreenshot.title}
                      loading="lazy"
                      className="h-auto w-full rounded-2xl border border-border/60 shadow-2xl shadow-primary/15"
                    />
                  </button>
                </div>
              </AnimatedGroup>
            </div>
          </div>

          {/* Workspace screenshots */}
          <motion.div id="workspace" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="mx-auto mt-10 scroll-mt-24 bg-muted pt-10 pb-8">
            <h2 id="workspace-gallery-title" className="mb-3 px-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
              {t("marketing.galleryTitle")}
            </h2>
            <p className="mb-4 px-6 text-center text-muted-foreground">
              {t("marketing.galleryIntro")}
            </p>
            <WorkspaceGallery screenshots={screenshots} onZoom={({ id }) => setZoomedId(id)} />
          </motion.div>
        </div>
      </section>
      {/* POS modules */}
      <section id="features" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t("marketing.featuresTitle")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("marketing.featuresIntro")}
              </p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <div id="modules" className="grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map(({ id, Icon }) => (
                  <article key={id} className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground">{t(`marketing.module_${id}_title`)}</h3>
                    <p className="mt-2 text-muted-foreground">{t(`marketing.module_${id}_description`)}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="offline"
        aria-labelledby="offline-heading"
        className="mb-10 scroll-mt-24 bg-[#0e3a36] px-6 py-16 text-white sm:mb-14 sm:px-8 sm:py-24"
      >
        <div className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="md:order-2">
            <h2 id="offline-heading" className="max-w-[13ch] text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl rtl:max-w-none">
              {t("marketing.offlineTitle")}
            </h2>
            <p className="mt-5 leading-relaxed text-[#e1f0ec]">
              {t("marketing.offlineBody")}
            </p>
            <p className="mt-3 leading-relaxed text-[#e1f0ec]">
              {t("marketing.offlinePayments")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1b514a] px-6 py-8 sm:p-10 md:order-1">
            <ol className="list-decimal space-y-4 ps-6 font-semibold leading-relaxed text-white marker:text-[#e1f0ec]">
              <li>{t("marketing.offlineRecord")}</li>
              <li>{t("marketing.offlineRestore")}</li>
              <li>{t("marketing.offlineSync")}</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
              {t("marketing.ready")}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
              {t("marketing.ctaTitle")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              {t("marketing.ctaBody")}
            </p>

            <Button size="lg" className="h-11 px-10 text-base font-semibold shadow-lg shadow-primary/20" asChild>
              <Link to="/contact">
                {t("marketing.contact")}
              </Link>
            </Button>
            
            <p className="mt-8 text-sm text-muted-foreground">
              {t("marketing.support")}
            </p>
          </motion.div>
        </div>
      </section>
      <ScreenshotZoom screenshot={zoomed} onClose={() => setZoomedId(null)} />
    </div>;
}
