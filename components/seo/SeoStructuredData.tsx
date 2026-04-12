type SeoStructuredDataProps = {
  items: unknown[];
};

const SeoStructuredData = ({ items }: SeoStructuredDataProps) => {
  return items.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
};

export default SeoStructuredData;

