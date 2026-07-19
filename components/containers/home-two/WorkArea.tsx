import Image from "next/image";
import Counter from "../Counter";
import work from "@/public/img/pages/work.png";
import one from "@/public/img/icon/work-1.svg";
import two from "@/public/img/icon/work-2.svg";
import three from "@/public/img/icon/work-3.svg";
import four from "@/public/img/icon/work-4.svg";

const WorkArea = () => {
  return (
    <div className="work__area section-padding">
      <div className="container">
        <div className="row ai-center">
          <div className="col-xl-7 xl-mb-30 ">
            <div className="work__area-left">
              <div className="work__area-content">
                <h2>
                  We Have A Great Achievement Working
                </h2>
                <p>
                  Disciple elite, sed quin non kumquat emus midi temporal
                  incident ut labor et dolor inure reprehend qui in ea
                  voluptuary elite sees qualm nihil
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="work__area-list-item">
                    <div className="icon">
                      <Image src={one} alt="icon" priority />
                    </div>
                    <div className="content">
                      <h3>
                        <span className="counter">
                          <Counter value={580} />
                        </span>
                      </h3>
                      <p>Successful Project</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="work__area-list-item">
                    <div className="icon">
                      <Image src={two} alt="icon" priority />
                    </div>
                    <div className="content">
                      <h3>
                        <span className="counter">
                          <Counter value={780} />
                        </span>
                      </h3>
                      <p>Satisfied Customer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="work__area-list-item">
                    <div className="icon">
                      <Image src={three} alt="icon" priority />
                    </div>
                    <div className="content">
                      <h3>
                        <span className="counter">
                          <Counter value={534} />
                        </span>
                      </h3>
                      <p>Customer Review</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="work__area-list-item">
                    <div className="icon">
                      <Image src={four} alt="icon" priority />
                    </div>
                    <div className="content">
                      <h3>
                        <span className="counter">
                          <Counter value={100} />
                        </span>
                      </h3>
                      <p>Award Winning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 xl-t-center "
            data-aos-duration="800"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <Image src={work} alt="image" priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkArea;
