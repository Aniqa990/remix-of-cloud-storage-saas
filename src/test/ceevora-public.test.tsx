import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "@/i18n";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScreenshotZoom, type Screenshot } from "@/components/marketing/WorkspaceGallery";
import Contact from "@/pages/Contact";
import HelpCenter from "@/pages/HelpCenter";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Ceevora public website", () => {
  it("switches Contact to Arabic and validates an international phone number", async () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const phone = screen.getByLabelText(/Contact number with country code/);
    fireEvent.change(phone, { target: { value: "0501234567" } });
    expect(phone).toBeInvalid();
    fireEvent.change(phone, { target: { value: "+966 50 123 4567" } });
    expect(phone).toBeValid();

    fireEvent.change(screen.getByRole("combobox", { name: "Website language" }), { target: { value: "ar" } });
    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(document.documentElement).toHaveAttribute("lang", "ar");
    expect(screen.getByLabelText(/رقم التواصل مع رمز الدولة/)).toHaveValue("+966 50 123 4567");
    expect(screen.getByRole("link", { name: "info@ceevora.com" })).toHaveAttribute("href", "mailto:info@ceevora.com");
  });

  it("collapses an expanded FAQ when its heading is clicked again", () => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    render(<MemoryRouter><HelpCenter /></MemoryRouter>);
    const question = screen.getByRole("button", { name: "Does checkout work offline?" });
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(question);
    expect(question).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a full-size screenshot and closes it when the image is clicked", () => {
    const screenshot = { src: "/checkout.png", title: "Checkout" };
    function GalleryHarness() {
      const [selected, setSelected] = useState<Screenshot | null>(null);
      return (
        <>
          <button onClick={() => setSelected(screenshot)}>Open image</button>
          <ScreenshotZoom screenshot={selected} onClose={() => setSelected(null)} />
        </>
      );
    }

    const { container } = render(<GalleryHarness />);
    const dialog = container.querySelector("dialog")!;
    dialog.showModal = () => { dialog.open = true; };
    dialog.close = () => { dialog.open = false; };
    fireEvent.click(screen.getByRole("button", { name: "Open image" }));
    expect(dialog.open).toBe(true);
    const image = screen.getByRole("img", { name: "Checkout" });
    expect(image).toHaveAttribute("src", "/checkout.png");
    fireEvent.click(image);
    expect(dialog.open).toBe(false);
  });
});
