import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import i18n from "@/i18n";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { ScreenshotZoom, type Screenshot } from "@/components/marketing/WorkspaceGallery";
import Contact from "@/pages/Contact";
import HelpCenter from "@/pages/HelpCenter";
import Landing from "@/pages/Landing";

beforeEach(async () => {
  await i18n.changeLanguage("en");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Ceevora public website", () => {
  it("requires contact details and updates cities and the calling code when the country changes", async () => {
    render(
      <MemoryRouter initialEntries={["/contact"]}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    const country = screen.getByLabelText<HTMLSelectElement>("Country");
    const city = screen.getByLabelText<HTMLSelectElement>("City");
    const dialCode = screen.getByLabelText("Country calling code");
    const phone = screen.getByLabelText("Contact number");
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Contact name")).toBeRequired();
    expect(screen.getByLabelText(/Company name/)).not.toBeRequired();
    expect(country).toBeRequired();
    expect(city).toBeRequired();
    expect(city).toBeDisabled();
    expect(country.querySelector("optgroup")).toBeNull();
    expect(Array.from(country.options, (option) => option.value)).toEqual(["", "BH", "KW", "OM", "QA", "SA", "AE"]);
    expect(phone).toBeInvalid();

    fireEvent.change(country, { target: { value: "SA" } });
    expect(dialCode).toHaveValue("+966");
    expect(city.querySelector('option[value="Riyadh"]')).toBeInTheDocument();
    fireEvent.change(city, { target: { value: "Riyadh" } });
    expect(city).toHaveValue("Riyadh");

    fireEvent.change(country, { target: { value: "AE" } });
    expect(dialCode).toHaveValue("+971");
    expect(city).toHaveValue("");
    expect(city.querySelector('option[value="Riyadh"]')).not.toBeInTheDocument();
    expect(Array.from(city.options, (option) => option.value)).toEqual(expect.arrayContaining([
      "Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain City",
    ]));
    fireEvent.change(city, { target: { value: "other" } });
    expect(screen.getByRole("textbox", { name: "Enter your city" })).toBeRequired();
    fireEvent.change(dialCode, { target: { value: "+966" } });
    fireEvent.change(phone, { target: { value: "+966 50 123 4567" } });
    expect(phone).toBeInvalid();
    fireEvent.change(phone, { target: { value: "50 123 4567" } });
    expect(phone).toBeValid();

    fireEvent.change(screen.getByRole("combobox", { name: "Website language" }), { target: { value: "ar" } });
    await waitFor(() => expect(document.documentElement).toHaveAttribute("dir", "rtl"));
    expect(document.documentElement).toHaveAttribute("lang", "ar");
    expect(screen.getByLabelText("رقم التواصل")).toHaveValue("50 123 4567");
    expect(screen.getByLabelText("رمز الاتصال الدولي")).toHaveValue("+966");
    expect(screen.getByRole("link", { name: "info@ceevora.com" })).toHaveAttribute("href", "mailto:info@ceevora.com");
  });

  it("provides cities and calling codes for the additional Gulf countries", () => {
    const { container } = render(<Contact />);
    const country = container.querySelector<HTMLSelectElement>("#country")!;
    const city = container.querySelector<HTMLSelectElement>("#city")!;
    const dialCode = container.querySelector<HTMLSelectElement>('select[name="dialCode"]')!;
    for (const [code, prefix, capital] of [
      ["BH", "+973", "Manama"],
      ["KW", "+965", "Kuwait City"],
      ["OM", "+968", "Muscat"],
      ["QA", "+974", "Doha"],
    ]) {
      fireEvent.change(country, { target: { value: code } });
      expect(dialCode).toHaveValue(prefix);
      expect(city.querySelector(`option[value="${capital}"]`)).toBeInTheDocument();
    }
  });

  it("switches the dashboard and every workspace screenshot with the site language", async () => {
    class Observer {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", Observer);
    vi.stubGlobal("IntersectionObserver", Observer);
    const { container } = render(
      <MemoryRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Landing />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const language = screen.getByRole("combobox", { name: "Website language" });
    const imageNames = () => Array.from(container.querySelectorAll<HTMLImageElement>("main img"), (image) =>
      image.src.split("/").pop(),
    );
    const englishImages = imageNames();
    expect(englishImages).toHaveLength(10);
    expect(englishImages[0]).toBe("cevora-dashboard.png");

    fireEvent.change(language, { target: { value: "ar" } });
    await waitFor(() => expect(imageNames()).toEqual([
      "ar-dashboard.png", "ar-terminal.png", "ar-transaction_history.png", "ar-products.png",
      "ar-promotions.png", "ar-stock.png", "ar-static_report.png", "ar-stores.png",
      "ar-jv_details.png", "ar-AI_report.png",
    ]));

    fireEvent.change(language, { target: { value: "en" } });
    await waitFor(() => expect(imageNames()).toEqual(englishImages));
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
    const screenshot = { id: "checkout", src: "/checkout.png", title: "Checkout" };
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
