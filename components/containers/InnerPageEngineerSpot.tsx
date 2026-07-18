import Image from "next/image";
import Link from "next/link";

type Accent = "red" | "teal" | "green";

interface InnerPageEngineerSpotProps {
  eyebrow?: string;
  name: string;
  role?: string;
  imageSrc: string;
  imageAlt: string;
  heading: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  accent?: Accent;
}

const InnerPageEngineerSpot = ({
  eyebrow = "GEO Hero Team",
  name,
  role = "GEO Gas Engineer",
  imageSrc,
  imageAlt,
  heading,
  description,
  ctaHref,
  ctaLabel,
  secondaryCtaHref = "/contracts",
  secondaryCtaLabel = "Plans From £19 / Month",
  accent = "red",
}: InnerPageEngineerSpotProps) => {
  return (
    <section className={`inner-engineer-spot inner-engineer-spot--${accent}`}>
      <div className="container">
        <div className="inner-engineer-spot__card">
          <div className="row ai-center">
            <div className="col-lg-7">
              <div className="inner-engineer-spot__content">
                <span className="inner-engineer-spot__eyebrow">{eyebrow}</span>
                <h3>{heading}</h3>
                <p>{description}</p>
                <div className="inner-engineer-spot__meta">
                  <span className="inner-engineer-spot__name">{name}</span>
                  <span className="inner-engineer-spot__role">{role}</span>
                </div>
                <div className="inner-engineer-spot__actions">
                  <Link className="button-1" href={ctaHref}>
                    {ctaLabel}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link className="button-2" href={secondaryCtaHref}>
                    {secondaryCtaLabel}
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 lg-mt-30">
              <div className="inner-engineer-spot__image">
                <div className="inner-engineer-spot__image-frame">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 991px) 80vw, 34vw"
                    className="inner-engineer-spot__image-tag"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerPageEngineerSpot;
