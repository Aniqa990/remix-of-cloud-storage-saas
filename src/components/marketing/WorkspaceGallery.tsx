import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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
      className="workspace-gallery"
      dir={direction}
      aria-labelledby="workspace-gallery-title"
      opts={{ loop: true, align: "center", direction }}
      setApi={setApi}
      onKeyDownCapture={handleArrowKey}
    >
      <div className="workspace-viewer">
        <div className="workspace-viewer-bar">
          <strong aria-live="polite">{screenshot.title}</strong>
          <div className="workspace-pagination">
            <CarouselPrevious size="default" className="workspace-arrow static">
              <ChevronLeft className="rtl:rotate-180" aria-hidden="true" />{t("marketing.previous")}
            </CarouselPrevious>
            <CarouselNext size="default" className="workspace-arrow static">
              {t("marketing.next")}<ChevronRight className="rtl:rotate-180" aria-hidden="true" />
            </CarouselNext>
          </div>
        </div>
        <CarouselContent className="!m-0 touch-pan-y">
          {screenshots.map((item, index) => {
            const active = index === selected;
            return (
              <CarouselItem key={item.id} className="!p-0">
                <button
                  type="button"
                  tabIndex={active ? 0 : -1}
                  aria-label={t(active ? "marketing.zoom" : "marketing.goToScreenshot", { title: item.title })}
                  onClick={() => active ? onZoom(item) : api?.scrollTo(index)}
                  className="workspace-screen"
                >
                  <img src={item.src} alt="" loading="lazy" draggable={false} />
                  {active && <span className="screen-zoom" aria-hidden="true"><Maximize2 /></span>}
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {screenshot.description && <p className="workspace-description">{screenshot.description}</p>}
      </div>
      <div className="workspace-index">
        {screenshots.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={t("marketing.goToScreenshot", { title: item.title })}
            aria-current={index === selected ? "true" : undefined}
            onClick={() => api?.scrollTo(index)}
          >
            <span>{item.title}</span>
            <ChevronRight className="rtl:rotate-180" aria-hidden="true" />
          </button>
        ))}
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
          <button type="button" aria-label={t("marketing.unzoom")} onClick={onClose} className="absolute end-2 top-2 z-10 grid size-11 place-items-center rounded-full bg-black/80">
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
