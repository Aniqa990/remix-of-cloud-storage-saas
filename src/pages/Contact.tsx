import { useTranslation } from "react-i18next";
import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fields = [
  { name: "company", autoComplete: "organization", maxLength: 120, required: true },
  { name: "name", autoComplete: "name", maxLength: 120, required: true },
  { name: "email", dir: "ltr" as const, type: "email", autoComplete: "email", maxLength: 254, required: true },
  { name: "phone", type: "tel", autoComplete: "tel", dir: "ltr" as const, maxLength: 29, pattern: String.raw`\+[1-9](?: ?[0-9]){6,14}`, placeholder: "+966 50 123 4567", "aria-describedby": "phone-hint" },
  { name: "country", autoComplete: "country-name", maxLength: 100, required: true },
  { name: "city", autoComplete: "address-level2", maxLength: 100, required: true },
  { name: "locations", type: "number", min: 1, max: 10000 },
  { name: "terminals", type: "number", min: 1, max: 10000 },
];

export default function Contact() {
  const { t } = useTranslation();

  function openDemoEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
      <form onSubmit={openDemoEmail} className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ name, ...input }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>
                {t(`marketing.field_${name}`)} {!input.required && t("marketing.optional")}
              </Label>
              <Input id={name} name={name} defaultValue={name === "country" ? t("marketing.saudi") : undefined} {...input} />
              {name === "phone" && <p id="phone-hint" className="text-sm text-muted-foreground">{t("marketing.phoneHint")}</p>}
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
