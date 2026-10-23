type SectionLinksProps = {
  label: string;
  links: { href: string; label: string }[];
};

export default function SectionLinks({ label, links }: SectionLinksProps) {
  return (
    <nav className="section-links" aria-label={label}>
      <span>{label}</span>
      <ul>
        {links.map((link) => (
          <li key={link.href}><a href={link.href}>{link.label}<i className="fa-regular fa-arrow-down" aria-hidden="true" /></a></li>
        ))}
      </ul>
    </nav>
  );
}
