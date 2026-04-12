import Image from "next/image";

const ComicStripSection = () => {
  return (
    <section className="comic-strip section-padding pt-0">
      <div className="container">
        <div className="comic-strip__shell">
          <div className="comic-strip__header" data-aos="fade-up" data-aos-duration="800">
            <span className="comic-strip__eyebrow">Superhero Team 24-Hour Call-Out</span>
            <h2>Geo Gas Superhero Team: 24-Hour Call-Out in Action</h2>
            <p>
              Our team is on call 24 hours a day, ready to respond quickly, work safely on-site
              and get your boiler, gas or plumbing problem under control.
            </p>
          </div>

          <div
            className="comic-strip__frame comic-strip__frame--desktop"
            data-aos="zoom-in-up"
            data-aos-duration="900"
            data-aos-delay="120"
          >
            <Image
              src="/cartoons/comics/comic-crew-flight-battle-landing-sequence.png"
              alt="Geo Gas crew response storyboard showing flight, battle and landing sequence"
              fill
              sizes="(max-width: 991px) 100vw, 1180px"
              className="comic-strip__image"
            />
          </div>

          <div
            className="comic-strip__frame comic-strip__frame--mobile"
            data-aos="zoom-in-up"
            data-aos-duration="900"
            data-aos-delay="120"
          >
            <Image
              src="/cartoons/comics/comic-story-page-team-rescue-panels-v3.png"
              alt="Geo Gas team rescue storyboard panels"
              fill
              sizes="100vw"
              className="comic-strip__image"
            />
          </div>

          <div className="comic-strip__tags" data-aos="fade-up" data-aos-duration="800" data-aos-delay="180">
            <span>24/7 Emergency Response</span>
            <span>Local Repair Team</span>
            <span>Boiler, Gas & Plumbing</span>
            <span>London Call-Out Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComicStripSection;
