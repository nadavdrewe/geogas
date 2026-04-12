import Link from "next/link";
import Image from "next/image";

const keyBenefits = [
  "Annual boiler service checks",
  "Heating and plumbing support included",
  "24/7 helpline with rapid response prioritisation",
  "No extra charges for heating, plumbing and drainage claims",
  "Unlimited call-outs under contract cover (excluding drains)",
  "All parts and labour covered with new parts used",
];

const starterCoverage = [
  "Boiler, flue and controls",
  "Thermostats, pumps and motorised valves",
  "Radiators, valves, pipes and fittings",
  "Heating and boiler cover up to £1,500 per claim",
];

const completeAddons = [
  "Internal plumbing between stopcock and taps/appliances",
  "Water supply pipework from internal stopcock to accessible point",
  "Internal drains and waste pipes for leaks/blockages",
];

const aboutStats = [
  { value: "£19", label: "Brochure plans from" },
  { value: "24/7", label: "Contract helpline support" },
  { value: "24hr", label: "Response target on call-outs" },
  { value: "£5m", label: "Public liability cover" },
];

const About = () => {
  return (
    <section className="about__one section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div
              className="about__one-area"
              data-aos-duration="800"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="about__one-left">
                <div className="about__one-left-image">
                  <Image
                    src="/cartoons/aaron_normal.jpg"
                    alt="Geo Gas team member illustration"
                    width={1045}
                    height={1863}
                    priority
                  />
                </div>
              </div>
              <div className="about__one-right">
                <span className="about__one-kicker">Home Service Contract Rescue</span>
                <h2>About GEO Gas Services</h2>
                <p>
                  GEO Gas Services London Ltd provides peace-of-mind home service
                  contracts designed to reduce heating and plumbing emergencies for
                  households and landlords.
                </p>
                <p>
                  As stated in the company brochure: avoid the hassle and unexpected
                  central heating breakdowns with GEO Gas by your side.
                </p>
                <p className="about__one-founder">Aaron Stewart, CEO & Founder</p>
                <blockquote>
                  Whichever GEO GAS home contract you choose, you can rest assured that
                  our service contract will look after you and your home.
                </blockquote>
                <div className="about__one-right-stats">
                  {aboutStats.map((stat) => (
                    <div key={stat.value + stat.label} className="about__one-right-stat">
                      <h4>{stat.value}</h4>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
                <div className="about__one-right-actions">
                  <Link className="button-1" href="/contracts">
                    View Contract Options
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                  <Link
                    className="button-2"
                    href="/info/geo-gas-brochure-2026.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Brochure
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-7 lg-mb-30">
            <div className="about__one-benefits">
              <h3>Why Customers Choose GEO Gas</h3>
              <div className="about__one-benefits-grid">
                {keyBenefits.map((benefit) => (
                  <div key={benefit} className="about__one-benefits-item">
                    <i className="fa-solid fa-check"></i>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="about__one-packages">
              <h3>Coverage Snapshot</h3>
              <div className="about__one-packages-item">
                <h4>GEO Starter</h4>
                <ul>
                  {starterCoverage.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-fire-flame-curved"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="about__one-packages-item">
                <h4>GEO Complete Adds</h4>
                <ul>
                  {completeAddons.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-plus"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-40">
          <div className="col-xl-12">
            <div className="about__one-reputation">
              <div className="about__one-reputation-image">
                <Image
                  src="/info/brochure-pages/page-7.jpg"
                  alt="GEO Gas brochure page showing 5 star reputation and contacts"
                  width={542}
                  height={768}
                />
              </div>
              <div className="about__one-reputation-content">
                <h3>Proud Of A 5 Star Reputation</h3>
                <p>
                  The brochure highlights GEO Gas customer feedback across
                  Checkatrade, Trustpilot and Google Reviews, backed by Gas Safe
                  registration and dedicated contract support lines.
                </p>
                <div className="about__one-reputation-badges">
                  <span>Checkatrade</span>
                  <span>Trustpilot</span>
                  <span>Google Reviews</span>
                  <span>Gas Safe Registered</span>
                </div>
                <ul>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <a href="tel:02077232221">0207 7232221 (London)</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <a href="tel:01444715618">01444 715618 (Sussex)</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-phone"></i>
                    <a href="tel:07854451941">07854 451941 (24/7)</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:info@geogasservices.uk">info@geogasservices.uk</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-globe"></i>
                    <a
                      href="https://www.geogasservices.uk"
                      target="_blank"
                      rel="noreferrer"
                    >
                      www.geogasservices.uk
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
