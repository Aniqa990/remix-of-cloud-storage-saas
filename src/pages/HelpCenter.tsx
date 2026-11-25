import { motion } from "framer-motion";
import { CreditCard, FileText, Folder, HelpCircle, Mail, MessageSquare, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    name: "Getting Started",
    icon: FileText,
    id: "setup",
    questions: [
      { q: "What hardware can we use?", a: "Discuss Windows or Android POS devices with Ceevora. Share your payment terminal, printer, cash drawer or scanner models to confirm compatibility." },
      { q: "Does checkout work offline?", a: "A configured till can record core counter sales locally and sync them when the connection returns. Online refunds, reports, and provider integrations require connectivity." },
      { q: "Does Ceevora POS support Arabic?", a: "Yes. Ceevora POS supports Arabic and English interfaces, including a right-to-left interface and bilingual catalog names." },
    ],
  },
  {
    name: "Planning your rollout",
    icon: CreditCard,
    id: "rollout",
    questions: [
      { q: "Can we choose cloud or on-premises deployment?", a: "Discuss cloud subscription or on-premises deployment with Ceevora. Hosting, licences, training and support are scoped for each rollout." },
      { q: "How do we get a quote?", a: "Share your number of shops, POS terminals, management users and required modules. Ceevora can scope a rollout and quote for your setup." },
      { q: "What can the AI add-on do?", a: "AI Report Builder turns sales questions into reports you can export to Excel. AI Product Images generates catalog images you can preview before saving." },
      { q: "Can I add inventory or accounting?", a: "Inventory, purchasing, stock transfers, and General Ledger are available through licensed modules. Contact Ceevora to discuss which modules fit your setup." },
    ],
  },
  {
    name: "Stores and Operations",
    icon: Users,
    id: "operations",
    questions: [
      { q: "Can each branch have its own menu?", a: "Yes. Configure menus by shop, track stock by location and compare sales across locations in the management console." },
      { q: "Can I manage more than one shop?", a: "Yes. Organize tills under stores and branches, scope staff access by location, and use branch and store filters in sales reporting." },
      { q: "Can I handle orders for business customers?", a: "The back-office workflow supports customer prices, credit terms, standing orders, and production lists by kitchen." },
      { q: "Can I receive delivery app orders?", a: "The delivery inbox supports enabled providers. Provider activation, store configuration, and POS product mapping are required." },
    ],
  },
  {
    name: "Access and Approvals",
    icon: Shield,
    id: "permissions",
    questions: [
      { q: "Can I give staff different permissions?", a: "Yes. Staff and administrators can be given role-based permissions and access to assigned locations." },
      { q: "How are refunds and voids approved?", a: "Cashiers can look up a sale and request manager approval. These reversals require an online connection." },
      { q: "How do we plan for Saudi e-invoicing?", a: "Share your ZATCA requirements with Ceevora to confirm the supported configuration and onboarding scope for your business." },
    ],
  },
  {
    name: "Stock and Reporting",
    icon: Folder,
    id: "reporting",
    questions: [
      { q: "Can sales use up recipe ingredients?", a: "Yes. When Inventory is enabled and a product has a recipe, checkout can deduct its ingredient quantities using the configured units." },
      { q: "Can I track expiry dates and stock counts?", a: "Yes. Inventory includes batch and expiry tracking, physical counts, and variance review." },
      { q: "Which reports can I export?", a: "Standard sales reports include daily sales, categories, promotions, and VAT, with CSV or Excel export. Sales Summary has a PDF download." },
    ],
  },
];

const helpResources = [
  { icon: FileText, title: "POS setup", description: "Checkout, devices and connectivity", link: "/help#setup" },
  { icon: MessageSquare, title: "Planning your rollout", description: "Deployment, quotes and add-ons", link: "/help#rollout" },
  { icon: Mail, title: "Contact us", description: "Talk to Ceevora about a demo", link: "/contact" },
];

export default function HelpCenter() {
  return (
    <div className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Help
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about using and rolling out Ceevora POS.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
        >
          {helpResources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.link}
              className="group flex flex-col items-center p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <resource.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {resource.description}
              </p>
            </Link>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div
                id={category.id}
                key={category.id}
                className="scroll-mt-24 rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/50 border-b border-border">
                  <category.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </div>
                <Accordion type="single" collapsible className="px-2">
                  {category.questions.map((item) => (
                    <AccordionItem
                      key={item.q}
                      value={item.q}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="px-4 py-4 text-left hover:no-underline hover:bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium text-foreground">
                          {item.q}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="mb-4 text-muted-foreground">
            For product or implementation questions, email{" "}
            <a className="font-medium text-foreground underline" href="mailto:info.ceevora@gmail.com">info.ceevora@gmail.com</a>.
          </p>
          <Button asChild><Link to="/contact">Contact us</Link></Button>
        </div>
      </div>
    </div>
  );
}
