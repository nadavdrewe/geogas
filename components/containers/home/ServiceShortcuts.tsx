import Link from "next/link";

const shortcuts = [
  { href: "/services", icon: "fa-wrench", title: "Find a service", detail: "Heating, plumbing & more" },
  { href: "/pricing", icon: "fa-sterling-sign", title: "See our prices", detail: "Clear rates before you book" },
  { href: "/contracts", icon: "fa-shield-halved", title: "Explore home cover", detail: "Compare contract options" },
  { href: "/contact", icon: "fa-calendar-check", title: "Book a visit", detail: "Talk to your local team" },
];

export default function ServiceShortcuts() {
  return (
    <nav className="service-shortcuts" aria-label="How can we help?">
      <div className="container">
        <p className="service-shortcuts__label">How can we help today?</p>
        <div className="service-shortcuts__grid">
          {shortcuts.map((item) => (
            <Link href={item.href} key={item.href}>
              <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              <i className="fa-regular fa-angle-right" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
