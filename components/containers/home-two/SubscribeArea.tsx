import NewsletterSubscribeForm from "@/components/forms/NewsletterSubscribeForm";

const SubscribeArea = () => {
  return (
    <div className="subscribe__area">
      <div className="container">
        <div className="row jc-center">
          <div className="col-lg-8 col-md-12">
            <div className="subscribe__area-title">
              <h2>Subscribe To Our New Newsletter</h2>
            </div>
            <div className="subscribe__area-form">
              <NewsletterSubscribeForm
                placeholder="Email Address"
                buttonLabel="Subscribe"
                source="home-two-subscribe-form"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribeArea;
