import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FileText, Folder, HelpCircle, Mail, Shield, Users } from "lucide-react";
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
    icon: FileText,
    id: "setup",
    title: "faq_setup_title",
    questions: [
      "faq_setup_1",
      "faq_setup_2",
      "faq_setup_3",
    ],
  },
  {
    icon: Users,
    id: "operations",
    title: "faq_operations_title",
    questions: [
      "faq_operations_1",
      "faq_operations_2",
      "faq_operations_3",
      "faq_operations_4",
    ],
  },
  {
    icon: Shield,
    id: "permissions",
    title: "faq_permissions_title",
    questions: [
      "faq_permissions_1",
      "faq_permissions_2",
      "faq_permissions_3",
    ],
  },
  {
    icon: Folder,
    id: "reporting",
    title: "faq_reporting_title",
    questions: [
      "faq_reporting_1",
      "faq_reporting_2",
      "faq_reporting_3",
    ],
  },
];

const helpResources = [
  { icon: FileText, title: "helpResource0Title", description: "helpResource0Description", link: "/help#setup" },
  { icon: Mail, title: "helpResource2Title", description: "helpResource2Description", link: "/contact" },
];

export default function HelpCenter() {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-muted py-20 lg:py-28">
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
            {t("marketing.help")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("marketing.helpIntro")}
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20"
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
              <h3 className="font-semibold text-foreground mb-1">{t(`marketing.${resource.title}`)}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {t(`marketing.${resource.description}`)}
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
            {t("marketing.faqHeading")}
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
                  <h3 className="font-semibold text-foreground">{t(`marketing.${category.title}`)}</h3>
                </div>
                <Accordion type="single" dir={i18n.dir()} collapsible className="px-2">
                  {category.questions.map((item) => (
                    <AccordionItem
                      key={item}
                      value={item}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="px-4 py-4 text-start hover:no-underline hover:bg-muted/30 rounded-lg">
                        <span className="text-sm font-medium text-foreground">
                          {t(`marketing.${item}_question`)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                        {t(`marketing.${item}_answer`)}
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
            {t("marketing.helpEmail")}{" "}
            <a className="font-medium text-foreground underline" href="mailto:info@ceevora.com"><bdi>info@ceevora.com</bdi></a>.
          </p>
          <Button asChild><Link to="/contact">{t("marketing.contact")}</Link></Button>
        </div>
      </div>
    </div>
  );
}
