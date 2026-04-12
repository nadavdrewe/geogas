import { SeoReview } from "@/lib/seo/types";

type SeoReviewsBlockProps = {
  reviews: SeoReview[];
};

const SeoReviewsBlock = ({ reviews }: SeoReviewsBlockProps) => {
  if (!reviews.length) {
    return null;
  }

  return (
    <section className="seo-page__card">
      <h2>What customers say</h2>
      <div className="seo-page__review-grid">
        {reviews.map((review) => (
          <article key={`${review.name}-${review.quote}`} className="seo-page__review">
            <p>&ldquo;{review.quote}&rdquo;</p>
            <strong>{review.name}</strong>
            {review.location ? <span>{review.location}</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default SeoReviewsBlock;
