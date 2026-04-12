import { SeoFaqItem } from "@/lib/seo/types";

type SeoFaqBlockProps = {
  faq: SeoFaqItem[];
};

const SeoFaqBlock = ({ faq }: SeoFaqBlockProps) => {
  return (
    <section className="seo-page__card">
      <h2>Frequently asked questions</h2>
      <div className="seo-page__faq-list">
        {faq.map((item) => (
          <article key={item.question} className="seo-page__faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SeoFaqBlock;

