import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, FolderOpen, Lock, Share2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Feature197 } from "@/components/ui/accordion-feature-section";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Testimonials } from "@/components/ui/testimonials-columns";
import checkout from "@/assets/cevora-terminal.png";
import dashboard from "@/assets/cevora-dashboard.png";
import stock from "@/assets/cevora-stock.png";
import aiReport from "@/assets/cevora-AI_report.png";
import promotions from "@/assets/cevora_promotions.png";
import products from "@/assets/cevora-products.png";
import stores from "@/assets/cevora-stores.png";
import standardReports from "@/assets/cevora-static_report.png";
import integrations from "@/assets/cevora-integrations.png";
import customerOrders from "@/assets/cevora-business_customers.png";
import journal from "@/assets/cevora-jv_details.png";
import transactions from "@/assets/cevora-transaction_history.png";
import heroCloudsBg from "@/assets/hero-clouds-bg.png";
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
const accordionFeatures = [{
  id: 1,
  title: "See how the day is going",
  image: dashboard,
  description: "Track net sales, order counts, average order value, and hourly activity from the operations dashboard."
}, {
  id: 2,
  title: "Know what’s in stock",
  image: stock,
  description: "See available stock, batches, and expiry dates. Set reorder rules and track ingredients as you sell."
}, {
  id: 3,
  title: "Ask your sales data a question",
  image: aiReport,
  description: "Use the optional AI Report Builder to ask a question, filter by date and location, and export the results to Excel."
}];
const workspaceScreenshots = [
  { src: dashboard, title: "Operations dashboard" },
  { src: transactions, title: "Transaction history" },
  { src: products, title: "Product catalog" },
  { src: promotions, title: "Promotion setup" },
  { src: stock, title: "Stock levels" },
  { src: standardReports, title: "Standard reports" },
  { src: stores, title: "Store management" },
  { src: journal, title: "General Ledger journal voucher details" },
];
const moduleHighlights = [{
  text: "Organize products by category, add photos and barcodes, and build store menus with standard items and combos.",
  image: products,
  name: "Products and menus",
  role: "Catalog"
}, {
  text: "Track batches and expiry dates, review stock counts, and deduct ingredients as recipe items sell.",
  image: stock,
  name: "Stock and recipes",
  role: "Inventory"
}, {
  text: "Schedule discounts and bundles, target branches or products, and control how offers combine.",
  image: promotions,
  name: "Offers and coupons",
  role: "Promotions"
}, {
  text: "Manage branches, stores, and tills, with access scoped to each manager’s assigned locations.",
  image: stores,
  name: "Store management",
  role: "Multi-location"
}, {
  text: "Export daily sales, category, promotions, and VAT reports to CSV or Excel.",
  image: standardReports,
  name: "Standard sales reports",
  role: "Reporting"
}, {
  text: "Ask about sales, filter by dates and locations, and download the report in Excel.",
  image: aiReport,
  name: "Questions in plain language",
  role: "AI Report Builder"
}, {
  text: "Review orders, map provider items to your catalog, and accept or reject incoming orders from enabled integrations.",
  image: integrations,
  name: "Provider order inbox",
  role: "Delivery"
}, {
  text: "Set customer prices and credit terms, reuse standing orders, and prepare production lists by kitchen.",
  image: customerOrders,
  name: "Business accounts",
  role: "Customer orders"
}, {
  text: "Map payments and products to accounts, then generate, review, and post journal vouchers.",
  image: journal,
  name: "Journal vouchers",
  role: "General ledger"
}];
const bentoFeatures = [{
  Icon: FolderOpen,
  name: "Offline Checkout",
  description: "Scan items, hold orders, split payments, and keep ringing up core counter sales during an internet outage. Sales sync when the connection returns.",
  
  
  className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2"
}, {
  Icon: Share2,
  name: "Shifts and Cash",
  description: "Record cash movements and reconcile the drawer at shift close.",
  
  
  className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2"
}, {
  Icon: Users,
  name: "Products and Menus",
  description: "Build store menus with product photos, barcodes, and combos.",
  
  
  className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3"
}, {
  Icon: Lock,
  name: "Staff Permissions",
  description: "Set role-based access and require manager approval for returns and voids.",
  
  
  className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2"
}, {
  Icon: Zap,
  name: "Sales Reports",
  description: "Review sales by store, shift, product, or category.",
  
  
  className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3"
}];
export default function Landing() {
  return <div className="overflow-hidden bg-background">
      {/* Hero Section */}
      {/* Pull hero background behind the fixed navbar (navbar lives in PublicLayout) */}
      <section className="relative overflow-hidden -mt-16 pt-16">
        {/* Realistic Cloud Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img 
            src={heroCloudsBg} 
            alt="" 
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-40"
          />
          {/* Top cloud accents */}
          <div className="absolute left-1/4 -top-20 w-[600px] h-[400px] bg-gradient-radial from-white/50 via-white/25 to-transparent rounded-full blur-3xl dark:from-white/25 dark:via-white/12" />
          <div className="absolute right-1/4 -top-16 w-[500px] h-[350px] bg-gradient-radial from-white/45 via-white/20 to-transparent rounded-full blur-3xl dark:from-white/22 dark:via-white/10" />
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-[700px] h-[300px] bg-gradient-radial from-white/40 via-white/20 to-transparent rounded-full blur-2xl dark:from-white/20 dark:via-white/10" />
          {/* Left side cloud accent */}
          <div className="absolute -left-32 -top-10 w-[450px] h-[400px] bg-gradient-radial from-white/55 via-white/28 to-transparent rounded-full blur-3xl dark:from-white/28 dark:via-white/14" />
          <div className="absolute -left-32 top-20 w-[500px] h-[500px] bg-gradient-radial from-white/60 via-white/30 to-transparent rounded-full blur-3xl dark:from-white/30 dark:via-white/15" />
          <div className="absolute -left-16 top-40 w-96 h-96 bg-gradient-radial from-white/50 via-white/25 to-transparent rounded-full blur-2xl dark:from-white/25 dark:via-white/10" />
          <div className="absolute left-10 top-64 w-72 h-72 bg-gradient-radial from-white/40 via-white/20 to-transparent rounded-full blur-xl dark:from-white/20 dark:via-white/8" />
          {/* Right side cloud accent */}
          <div className="absolute -right-32 -top-10 w-[450px] h-[400px] bg-gradient-radial from-white/55 via-white/28 to-transparent rounded-full blur-3xl dark:from-white/28 dark:via-white/14" />
          <div className="absolute -right-32 top-24 w-[500px] h-[500px] bg-gradient-radial from-white/60 via-white/30 to-transparent rounded-full blur-3xl dark:from-white/30 dark:via-white/15" />
          <div className="absolute -right-16 top-48 w-96 h-96 bg-gradient-radial from-white/50 via-white/25 to-transparent rounded-full blur-2xl dark:from-white/25 dark:via-white/10" />
          <div className="absolute right-10 top-72 w-72 h-72 bg-gradient-radial from-white/40 via-white/20 to-transparent rounded-full blur-xl dark:from-white/20 dark:via-white/8" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent via-50% to-muted" />
        </div>

        <div className="relative pt-24 md:pt-[96px] overflow-x-hidden">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                {/* Announcement badge */}
                <Link to="/webinar" className="group mx-auto flex w-fit items-center gap-2.5 rounded-full border border-border bg-muted dark:bg-muted/50 px-4 py-1.5 transition-all duration-300 hover:bg-accent dark:hover:bg-muted hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-primary font-medium text-sm">Product walkthrough</span>
                  <ChevronRight className="size-4 text-primary" />
                </Link>

                {/* Main Headline */}
                <h1 className="mt-8 text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  <span className="block">Point of sale for</span>
                  <span className="block mt-2">cafés, bakeries, and shops</span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                  Ring up sales, manage stock, and see how each store is doing. Cevora POS supports English and Arabic and keeps core checkout running when the internet drops.
                </p>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="h-11 px-6 text-base bg-black hover:bg-black/90" asChild>
                    <Link to="/signup">
                      <span className="text-nowrap">Create an account</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="h-11 px-6 text-base bg-muted hover:bg-muted/80 text-foreground" asChild>
                    <Link to="/pricing">
                      <span className="text-nowrap">Compare plans</span>
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
                {/* Exact uploaded screenshot */}
                <div className="relative mx-auto mt-16 sm:mt-20 w-full max-w-5xl md:max-w-[92vw] lg:max-w-6xl xl:max-w-7xl">
                  <img
                    src={checkout}
                    alt="Cevora checkout showing product categories, a cart, and an applied promotion"
                    loading="lazy"
                    className="h-auto w-full rounded-2xl border border-border/60 shadow-2xl shadow-foreground/5"
                  />
                </div>
              </AnimatedGroup>
            </div>
          </div>

          {/* Workspace screenshots */}
          <motion.div initial={{
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
        }} className="mx-auto mt-20 mb-8 max-w-5xl px-6">
            <h2 id="workspace-gallery-title" className="mb-8 text-center text-xl font-semibold text-foreground sm:text-2xl">
              A look at the Cevora POS workspace
            </h2>
            <Carousel aria-labelledby="workspace-gallery-title" opts={{ loop: true }}>
              <CarouselContent className="touch-pan-y">
                {workspaceScreenshots.map(({ src, title }) => (
                  <CarouselItem key={src}>
                    <figure>
                      <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted/40">
                        <img
                          src={src}
                          alt={`${title} screenshot`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      </div>
                      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                        {title}
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex justify-center gap-3">
                <CarouselPrevious size="default" className="static h-10 w-auto translate-y-0" aria-label="Previous screenshot">
                  Previous
                </CarouselPrevious>
                <CarouselNext size="default" className="static h-10 w-auto translate-y-0" aria-label="Next screenshot">
                  Next
                </CarouselNext>
              </div>
            </Carousel>
          </motion.div>
        </div>
      </section>
      {/* Bento Grid Section */}
      <section id="features" className="py-20 lg:py-28 bg-muted/40 dark:bg-muted/20">
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
                Run the counter and back office
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Take payments, close shifts, update menus, and track sales from one system.
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
              <BentoGrid className="">
                {bentoFeatures.map(feature => <BentoCard key={feature.name} {...feature} />)}
              </BentoGrid>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Accordion */}
      <Feature197 features={accordionFeatures} title="See Cevora POS in action" description="Explore the operations dashboard, inventory workspace, and optional AI reporting." />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <img
            src={journal}
            alt="General Ledger journal voucher details"
            loading="lazy"
            className="h-auto w-full rounded-2xl border border-border/60 shadow-xl shadow-foreground/5"
          />
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-primary">
              Optional General Ledger
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Turn POS activity into journal vouchers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Map payments and products to ledger accounts, then generate journal vouchers for review and posting.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link to="/pricing">Explore plans and optional modules</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials title="POS capabilities" subtitle="Tools for each part of the business" description="Explore the features and optional modules behind the checkout." testimonials={moduleHighlights} />

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-black">
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
            <p className="text-sm font-medium text-background/50 uppercase tracking-widest mb-4">
              Ready to get started?
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-6">
              Find the right POS setup
            </h2>
            <p className="text-lg sm:text-xl text-background/60 mb-12 max-w-xl mx-auto leading-relaxed">
              Start with checkout and reporting. Build on them with inventory, purchasing, multi-location tools, and optional AI.
            </p>

            <Button size="lg" className="h-11 px-10 text-base font-semibold bg-background text-foreground hover:bg-background/90 shadow-lg shadow-background/20" asChild>
              <Link to="/signup">
                Create an account
              </Link>
            </Button>
            
            <p className="mt-8 text-sm text-background/40">
              English and Arabic support · Windows and Android POS
            </p>
          </motion.div>
        </div>
      </section>
    </div>;
}
