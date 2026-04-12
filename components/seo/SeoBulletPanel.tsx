type SeoBulletPanelProps = {
  title: string;
  items: string[];
  tone?: "default" | "warning";
};

const SeoBulletPanel = ({
  title,
  items,
  tone = "default",
}: SeoBulletPanelProps) => {
  return (
    <section className={`seo-page__card seo-page__card--${tone}`}>
      <h2>{title}</h2>
      <ul className="seo-page__bullet-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default SeoBulletPanel;

