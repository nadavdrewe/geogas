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
              <p>The page may have moved. Search the site or use the links below to find what you need.</p>
              <form className="error-page__search" action="/search" method="get" role="search">
                <label htmlFor="missing-page-search">Search Geo Gas</label>
                <div>
                  <input id="missing-page-search" type="search" name="q" placeholder="Try boiler repair or pricing" required />
                  <button className="button-1" type="submit">Search</button>
                </div>
              </form>
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
