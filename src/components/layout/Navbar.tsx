import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "product", href: "/#workspace" },
  { name: "help", href: "/help" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const language = i18n.resolvedLanguage === "ar" ? "ar" : "en";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      toggle.current?.focus();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function renderLinks() {
    return navLinks.map(({ name, href }) => (
      <Link
        key={name}
        to={href}
        aria-current={pathname + (name === "product" ? hash : "") === href ? "page" : undefined}
        onClick={() => setIsMenuOpen(false)}
      >
        {t(`marketing.${name}`)}
      </Link>
    ));
  }

  return (
    <>
      <a href="#public-main" className="public-skip">
        {language === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <header className="public-header">
        <nav className="public-wrap public-nav">
          <Link to="/" className="public-logo" onClick={() => setIsMenuOpen(false)}>
            <img src="/cevora-mark.png" alt="Ceevora POS" width={2170} height={725} />
          </Link>
          <div className="public-nav-links">{renderLinks()}</div>
          <div className="public-nav-actions">
            <div className="public-language">
              <Globe2 aria-hidden="true" />
              <select
                aria-label={t("marketing.language")}
                value={language}
                onChange={(event) => void i18n.changeLanguage(event.target.value)}
              >
                <option value="en" lang="en">English</option>
                <option value="ar" lang="ar">العربية</option>
              </select>
              <ChevronDown aria-hidden="true" />
            </div>
            <Button className="public-button public-nav-contact" asChild>
              <Link to="/contact">{t("marketing.contact")}<ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button
              ref={toggle}
              type="button"
              variant="ghost"
              size="icon"
              className="public-menu-toggle"
              aria-label={isMenuOpen ? t("marketing.closeNavigation") : t("marketing.openNavigation")}
              aria-controls="public-mobile-nav"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
          <div id="public-mobile-nav" className="public-mobile-nav" hidden={!isMenuOpen}>
            <div className="public-wrap">
              {renderLinks()}
              <Button className="public-button" asChild>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  {t("marketing.contact")}<ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
