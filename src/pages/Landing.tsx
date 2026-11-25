import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, Lock, Share2, Users, WifiOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Feature197 } from "@/components/ui/accordion-feature-section";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
}, {
  id: 4,
  title: "Turn POS activity into journal vouchers",
  image: journal,
  description: "Map payments and products to ledger accounts, then generate journal vouchers for review and posting."
}];
const workspaceScreenshots = [
  { src: dashboard, fullSize: "/workspace/management-console.png", title: "Management console", description: "Review net sales, order counts, average order value and hourly activity across shops." },
  { src: transactions, title: "Transaction history" },
  { src: products, title: "Product catalog" },
  { src: promotions, title: "Promotion setup" },
  { src: stock, fullSize: "/workspace/inventory.png", title: "Inventory workspace", description: "Review stock by shop and track ingredients, packaging and finished goods." },
  { src: standardReports, title: "Standard reports" },
  { src: stores, title: "Store management" },
  { src: journal, fullSize: "/workspace/general-ledger.png", title: "General Ledger", description: "Review daily journal vouchers by store and trace totals to source receipts." },
];

const modules = [
  { title: "Point of Sale & Payments", description: "Scan barcodes, hold orders, apply discounts, process returns and split payments. Accept cash and supported mada, Visa, Mastercard and digital wallet payments." },
  { title: "Business Day, Shift & Cash Management", description: "Open the business date, check in cashiers, record drawer cash in and out, and reconcile shortages and overages at shift close." },
  { title: "Product Catalog, Pricing & Promotions", description: "Manage product photos, categories, units of measure, barcodes and prices. Build shop-specific menus, combos and offers." },
  { title: "Purchase Orders & Inventory", description: "Manage purchasing and receipts. Track raw materials, packaging and finished goods. Review stock counts, variances and adjustments." },
  { title: "Central Kitchen & Store Transfers", description: "Receive finished goods from a central kitchen, transfer stock between shops and track waste, damage and leftovers." },
  { title: "Customers, Credit Orders & Loyalty", description: "Use customer-specific prices and credit terms for dealers, schools and cafés. Ask about loyalty options and settlement workflows for your rollout." },
  { title: "Accounting & General Ledger", description: "Map payment methods and business events to the chart of accounts. Generate store-level daily journal vouchers and drill down to receipts." },
  { title: "Management Console & Advanced Reports", description: "Compare sales by shop, hour, terminal, cashier, product and category. Review payments, discounts, returns and voids, and export supported reports." },
  { title: "Multi-Branch & Terminal Management", description: "Manage locations, register terminals and assign role-based access. Configure supervisor approvals for actions such as stock adjustments." },
  { title: "AI Report Builder", description: "Ask plain-language questions about sales with the optional reporting module. Filter by date and location and export supported results." },
  { title: "Delivery & External Integrations", description: "Discuss delivery-provider workflows, payment terminals, receipt printers, cash drawers, barcode scanners, scales and external ERP integration." },
];

const bentoFeatures = [{
  Icon: FolderOpen,
  name: "Point of Sale",
  description: "Scan barcodes, hold orders, apply discounts, process returns and split payments.",
  
  
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const intervalId = window.setInterval(() => carouselApi.scrollNext(), 5000);
    return () => window.clearInterval(intervalId);
  }, [carouselApi]);

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
                <p className="mx-auto w-fit rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-primary dark:bg-muted/50">
                  Point of sale for Saudi Arabia
                </p>
                <h1 className="mt-8 text-balance text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  <span className="block">Run the counter.</span>
                  <span className="block mt-2">See the whole business.</span>
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                  Connect checkout, inventory, reporting and accounting across your shops. Built for caf&eacute;s, donut shops, bakeries, restaurants and specialty retailers.
                </p>

                {/* CTA Buttons */}
                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" className="h-11 px-6 text-base bg-black hover:bg-black/90" asChild>
                    <Link to="/contact">
                      <span className="text-nowrap">Contact us</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" className="h-11 px-6 text-base bg-muted hover:bg-muted/80 text-foreground" asChild>
                    <Link to="/#workspace">
                      <span className="text-nowrap">Tour the product</span>
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
                  <a href="/cevora-checkout.png" target="_blank" rel="noreferrer" className="block" aria-label="Open the full-size checkout screenshot (opens in a new tab)">
                    <img
                    src={checkout}
                    alt="Ceevora POS checkout showing product categories, a cart, and an applied promotion"
                    loading="lazy"
                    className="h-auto w-full rounded-2xl border border-border/60 shadow-2xl shadow-foreground/5"
                    />
                  </a>
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
        }} className="mx-auto mt-20 mb-8 max-w-5xl scroll-mt-24 px-6">
            <h2 id="workspace-gallery-title" className="mb-3 text-center text-xl font-semibold text-foreground sm:text-2xl">
              Explore the Ceevora workspace
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              See what cashiers, store managers and finance teams use each day. Select a screenshot for the full-size view.
            </p>
            <Carousel aria-labelledby="workspace-gallery-title" opts={{ loop: true }} setApi={setCarouselApi}>
              <CarouselContent className="touch-pan-y">
                {workspaceScreenshots.map(({ src, fullSize, title, description }) => (
                  <CarouselItem key={src}>
                    <figure>
                      <a href={fullSize ?? src} target="_blank" rel="noreferrer" aria-label={`Open the full-size ${title} screenshot (opens in a new tab)`} className="relative block aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted/40">
                        <img
                          src={src}
                          alt={`${title} screenshot`}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      </a>
                      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                        <strong className="block font-medium text-foreground">{title}</strong>
                        {description && <p className="mt-1">{description}</p>}
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
              <BentoGrid>
                {bentoFeatures.map(feature => <BentoCard key={feature.name} {...feature} />)}
              </BentoGrid>
              <article id="offline" className="relative mt-4 grid scroll-mt-24 gap-6 rounded-xl border border-border/50 bg-card p-6 sm:p-8 lg:grid-cols-[2fr_1fr] lg:items-center">
                <div>
                  <WifiOff className="mb-3 h-10 w-10 text-muted-foreground" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-foreground">Keep selling when offline</h3>
                  <p className="mt-2 text-muted-foreground">
                    When internet connectivity is unavailable, Ceevora POS saves supported checkout transactions locally on the POS device. When connectivity returns, Ceevora automatically syncs the saved transactions to the cloud database.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Electronic payment availability during an outage depends on your payment provider and terminal setup.
                  </p>
                </div>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Record the sale on the POS device</li>
                  <li>Restore internet connectivity</li>
                  <li>Sync saved sales to the cloud database</li>
                </ol>
              </article>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Accordion */}
      <Feature197 features={accordionFeatures} title="See Ceevora POS in action" description="Explore the operations dashboard, inventory workspace, and optional AI reporting." />


      <section id="modules" className="scroll-mt-16 bg-muted/40 py-20 lg:py-28 dark:bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">Ceevora POS modules</h2>
            <p className="text-xl text-muted-foreground">Explore the workflows that fit your operation, from a single register to a central kitchen serving multiple branches.</p>
          </div>
          <Accordion type="multiple" className="mx-auto max-w-4xl">
            {modules.map(({ title, description }) => (
              <AccordionItem key={title} value={title}>
                <AccordionTrigger className="text-left text-base font-semibold text-foreground">{title}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

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
              <Link to="/contact">
                Contact us
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
