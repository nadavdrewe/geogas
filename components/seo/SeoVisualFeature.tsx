import Image from "next/image";
import { SeoVisualAsset } from "@/lib/seo/types";

type SeoVisualFeatureProps = {
  image: SeoVisualAsset;
};

const SeoVisualFeature = ({ image }: SeoVisualFeatureProps) => {
  return (
    <section className="seo-page__visual-feature">
      <div className="seo-page__visual-feature-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 991px) calc(100vw - 48px), 860px"
        />
      </div>
      <div className="seo-page__visual-feature-copy">
        {image.label ? <span>{image.label}</span> : null}
        {image.title ? <h2>{image.title}</h2> : null}
        {image.description ? <p>{image.description}</p> : null}
      </div>
    </section>
  );
};

export default SeoVisualFeature;
