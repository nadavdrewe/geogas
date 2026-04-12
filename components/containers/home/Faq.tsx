"use client";
import { useState } from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

interface FaqProps {
  addClass?: boolean;
  fullPage?: boolean;
}

const Faq = ({ addClass = false, fullPage = false }: FaqProps) => {
  const [active, setActive] = useState(0);
  const { content } = useSiteContent();
  const faqContent = content.home.faq;

  return (
    <div
      className={
        (addClass ? "section-padding pt-0 " : "section-padding ") +
        "faq__two" +
        (fullPage ? " faq__two--page" : "")
      }
    >
      <div className="container">
        <div className="row ai-center">
          <div className="col-lg-5 lg-mb-30 ">
            <div className="faq__two-image">
              <div className="parallax-image-wrap">
                <div className="parallax-image-inner">
                  <Image
                    src={faqContent.imagePath}
                    alt={faqContent.imageAlt}
                    className="parallax-image"
                    width={680}
                    height={980}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="faq__two-right">
              <div className="faq__two-right-title">
                <h2>{faqContent.title}</h2>
                <p data-aos-duration="800" data-aos="fade-up" data-aos-delay="600">
                  {faqContent.description}
                </p>
                {!fullPage && (
                  <span className="faq__two-right-scroll-note">
                    Scroll to browse all FAQs
                  </span>
                )}
              </div>
              <div
                className={
                  "faq__two-right-accordion" +
                  (fullPage ? " faq__two-right-accordion--full" : "")
                }
                data-aos-duration="800"
                data-aos="fade-up"
                data-aos-delay="900"
                id="accordionExample"
              >
                {faqContent.items.map((item, index) => {
                  const collapseId = `collapseFaq${index + 1}`;
                  const itemAnchorId = `faq-item-${item.number}`;
                  return (
                    <div key={collapseId} className="faq__area-item" id={itemAnchorId}>
                      <h5
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        className={(active == index ? "  " : " collapsed") + " icon"}
                        onClick={() => setActive(active === index ? -1 : index)}
                      >
                        <span>{item.number}</span>
                        {item.question}
                      </h5>
                      <div
                        id={collapseId}
                        data-bs-parent="#accordionExample"
                        className={`faq__area-item-body collapse${
                          active === index ? " show " : ""
                        }`}
                      >
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
