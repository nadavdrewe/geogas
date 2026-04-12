import Link from "next/link";
import { SeoLink } from "@/lib/seo/types";

type SeoInternalLinksProps = {
  links: SeoLink[];
  title?: string;
};

const SeoInternalLinks = ({
  links,
  title = "Related pages",
}: SeoInternalLinksProps) => {
  return (
    <section className="seo-page__card">
      <h2>{title}</h2>
      <div className="seo-page__links-grid">
        {links.map((link) => (
          <Link key={`${link.href}-${link.label}`} href={link.href} className="seo-page__link">
            <span>{link.label}</span>
            <i className="fa-regular fa-arrow-right"></i>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SeoInternalLinks;

