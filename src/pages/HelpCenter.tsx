import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  FileText, 
  Shield, 
  CreditCard,
  Users,
  Folder,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

const faqCategories = [
  {
    name: "Getting Started",
    icon: FileText,
    questions: [
      { q: "What devices can I use?", a: "Cevora POS targets Windows tills and Android tablets and handhelds. Printer, scanner, drawer, and payment hardware compatibility depends on the setup." },
      { q: "Does checkout work offline?", a: "A configured till can record core counter sales locally and sync them when the connection returns. Online refunds, reports, and provider integrations require connectivity." },
      { q: "Which languages are supported?", a: "The POS includes English and Arabic, including a right-to-left interface and bilingual catalog names." },
    ],
  },
  {
    name: "Plans and Add-ons",
    icon: CreditCard,
    questions: [
      { q: "What is included in the Starter package?", a: "Starter is designed for core counter sales, products and menus, shift reconciliation, and standard reports." },
      { q: "What can the AI add-on do?", a: "AI Report Builder turns sales questions into reports you can export to Excel. AI Product Images generates catalog images you can preview before saving." },
      { q: "Can I add inventory or accounting?", a: "Inventory, purchasing, stock transfers, and General Ledger are available through licensed modules. Check the plans page for suggested packages." },
    ],
  },
  {
    name: "Stores and Operations",
    icon: Users,
    questions: [
      { q: "Can I manage more than one shop?", a: "Yes. Organize tills under stores and branches, scope staff access by location, and use branch and store filters in sales reporting." },
      { q: "Can I handle orders for business customers?", a: "The back-office workflow supports customer prices, credit terms, standing orders, and production lists by kitchen." },
      { q: "Can I receive delivery app orders?", a: "The delivery inbox supports enabled providers. Provider activation, store configuration, and POS product mapping are required." },
    ],
  },
  {
    name: "Access and Approvals",
    icon: Shield,
    questions: [
      { q: "Can I give staff different permissions?", a: "Yes. Staff and administrators can be given role-based permissions and access to assigned locations." },
      { q: "How are refunds and voids approved?", a: "Cashiers can look up a sale and request manager approval. These reversals require an online connection." },
      { q: "Does Cevora support Saudi e-invoicing?", a: "With the ZATCA module and an onboarded terminal, Cevora supports signed QR receipts, standard invoice clearance, credit notes, and a document register." },
    ],
  },
  {
    name: "Stock and Reporting",
    icon: Folder,
    questions: [
      { q: "Can sales use up recipe ingredients?", a: "Yes. When Inventory is enabled and a product has a recipe, checkout can deduct its ingredient quantities using the configured units." },
      { q: "Can I track expiry dates and stock counts?", a: "Yes. Inventory includes batch and expiry tracking, physical counts, and variance review." },
      { q: "Which reports can I export?", a: "Standard sales reports include daily sales, categories, promotions, and VAT, with CSV or Excel export. Sales Summary has a PDF download." },
    ],
  },
];

const helpResources = [
  {
    icon: FileText,
    title: "POS setup",
    description: "Checkout, devices, and connectivity",
    link: "#",
  },
  {
    icon: MessageSquare,
    title: "Product questions",
    description: "Plans, reporting, and add-ons",
    link: "#",
  },
  {
    icon: Mail,
    title: "Contact form preview",
    description: "Preview the support form",
    link: "#contact",
  },
];

export default function HelpCenter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Form preview complete. No message was sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

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
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions or get in touch with our support team.
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
            <a
              key={resource.title}
              href={resource.link}
              className="group flex flex-col items-center p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <resource.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{resource.title}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {resource.description}
              </p>
            </a>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-muted/50 border-b border-border">
                  <category.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                </div>
                <Accordion type="single" collapsible className="px-2">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.name}-${index}`}
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

        {/* Contact Form */}
        <motion.div
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Still need help?
            </h2>
            <p className="text-muted-foreground">
              This form is a preview. Submissions are not sent to a support team.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleInputChange}
                className={errors.subject ? "border-destructive" : ""}
              />
              {errors.subject && (
                <p className="text-xs text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Describe your issue or question..."
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? "border-destructive" : ""}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Preview submission"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}