import Link from "next/link";

type SeoActionLinkProps = {
  href: string;
  label: string;
  className: string;
};

const isExternalHref = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("tel:") ||
  href.startsWith("mailto:");

const SeoActionLink = ({ href, label, className }: SeoActionLinkProps) => {
  if (isExternalHref(href)) {
    return (
      <a
        className={className}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        <span className="seo-action-link__label">{label}</span>
        <i className="fa-regular fa-angle-right"></i>
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      <span className="seo-action-link__label">{label}</span>
      <i className="fa-regular fa-angle-right"></i>
    </Link>
  );
};

export default SeoActionLink;
