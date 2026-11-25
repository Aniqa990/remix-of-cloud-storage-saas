import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X, ZoomIn } from "lucide-react";
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi,
} from "@/components/ui/carousel";

export type Screenshot = {
  id: string;
  src: string;
  title: string;
  description?: string;
};

export function WorkspaceGallery({ screenshots, onZoom }: {
  screenshots: Screenshot[];
  onZoom: (screenshot: Screenshot) => void;
}) {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateSelection = () => setSelected(api.selectedScrollSnap());
    updateSelection();
    api.on("select", updateSelection).on("reInit", updateSelection);
    return () => {
      api.off("select", updateSelection).off("reInit", updateSelection);
    };
  }, [api]);

  function handleArrowKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    if ((event.key === "ArrowRight") === (direction === "ltr")) {
      api?.scrollNext();
    } else {
      api?.scrollPrev();
    }
  }

  const screenshot = screenshots[selected];
  return (
    <Carousel
      dir={direction}
      aria-labelledby="workspace-gallery-title"
      opts={{ loop: true, align: "center", direction }}
      setApi={setApi}
      onKeyDownCapture={handleArrowKey}
    >
      <CarouselContent className="!m-0 touch-pan-y gap-2 sm:gap-3">
        {screenshots.map((item, index) => {
          const active = index === selected;
          return (
            <CarouselItem key={item.id} className="!basis-[calc(100%-3rem)] !p-0 max-w-[976px]">
              <button
                type="button"
                tabIndex={active ? 0 : -1}
                aria-label={t(active ? "marketing.zoom" : "marketing.goToScreenshot", { title: item.title })}
                onClick={() => active ? onZoom(item) : api?.scrollTo(index)}
                className={`group relative block aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40 transition duration-300 motion-reduce:transition-none ${active ? "cursor-zoom-in opacity-100" : "scale-y-[0.87] opacity-[0.35] hover:opacity-60"}`}
              >
                <img src={item.src} alt="" loading="lazy" draggable={false} className="h-full w-full object-contain" />
                {active && (
                  <span className="absolute bottom-3 end-3 rounded-full bg-black/75 p-2 text-white" aria-hidden="true">
                    <ZoomIn className="size-4" />
                  </span>
                )}
              </button>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mx-auto mt-1.5 max-w-3xl px-6 text-center text-sm text-muted-foreground" aria-live="polite">
        <strong className="block font-medium text-foreground">{screenshot.title}</strong>
        {screenshot.description && <p className="mt-1">{screenshot.description}</p>}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4">
        <CarouselPrevious size="default" className="static h-10 w-auto translate-y-0">{t("marketing.previous")}</CarouselPrevious>
        <div className="flex items-center">
          {screenshots.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={t("marketing.goToScreenshot", { title: item.title })}
              aria-current={index === selected ? "true" : undefined}
              className="flex size-6 items-center justify-center rounded-full sm:size-7"
              onClick={() => api?.scrollTo(index)}
            >
              <span className={`size-2 rounded-full ${index === selected ? "bg-foreground" : "bg-muted-foreground/40"}`} />
            </button>
          ))}
        </div>
        <CarouselNext size="default" className="static h-10 w-auto translate-y-0">{t("marketing.next")}</CarouselNext>
      </div>
    </Carousel>
  );
}

export function ScreenshotZoom({ screenshot, onClose }: {
  screenshot: Screenshot | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (screenshot && element && !element.open) element.showModal();
    if (!screenshot && element?.open) element.close();
  }, [screenshot]);

  return (
    <dialog
      ref={dialog}
      aria-label={screenshot?.title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85"
    >
      {screenshot && (
        <div className="relative">
          <button type="button" aria-label={t("marketing.unzoom")} onClick={onClose} className="absolute end-2 top-2 z-10 rounded-full bg-black/80 p-2">
            <X className="size-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label={t("marketing.unzoom")} onClick={onClose} className="block cursor-zoom-out">
            <img
              src={screenshot.src}
              alt={screenshot.title}
              className="block max-h-[94dvh] max-w-[96vw] rounded-lg object-contain"
            />
          </button>
        </div>
      )}
    </dialog>
  );
}
