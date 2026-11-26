import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Folder, Mail, Shield, Users } from "lucide-react";
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
    <>
      <section className="public-section help-intro" data-enter>
        <div className="public-wrap help-intro-layout">
          <div>
            <h1 className="public-display">{t("marketing.help")}</h1>
            <p>{t("marketing.helpIntro")}</p>
          </div>
          <div className="help-resources">
            {helpResources.map(({ icon: Icon, title, description, link }) => (
              <Link key={title} to={link}>
                <Icon aria-hidden="true" />
                <div>
                  <h2>{t(`marketing.${title}`)}</h2>
                  <p>{t(`marketing.${description}`)}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section faq-section" aria-labelledby="faq-heading">
        <div className="public-wrap">
          <h2 id="faq-heading">{t("marketing.faqHeading")}</h2>
          {faqCategories.map(({ id, icon: Icon, title, questions }) => (
            <div id={id} key={id} className="faq-category">
              <h3><Icon aria-hidden="true" />{t(`marketing.${title}`)}</h3>
              <Accordion type="single" dir={i18n.dir()} collapsible>
                {questions.map((item) => (
                  <AccordionItem key={item} value={item} className="faq-item">
                    <AccordionTrigger className="faq-question text-start hover:no-underline">
                      <span>{t(`marketing.${item}_question`)}</span>
                    </AccordionTrigger>
                    <AccordionContent className="faq-answer">
                      {t(`marketing.${item}_answer`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="public-section help-contact">
        <div className="public-wrap">
          <p>
            {t("marketing.helpEmail")}{" "}
            <a href="mailto:info@ceevora.com"><bdi>info@ceevora.com</bdi></a>.
          </p>
          <Button className="public-button" asChild>
            <Link to="/contact">{t("marketing.contact")}<ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
