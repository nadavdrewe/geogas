import Image from "next/image";
import Link from "next/link";
import { competitionSlides } from "@/components/competition/competitionSlides";

const CompetitionHomeHero = () => {
  const featureSlide = competitionSlides[0];

  return (
    <section className="competition-hero" aria-labelledby="competition-hero-heading">
      <div className="container">
        <div className="competition-hero__grid">
          <div className="competition-hero__copy">
            <p className="competition-hero__eyebrow">Geo Gas Services competition</p>
            <h1 id="competition-hero-heading">
              Win a year of boiler cover for an Everyday Hero.
            </h1>
            <p className="competition-hero__intro">
              Enter for the chance to win 12 months of boiler cover from Geo Gas
              Services, with emergency support when it matters most.
            </p>
            <ul className="competition-hero__benefits">
              <li>
                <i className="fa-solid fa-shield" aria-hidden="true" />
                One year&apos;s boiler cover subscription
              </li>
              <li>
                <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                A quick online entry form
              </li>
              <li>
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                Terms, cover level and eligibility apply
              </li>
            </ul>
            <div className="competition-hero__actions">
              <Link className="competition-hero__cta" href="/competition">
                Enter the competition
                <i className="fa-regular fa-angle-right" aria-hidden="true" />
              </Link>
              <span>It only takes a moment to enter.</span>
            </div>
          </div>
          <div className="competition-hero__visual">
            <div className="competition-hero__poster-frame">
              <Image
                src={featureSlide.src}
                alt={featureSlide.alt}
                width={1254}
                height={1254}
                sizes="(max-width: 575px) 88vw, (max-width: 991px) 430px, (max-width: 1199px) 43vw, 520px"
                priority
                className="competition-hero__poster"
              />
            </div>
            <div
              className="competition-hero__prize-badge"
              aria-label="Prize: 12 months of boiler cover"
            >
              <strong>12</strong>
              <span>months of cover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionHomeHero;
