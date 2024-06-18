import "./AboutScreen.css";
const AboutScreen = () => {
  return (
    <>
      <div className="jumbotron">
        <div className="container-fluid">
          <div className="header-content-inner">
            <h1>Welcome to BIMI KITCHEN</h1>
            <h3>
              We are proud of our long history of making delicious meals, warm
              and friendly atmosphere and professional staff.
            </h3>
          </div>
        </div>
      </div>
      <div className="service">
        <div className="bg-service bg-section" id="service">
          <div className="container-fluid text-center">
            <h2>Services</h2>
            <div className="row service-round-3 slideanim">
              <div className="col-sm-4 text-center round">
                <div className="service-round b-party">
                  <i className="fa fa-4x fa fa-birthday-cake sr-icons"></i>
                </div>
                <h4>Birthday party</h4>
                <p>For more information please contact us.</p>
              </div>
              <div className="col-sm-4 text-center round">
                <div className="service-round wedding">
                  <i className="fa fa-4x fa fa-heart sr-icons"></i>
                </div>
                <h4>Wedding</h4>
                <p>For more information please contact us</p>
              </div>
              <div className="col-sm-4 text-center round">
                <div className="service-round b-dinner">
                  <i className="fa fa-4x fa fa-suitcase  sr-icons"></i>
                </div>
                <h4>Business dinner</h4>
                <p>For more information please contact us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="responsive-map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.138660465044!2d139.8506619764001!3d35.722808227687906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188f550c69026b%3A0x1c0a7ba250236a27!2s4-ch%C5%8Dme-37-7%20Nishishinkoiwa%2C%20Katsushika%20City%2C%20Tokyo%20124-0025!5e0!3m2!1sen!2sjp!4v1718736875723!5m2!1sen!2sjp"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default AboutScreen;
