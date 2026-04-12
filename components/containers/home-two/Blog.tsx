import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/blog/blog-1.jpg";
import two from "@/public/img/blog/blog-2.jpg";

const Blog = () => {
  return (
    <div className="blog__one section-padding pt-0">
      <div className="container">
        <div className="row mb-30 ai-end">
          <div className="col-lg-6 col-md-7 md-mb-20 md-t-center">
            <h2>Insights and Tips from Our Experts</h2>
          </div>
          <div
            className="col-lg-6 col-md-5 t-right md-t-center "
            data-aos-duration="800"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <Link className="button-3" href="/blog-grid">
              View more<i className="fa-regular fa-angle-right"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="blog__one-item">
              <div className="blog__one-item-thumb">
                <div className="blog__one-item-thumb-image">
                  <Image src={one} alt="blog-image" />
                </div>
              </div>
              <div className="blog__one-item-inner">
                <div className="blog__one-item-inner-content">
                  <h5>
                    <Link href="/blog-details">
                      Top-Notch Handyman and Plumbing
                    </Link>
                  </h5>
                  <ul>
                    <li>
                      <Link href="/blog-details">
                        <i className="fas fa-user"></i>Admin
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        <i className="fas fa-calendar-alt"></i>October 19, 2024
                      </Link>
                    </li>
                  </ul>
                  <p>
                    It is a long esta fact that reader will lilklklkl beik dis
                    the readable gjkglk content of
                  </p>
                  <Link className="button-4" href="/blog-details">
                    Read More<i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <div className="blog__one-item">
              <div className="blog__one-item-thumb">
                <div className="blog__one-item-thumb-image">
                  <Image src={two} alt="blog-image" />
                </div>
              </div>
              <div className="blog__one-item-inner">
                <div className="blog__one-item-inner-content">
                  <h5>
                    <Link href="/blog-details">
                      Plumbing pros you can trust Quality work
                    </Link>
                  </h5>
                  <ul>
                    <li>
                      <Link href="/blog-details">
                        <i className="fas fa-user"></i>Admin
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog-details">
                        <i className="fas fa-calendar-alt"></i>October 19, 2024
                      </Link>
                    </li>
                  </ul>
                  <p>
                    It is a long esta fact that reader will lilklklkl beik dis
                    the readable gjkglk content of
                  </p>
                  <Link className="button-4" href="/blog-details">
                    Read More<i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
