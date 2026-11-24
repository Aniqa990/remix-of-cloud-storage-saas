"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
  title?: string;
  description?: string;
}

const Feature197 = ({ features, title, description }: Feature197Props) => {
  const [activeTab, setActiveTab] = useState(features[0] ? `item-${features[0].id}` : "");
  const activeFeature = features.find((feature) => `item-${feature.id}` === activeTab);

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {(title || description) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <Accordion
                type="single"
                collapsible
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                {features.map((tab) => (
                  <AccordionItem key={tab.id} value={`item-${tab.id}`} className="border-b border-border/50">
                    <AccordionTrigger
                      className="cursor-pointer py-5 !no-underline transition hover:no-underline"
                    >
                      <span className="text-base font-medium text-foreground">
                        {tab.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed pb-2">
                        {tab.description}
                      </p>
                      <div className="mt-4 lg:hidden">
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="block h-auto w-full rounded-lg"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="relative hidden aspect-video overflow-hidden rounded-lg lg:block">
              {activeFeature && (
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className="absolute inset-0 h-full w-full rounded-lg border border-border/30 bg-muted/30 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature197 };
