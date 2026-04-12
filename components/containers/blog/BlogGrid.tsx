import Link from "next/link";
import Image from "next/image";
import one from "@/public/img/blog/blog-1.jpg";
import two from "@/public/img/blog/blog-2.jpg";
import three from "@/public/img/blog/blog-3.jpg";
import four from "@/public/img/blog/blog-4.jpg";
import five from "@/public/img/blog/blog-5.jpg";
import six from "@/public/img/blog/blog-6.jpg";

const BlogGrid = () => {
  return (
    <div className="blog__two section-padding-three">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={one} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    How to Choose a Reliable Plumber Service
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={two} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    Best Tools Every Handyman Should Always Have
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={three} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    Top Handyman Tips for Quick Home Repairs
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={four} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    The Flow Masters Where Quality Meet Service
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={five} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    Piping Hot Service Every Time Flow Masters
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-md-6 "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <div className="blog__two-item topy-tilt">
              <div className="blog__two-item-image">
                <Image src={six} alt="blog-image" />
              </div>
              <div className="blog__two-item-content">
                <h5>
                  <Link className="mouseover" href="/blog-details">
                    Plumbing pros you can trust Quality work
                  </Link>
                </h5>
                <p>
                  Plumbers provide essential services to install, repair, and
                  maintain
                </p>
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
                  <Link className="mouseover" href="/blog-details">
                    <i className="fa-regular fa-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-60">
          <div className="col-xl-12">
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
        </div>
      </div>
    </div>
  );
};

export default BlogGrid;
