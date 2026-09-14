import Image from "next/image";
import Link from "next/link";
import CompetitionEntryCount from "@/components/competition/CompetitionEntryCount";
import { competitionSlides } from "@/components/competition/competitionSlides";

const CompetitionHomeHero = () => {
  const featureSlide = competitionSlides[0];

  return (
    <section className="competition-hero" aria-labelledby="competition-hero-heading">
      <div className="container">
        <div className="competition-hero__grid">
          <div className="competition-hero__copy">
            <p className="competition-hero__eyebrow">Geo Gas Services competition · Phase 1</p>
            <h1 id="competition-hero-heading">
              Win a Boiler Safety Check for an Everyday Hero.
            </h1>
            <p className="competition-hero__intro">
              Enter for a free boiler service and gas inspection, plus a new
              carbon monoxide detector with a 10-year warranty. Worth £200.
            </p>
            <CompetitionEntryCount variant="dark" />
            <ul className="competition-hero__benefits">
              <li>
                <i className="fa-solid fa-shield" aria-hidden="true" />
                Free boiler service and gas inspection
              </li>
              <li>
                <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                New carbon monoxide detector with 10-year warranty
              </li>
              <li>
                <i className="fa-solid fa-circle-info" aria-hidden="true" />
                Prize worth £200. Terms and eligibility apply
              </li>
            </ul>
            <div className="competition-hero__actions">
              <Link className="competition-hero__cta" href="/competition">
                Enter the competition
                <i className="fa-regular fa-angle-right" aria-hidden="true" />
              </Link>
              <Link className="competition-hero__secondary-cta" href="/contact">
                Need help today? Book a call-out
                <i className="fa-solid fa-phone" aria-hidden="true" />
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
              aria-label="Phase 1 prize: boiler safety check worth 200 pounds"
            >
              <strong>£200</strong>
              <span>boiler safety check</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionHomeHero;
