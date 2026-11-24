import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Starter",
    description: "For shops and cafés running a single location.",
    price: "Custom quote",
    focus: "Core checkout and reporting",
    features: [
      { name: "Offline-capable counter checkout", included: true },
      { name: "Receipts and split payments", included: true },
      { name: "Products, menus, and combos", included: true },
      { name: "Cash drawer and shift reconciliation", included: true },
      { name: "Standard sales reports", included: true },
      { name: "Inventory and recipes", included: false },
      { name: "Purchasing and goods receiving", included: false },
      { name: "Stock transfers between stores", included: false },
    ],
    cta: "Create an account",
    popular: false,
  },
  {
    name: "Operations",
    description: "For businesses that manage ingredients, stock, and suppliers.",
    price: "Custom quote",
    focus: "Inventory and purchasing",
    features: [
      { name: "Everything in Starter", included: true },
      { name: "Ingredient-level stock deductions", included: true },
      { name: "Batch and expiry tracking", included: true },
      { name: "Stock counts and adjustments", included: true },
      { name: "Reorder rules and inventory reports", included: true },
      { name: "Suppliers, purchasing, and receiving", included: true },
      { name: "Scheduled promotions and coupons", included: true },
      { name: "Stock transfers between stores", included: false },
    ],
    cta: "Create an account",
    popular: true,
  },
  {
    name: "Multi-Location",
    description: "For operators managing multiple branches and stores.",
    price: "Custom quote",
    focus: "Cross-store operations",
    features: [
      { name: "Everything in Operations", included: true },
      { name: "Branch, store, and till management", included: true },
      { name: "Consolidated sales summaries", included: true },
      { name: "Store-to-store stock transfers", included: true },
      { name: "Dispatch, receiving, and variance review", included: true },
      { name: "Location-scoped manager access", included: true },
      { name: "Approval rules and work queues", included: true },
      { name: "Transfer and replenishment reports", included: true },
    ],
    cta: "Create an account",
    popular: false,
  },
];

const comparisonFeatures = [
  { name: "Checkout, menus, and shifts", free: "Included", pro: "Included", business: "Included" },
  { name: "Standard sales reporting", free: "Included", pro: "Included", business: "Included" },
  { name: "Inventory, recipes, and purchasing", free: "—", pro: "Included", business: "Included" },
  { name: "Advanced promotions", free: "—", pro: "Included", business: "Included" },
  { name: "Cross-store reporting and transfers", free: "—", pro: "—", business: "Included" },
  { name: "AI Report Builder and Product Images", free: "Optional", pro: "Optional", business: "Optional" },
  { name: "General Ledger", free: "Optional", pro: "Optional", business: "Optional" },
  { name: "Saudi ZATCA e-invoicing", free: "Optional", pro: "Optional", business: "Optional" },
  { name: "Delivery integrations", free: "Optional", pro: "Optional", business: "Optional" },
  { name: "Business orders and kitchen production", free: "Optional", pro: "Optional", business: "Optional" },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Choose a Cevora POS plan
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare proposed packages for your stores. Pricing and optional modules depend on your setup.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm font-medium transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
          </div>
          <span className={`ml-3 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium transition-opacity ${isYearly ? "opacity-100" : "opacity-0"}`}>
            Quote-based
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-elevated border-2 border-primary"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background text-primary text-sm font-medium shadow-md">
                  For growing teams
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${plan.popular ? "" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? "" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {isYearly ? "per year" : "per month"}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.focus}
                </p>
              </div>

              <Button
                className={`w-full mb-8 ${
                  plan.popular
                    ? "bg-background text-foreground hover:bg-background/90"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className={`w-5 h-5 ${plan.popular ? "text-primary-foreground" : "text-success"}`} />
                    ) : (
                      <Minus className={`w-5 h-5 ${plan.popular ? "text-primary-foreground/40" : "text-muted-foreground/40"}`} />
                    )}
                    <span className={`text-sm ${
                      feature.included 
                        ? plan.popular ? "" : "text-foreground" 
                        : plan.popular ? "text-primary-foreground/50" : "text-muted-foreground"
                    }`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Compare plans and add-ons
          </h2>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-4 bg-muted px-6 py-4 text-sm font-semibold">
              <div className="text-foreground">Feature</div>
              <div className="text-center text-muted-foreground">Starter</div>
              <div className="text-center text-primary">Operations</div>
              <div className="text-center text-muted-foreground">Multi-Location</div>
            </div>
            {comparisonFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`grid grid-cols-4 px-6 py-4 text-sm ${
                  index % 2 === 0 ? "bg-card" : "bg-muted/30"
                }`}
              >
                <div className="text-foreground font-medium">{feature.name}</div>
                <div className="text-center text-muted-foreground">{feature.free}</div>
                <div className="text-center text-foreground">{feature.pro}</div>
                <div className="text-center text-foreground">{feature.business}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Have questions? We're here to help.
          </p>
          <Button variant="outline" asChild>
            <Link to="/help#contact">Contact Support</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
