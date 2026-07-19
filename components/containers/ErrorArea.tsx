import Link from "next/link";

const ErrorArea = () => {
  return (
    <div className="error section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="error-page">
              <h1>
                4<span>0</span>4
              </h1>
              <h2>Oops, looks like the page is lost..</h2>
              <Link className="button-5" href="/">
                <i className="fa-regular fa-arrow-left"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorArea;
