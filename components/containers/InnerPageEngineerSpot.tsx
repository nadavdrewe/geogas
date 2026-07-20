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
    <section
      className={`inner-engineer-spot inner-engineer-spot--${accent}`}
      aria-labelledby="inner-engineer-spot-heading"
    >
      <div className="container">
        <div className="inner-engineer-spot__card">
          <div className="inner-engineer-spot__content">
            <span className="inner-engineer-spot__eyebrow">
              <span className="inner-engineer-spot__eyebrow-mark" aria-hidden="true" />
              {eyebrow}
            </span>
            <h2 id="inner-engineer-spot-heading">{heading}</h2>
            <p>{description}</p>

            <div className="inner-engineer-spot__actions">
              <Link className="button-1" href={ctaHref}>
                <span className="inner-engineer-spot__action-label">{ctaLabel}</span>
                <span className="inner-engineer-spot__action-icon" aria-hidden="true">
                  <i className="fa-regular fa-angle-right"></i>
                </span>
              </Link>
              <Link className="button-2" href={secondaryCtaHref}>
                <span className="inner-engineer-spot__action-label">
                  {secondaryCtaLabel}
                </span>
                <span className="inner-engineer-spot__action-icon" aria-hidden="true">
                  <i className="fa-regular fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>

          <div className="inner-engineer-spot__visual">
            <div className="inner-engineer-spot__image-frame">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 767px) calc(100vw - 68px), (max-width: 991px) calc(100vw - 120px), 520px"
                className="inner-engineer-spot__image-tag"
              />
            </div>
            <div className="inner-engineer-spot__meta">
              <span className="inner-engineer-spot__avatar" aria-hidden="true">
                {name.charAt(0)}
              </span>
              <span className="inner-engineer-spot__person">
                <strong className="inner-engineer-spot__name">{name}</strong>
                <span className="inner-engineer-spot__role">{role}</span>
              </span>
              <span className="inner-engineer-spot__verified" aria-hidden="true">
                <i className="fa-solid fa-check"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerPageEngineerSpot;
