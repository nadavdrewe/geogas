import { SeoFaqItem } from "@/lib/seo/types";
import DisclosureList from "@/components/common/DisclosureList";

type SeoFaqBlockProps = {
  faq: SeoFaqItem[];
};

const SeoFaqBlock = ({ faq }: SeoFaqBlockProps) => {
  if (!faq.length) return null;
  return (
    <section id="page-faq" className="seo-page__card">
      <h2>Frequently asked questions</h2>
      <DisclosureList label="page questions" items={faq.map((item) => ({
        title: item.question,
        content: <p>{item.answer}</p>,
      }))} />
    </section>
  );
};

export default SeoFaqBlock;

