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
              {item.href === "/contracts" ? (
                <svg className="service-shortcuts__icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6l8-3Z" />
                  <path d="m8 12 3 3 5-6" />
                </svg>
              ) : <i className={`fa-solid ${item.icon}`} aria-hidden="true" />}
              <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              <i className="fa-regular fa-angle-right" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
