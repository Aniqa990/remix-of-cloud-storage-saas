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
    <footer className="public-footer">
      <div className="public-wrap footer-layout">
        <div className="footer-brand">
          <Link to="/" className="public-logo">
            <img src="/cevora-mark.png" alt="Ceevora POS" width={2170} height={725} />
          </Link>
          <p>{t("marketing.footerTagline")}</p>
        </div>
        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <h2>{t(`marketing.${title}`)}</h2>
            <ul>
              {links.map(({ name, href }) => (
                <li key={href}><Link to={href}>{t(`marketing.${name}`)}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="public-wrap footer-meta">
        <p dir="ltr">© {new Date().getFullYear()} Ceevora POS</p>
        <a dir="ltr" href="mailto:info@ceevora.com">info@ceevora.com</a>
      </div>
    </footer>
  );
}
