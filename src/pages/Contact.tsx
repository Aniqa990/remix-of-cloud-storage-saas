import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fields = [
  { name: "company", label: "Company name", autoComplete: "organization", maxLength: 120, required: true },
  { name: "name", label: "Contact name", autoComplete: "name", maxLength: 120, required: true },
  { name: "email", label: "Work email", type: "email", autoComplete: "email", maxLength: 254, required: true },
  { name: "phone", label: "Business phone (optional)", type: "tel", autoComplete: "tel", maxLength: 40 },
  { name: "country", label: "Country", autoComplete: "country-name", defaultValue: "Saudi Arabia", maxLength: 100, required: true },
  { name: "city", label: "City", autoComplete: "address-level2", maxLength: 100, required: true },
  { name: "locations", label: "Number of locations (optional)", type: "number", min: 1, max: 10000 },
  { name: "terminals", label: "Number of POS terminals (optional)", type: "number", min: 1, max: 10000 },
];

function openDemoEmail(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const details = fields.flatMap(({ name, label }) => {
    const value = String(form.get(name) ?? "").trim();
    return value ? [[label.replace(" (optional)", ""), value].join(": ")] : [];
  });
  const notes = String(form.get("notes") ?? "").trim();
  const body = [
    "Hello Ceevora team,",
    "",
    "I'd like to request a Ceevora POS demo.",
    "",
    ...details,
    ...(notes ? ["", "Modules or requirements", notes.replace(/\r?\n/g, "\r\n")] : []),
  ].join("\r\n");
  const subject = encodeURIComponent("Ceevora POS demo request");
  window.location.href = `mailto:info.ceevora@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Request a Ceevora POS demo</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your company and POS requirements. The Ceevora team will contact you to arrange a demo.
        </p>
      </motion.div>
      <form onSubmit={openDemoEmail} className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ label, name, ...input }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>{label}</Label>
              <Input id={name} name={name} {...input} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Modules or requirements (optional)</Label>
          <Textarea id="notes" name="notes" rows={4} maxLength={2000} placeholder="For example, checkout, purchasing and inventory, or General Ledger" />
        </div>
        <p id="email-instructions" className="text-sm text-muted-foreground">
          Your email app will open with these details in a draft. Review it and click Send to request your demo.
        </p>
        <Button type="submit" className="w-full" aria-describedby="email-instructions">Open email draft</Button>
      </form>
    </div>
  );
}
