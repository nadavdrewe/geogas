import Link from "next/link";
import Image from "next/image";
import BlogCommentForm from "@/components/forms/BlogCommentForm";
import one from "@/public/img/blog/blog-7.jpg";
import two from "@/public/img/blog/details.jpg";
import three from "@/public/img/avatar/avatar-1.jpg";
import four from "@/public/img/blog/blog-1.jpg";
import five from "@/public/img/blog/blog-2.jpg";
import six from "@/public/img/blog/blog-3.jpg";

const BlogDetails = () => {
  return (
    <div className="blog__details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 lg-mb-50">
            <div className="blog__details-left">
              <div className="blog__details-left-image mb-30">
                <div className="parallax-image-wrap">
                  <div className="parallax-image-inner">
                    <Image
                      className="img__full parallax-image"
                      src={one}
                      alt="blog-details-image"
                    />
                  </div>
                </div>
                <div className="meta">
                  <ul>
                    <li>
                      <Link href="/">
                        <i className="fas fa-user"></i>Admin
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <i className="fas fa-calendar-alt"></i>October 19, 2024
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <h2 className="mb-20">Your Plumbing Solutions</h2>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters, and
                drainage systems the ensuring proper functioning and water flow.
                Plumbers use specialized
              </p>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <div className="blog__details-left-box">
                <i className="fa-sharp fa-solid fa-ditto"></i>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain plumbing systems in residential and commercial
                  Plumbers provide essential services to install, repair, and
                  maintain plumbing systems in residential and commercial
                  properties. They an work on pipes, fixtures, water
                  heatersproperties. They work on pipes, fixtures, water heaters
                </p>
                <h5>Albert Flores</h5>
                <span>Marketing Coordinator</span>
              </div>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <h4 className="mb-20 mt-25">Your Experience</h4>
              <div className="row">
                <div className="col-md-6">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Precision
                      Plumbing for Your Peace of Mind
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>The Flow
                      Masters Where Quality Meets
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="list">
                    <p>
                      <i className="fa-solid fa-square-check"></i>Piping Hot
                      Service Every Time
                    </p>
                    <p>
                      <i className="fa-solid fa-square-check"></i>Trust Your Tap
                      to Us Flawless Plumbing
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mb-30 mt-20">
                <div className="parallax-image-wrap">
                  <div className="parallax-image-inner">
                    <Image
                      className="img__full parallax-image"
                      src={two}
                      alt="blog-image"
                      priority
                    />
                  </div>
                </div>
              </div>
              <p>
                Plumbers provide essential services to install, repair, and
                maintain plumbing systems in residential and commercial
                properties. They work on pipes, fixtures, water heaters
              </p>
              <div className="blog__details-left-tag">
                <h3>Tags :</h3>
                <div className="all__sidebar-item-tag">
                  <ul>
                    <li>
                      <Link href="/blog-details">Solutions</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Pipeline Pros</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Plumbing</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Aqua Care</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="navigation">
                <Link href="/blog-details">
                  <i className="fa-regular fa-arrow-left"></i>
                  <h5>Previous</h5>
                </Link>
                <Link href="/blog-details">
                  <i className="fa-regular fa-arrow-right"></i>
                  <h5>Next</h5>
                </Link>
              </div>
              <div className="blog__details-left-comment mt-60">
                <h3 className="mb-30">1 Comment</h3>
                <div className="blog__details-left-comment-item">
                  <div className="blog__details-left-comment-item-comment">
                    <div className="blog__details-left-comment-item-comment-image">
                      <Image src={three} alt="avaatar-image" />
                    </div>
                    <div className="blog__details-left-comment-item-comment-content">
                      <h6>
                        Guy Hawkins
                        <Link href="/blog-details">
                          <i className="far fa-reply-all"></i>Reply
                        </Link>
                      </h6>
                      <span>20 Dec, 2024 At 9:PM</span>
                      <p>
                        Pellentesque a placerat orci. Suspendisse rutrum lacus
                        ipsum, eu vulputate augue blandit mollis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blog__details-left-contact mt-60">
                <h3 className="mb-30">Sent A message</h3>
                <div className="blog__details-left-contact-form">
                  <BlogCommentForm />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="all__sidebar">
              <div className="all__sidebar-item">
                <h4>Search Here</h4>
                <div className="all__sidebar-item-search">
                  <form action="/search" method="get">
                    <input
                      type="text"
                      name="q"
                      placeholder="Search....."
                      required
                    />
                    <button type="submit">
                      <i className="fal fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div className="all__sidebar-item">
                <h4>Recent News</h4>
                <div className="all__sidebar-item-post dark_image">
                  <div className="post__item">
                    <div className="post__item-image">
                      <Link href="/blog-details">
                        <Image src={four} alt="post-image" />
                      </Link>
                    </div>
                    <div className="post__item-title">
                      <span>
                        <i className="far fa-calendar-alt"></i>Dec 31, 2024
                      </span>
                      <h6>
                        <Link href="/blog-details">
                          Top-Notch Handyman and Plumbing
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="post__item">
                    <div className="post__item-image">
                      <Link href="/blog-details">
                        <Image src={five} alt="post-image" />
                      </Link>
                    </div>
                    <div className="post__item-title">
                      <span>
                        <i className="far fa-calendar-alt"></i>Dec 27, 2024
                      </span>
                      <h6>
                        <Link href="/blog-details">
                          Plumbing pros you can trust Quality work
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="post__item">
                    <div className="post__item-image">
                      <Link href="/blog-details">
                        <Image src={six} alt="post-image" />
                      </Link>
                    </div>
                    <div className="post__item-title">
                      <span>
                        <i className="far fa-calendar-alt"></i>Dec 23, 2024
                      </span>
                      <h6>
                        <Link href="/blog-details">
                          Plumbing pros you can trust Quality work.
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all__sidebar-item">
                <h4>Category</h4>
                <div className="all__sidebar-item-category">
                  <ul>
                    <li>
                      <Link href="/blog-details">
                        Drip Detectives<span>04</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        Leak Stop Specialists<span>08</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        Pipe Dream Team<span>03</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        Rapid Repair Squad<span>06</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        Prime Plumb Professionals<span>05</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="all__sidebar-item">
                <h4>Tags</h4>
                <div className="all__sidebar-item-tag">
                  <ul>
                    <li>
                      <Link href="/blog-details">Solutions</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Pipeline Pros</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Plumbing</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Aqua Care</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Plumbers</Link>
                    </li>
                    <li>
                      <Link href="/blog-details">Dream Team</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
