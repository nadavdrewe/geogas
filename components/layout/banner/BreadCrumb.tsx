import Link from "next/link";

interface BreadCrumbProps {
  title: string;
}

const BreadCrumb = ({ title }: BreadCrumbProps) => {
  return (
    <div className="breadcrumb__area">
      <div className="container">
        <div className="row ai-center">
          <div className="col-lg-6">
            <div className="breadcrumb__area-title">
              <h1>{title}</h1>
            </div>
          </div>
          <div className="col-lg-6 lg-mt-20">
            <div className="breadcrumb__area-meta t-right lg-t-left">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                  <i className="fa-regular fa-angle-right"></i>
                </li>
                <li>{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
