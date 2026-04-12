"use client";

import NewsletterSubscribeForm from "@/components/forms/NewsletterSubscribeForm";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

const SubscribeArea = () => {
  const { content } = useSiteContent();
  const subscribe = content.home.subscribe;

  return (
    <div className="subscribe__two">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-7 lg-mb-20">
            <div className="subscribe__two-title lg-t-center">
              <h1>{subscribe.heading}</h1>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="subscribe__two-form">
              <NewsletterSubscribeForm
                placeholder={subscribe.emailPlaceholder}
                buttonLabel={subscribe.buttonLabel}
                source="home-subscribe-form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeArea;
