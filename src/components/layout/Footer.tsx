import { Link } from "react-router-dom";

const footerLinks = [
  { title: "Product", links: [
    { name: "Workspace", href: "/#workspace" },
    { name: "Modules", href: "/#modules" },
  ] },
  { title: "Help", links: [{ name: "FAQ", href: "/help" }] },
  { title: "Contact", links: [{ name: "Contact us", href: "/contact" }] },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4 sm:px-6 lg:px-8 py-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/cevora-mark.png" alt="Ceevora POS" className="h-6 w-auto object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            Point of sale and store operations for Saudi Arabia
          </p>
        </div>
        {footerLinks.map(({ title, links }) => (
          <div key={title}>
            <h2 className="font-medium text-foreground text-sm mb-4">{title}</h2>
            <ul className="space-y-3">
              {links.map(({ name, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ceevora POS</p>
          <a href="mailto:info.ceevora@gmail.com" className="hover:text-foreground">info.ceevora@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
