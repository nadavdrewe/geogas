import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/blog/blog-1.jpg";
import two from "@/public/img/blog/blog-2.jpg";
import three from "@/public/img/blog/blog-3.jpg";
import four from "@/public/img/blog/blog-7.jpg";
import five from "@/public/img/blog/blog-8.jpg";
import six from "@/public/img/blog/blog-9.jpg";

const BlogStandard = () => {
  return (
    <div className="blog__standard section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 lg-mb-50">
            <div className="blog__standard-item mb-50">
              <div className="blog__details-left-image">
                <Link href="/blog-details">
                  <div className="parallax-image-wrap">
                    <div className="parallax-image-inner">
                      <Image
                        className="img__full parallax-image"
                        src={one}
                        alt="blog-details-image"
                      />
                    </div>
                  </div>
                </Link>
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
              <div className="blog__standard-item-content">
                <h3>
                  <Link href="/blog-details">
                    How to Choose a Reliable Plumber Service
                  </Link>
                </h3>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain plumbing systems in residential and commercial
                  properties. They work on pipes, fixtures
                </p>
                <Link className="button-4" href="/blog-details">
                  Read More<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="blog__standard-item mb-50">
              <div className="blog__details-left-image">
                <Link href="/blog-details">
                  <div className="parallax-image-wrap">
                    <div className="parallax-image-inner">
                      <Image
                        className="img__full parallax-image"
                        src={two}
                        alt="blog-details-image"
                      />
                    </div>
                  </div>
                </Link>
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
              <div className="blog__standard-item-content">
                <h3>
                  <Link href="/blog-details">
                    Best Tools Every Handyman Should Always Have
                  </Link>
                </h3>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain plumbing systems in residential and commercial
                  properties. They work on pipes, fixtures
                </p>
                <Link className="button-4" href="/blog-details">
                  Read More<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="blog__standard-item mb-50">
              <div className="blog__details-left-image">
                <Link href="/blog-details">
                  <div className="parallax-image-wrap">
                    <div className="parallax-image-inner">
                      <Image
                        className="img__full parallax-image"
                        src={three}
                        alt="blog-details-image"
                      />
                    </div>
                  </div>
                </Link>
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
              <div className="blog__standard-item-content">
                <h3>
                  <Link href="/blog-details">
                    Top Handyman Tips for Quick Home Repairs
                  </Link>
                </h3>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain plumbing systems in residential and commercial
                  properties. They work on pipes, fixtures
                </p>
                <Link className="button-4" href="/blog-details">
                  Read More<i className="fa-regular fa-angle-right"></i>
                </Link>
              </div>
            </div>
            <div className="pagination jc-center">
              <ul>
                <li>
                  <Link className="active" href="/">
                    01
                  </Link>
                </li>
                <li>
                  <Link href="/">02</Link>
                </li>
                <li>
                  <Link href="/">
                    <i className="far fa-ellipsis-h"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/">05</Link>
                </li>
                <li>
                  <Link href="/">
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
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

export default BlogStandard;
