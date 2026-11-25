import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const footerLinks = [
  { title: "product", links: [
    { name: "workspace", href: "/#workspace" },
    { name: "modules", href: "/#modules" },
  ] },
  { title: "help", links: [{ name: "faq", href: "/help" }] },
  { title: "contactHeading", links: [{ name: "contact", href: "/contact" }] },
];

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4 sm:px-6 lg:px-8 py-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/cevora-mark.png" alt="Ceevora POS" className="h-6 w-auto object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            {t("marketing.footerTagline")}
          </p>
        </div>
        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <h2 className="font-medium text-foreground text-sm mb-4">{t(`marketing.${title}`)}</h2>
            <ul className="space-y-3">
              {links.map(({ name, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`marketing.${name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ceevora POS</p>
          <a dir="ltr" href="mailto:info@ceevora.com" className="hover:text-foreground">info@ceevora.com</a>
        </div>
      </div>
    </footer>
  );
}
