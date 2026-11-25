import { useTranslation } from "react-i18next";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import callingCodes from "@/components/marketing/data/calling-codes.json";
import cities from "@/components/marketing/data/cities.json";

const fields = [
  { name: "company", autoComplete: "organization", maxLength: 120 },
  { name: "name", autoComplete: "name", maxLength: 120, required: true, pattern: ".*\\S.*" },
  { name: "email", dir: "ltr" as const, type: "email", autoComplete: "email", maxLength: 254, required: true },
  { name: "phone", required: true },
  { name: "country", required: true },
  { name: "city", required: true },
  { name: "locations", type: "number", min: 1, max: 10000 },
  { name: "terminals", type: "number", min: 1, max: 10000 },
];

const countryCodes: Record<string, string> = callingCodes;
const citiesByCountry: Record<string, string[]> = cities;
const dialCodes = [...new Set(Object.values(countryCodes).filter(Boolean))]
  .sort((a, b) => Number(a) - Number(b));
const selectClass = "h-10 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground focus-ring disabled:opacity-50";

export default function Contact() {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dialCode, setDialCode] = useState("");
  const locale = i18n.resolvedLanguage ?? "en";
  const countryNames = useMemo(() => new Intl.DisplayNames([locale], { type: "region" }), [locale]);
  const countries = useMemo(() => Object.keys(citiesByCountry)
    .map((code) => ({ code, name: countryNames.of(code) ?? code }))
    .sort((a, b) => a.name.localeCompare(b.name, locale)), [countryNames, locale]);

  function selectCountry(code: string) {
    setCountry(code);
    setCity("");
    setDialCode(countryCodes[code] ?? "");
  }

  function openDemoEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const cityName = String(form.get(city === "other" ? "otherCity" : "city") ?? "").trim();
    if (!cityName) return;
    form.set("country", countryNames.of(country) ?? country);
    form.set("city", cityName);
    form.set("phone", [dialCode, String(form.get("phone")).replace(/ /g, "")].join(" "));
    const details = fields.flatMap(({ name }) => {
      const value = String(form.get(name) ?? "").trim();
      return value ? [[t(`marketing.field_${name}`), value].join(": ")] : [];
    });
    const notes = String(form.get("notes") ?? "").trim();
    const body = [
      t("marketing.emailGreeting"),
      "",
      t("marketing.emailBody"),
      "",
      ...details,
      ...(notes ? ["", t("marketing.notes"), notes.replace(/\r?\n/g, "\r\n")] : []),
    ].join("\r\n");
    const subject = encodeURIComponent(t("marketing.emailSubject"));
    window.location.href = `mailto:info@ceevora.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  const controls: Record<string, ReactNode> = {
    country: (
      <select id="country" name="country" autoComplete="country" required className={selectClass} value={country} onChange={(event) => selectCountry(event.target.value)}>
        <option value="">{t("marketing.selectCountry")}</option>
        {countries.map(({ code, name }) => <option key={code} value={code}>{name}</option>)}
      </select>
    ),
    city: (
      <>
        <select id="city" name="city" autoComplete="address-level2" required disabled={!country} className={selectClass} value={city} onChange={(event) => setCity(event.target.value)}>
          <option value="">{t("marketing.selectCity")}</option>
          {citiesByCountry[country]?.map((name) => <option key={name} value={name}>{name}</option>)}
          <option value="other">{t("marketing.otherCity")}</option>
        </select>
        {city === "other" && (
          <Input name="otherCity" aria-label={t("marketing.enterCity")} placeholder={t("marketing.enterCity")} maxLength={100} required pattern=".*\S.*" />
        )}
      </>
    ),
    phone: (
      <>
        <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-2" dir="ltr">
          <select name="dialCode" required autoComplete="tel-country-code" className={selectClass} aria-label={t("marketing.dialCode")} value={dialCode} onChange={(event) => setDialCode(event.target.value)}>
            <option value="">{t("marketing.selectDialCode")}</option>
            {dialCodes.map((code) => <option key={code} value={code}>{code}</option>)}
          </select>
          <Input id="phone" name="phone" type="tel" autoComplete="tel-national" required maxLength={27} pattern={`[0-9](?: ?[0-9]){3,${dialCode ? 15 - dialCode.length : 13}}`} aria-describedby="phone-hint" />
        </div>
        <p id="phone-hint" className="text-sm text-muted-foreground">{t("marketing.phoneHint")}</p>
      </>
    ),
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t("marketing.contactTitle")}</h1>
        <p className="text-lg text-muted-foreground">
          {t("marketing.contactIntro")}
        </p>
      </motion.div>
      <form onSubmit={openDemoEmail} className="max-w-2xl mx-auto rounded-2xl border border-border bg-muted p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ name, ...input }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>
                {t(`marketing.field_${name}`)} {!input.required && t("marketing.optional")}
              </Label>
              {controls[name] ?? <Input id={name} name={name} {...input} />}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">{t("marketing.notes")} {t("marketing.optional")}</Label>
          <Textarea id="notes" name="notes" rows={4} maxLength={2000} placeholder={t("marketing.notesPlaceholder")} />
        </div>
        <p id="email-instructions" className="text-sm text-muted-foreground">
          {t("marketing.emailInstructions")}
        </p>
        <Button type="submit" className="w-full" aria-describedby="email-instructions">{t("marketing.emailButton")}</Button>
      </form>
    </div>
  );
}
