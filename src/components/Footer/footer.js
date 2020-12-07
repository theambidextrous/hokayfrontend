import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Import Footer link
import FooterLinks from "./footer-links";

//Import Images
import footerlogo from "../../assets/images/logo-dark.png";

class Footer extends Component {
  state = {
    footerItems: [
      {
        title: "Services",
        links: [
          { linkTitle: "Job listing", link: "/" },
          { linkTitle: "Affiliate marketing", link: "#" },
          { linkTitle: "Resumes", link: "#" },
        ],
      },
      {
        title: "healtHire",
        links: [
          { linkTitle: "About", link: "#" },
          { linkTitle: "Support", link: "#" },
          { linkTitle: "Contacts", link: "#" },
        ],
      },
      {
        title: "Learn More",
        links: [
          { linkTitle: "Terms of Service", link: "#" },
          { linkTitle: "Privacy Policy", link: "#" },
          { linkTitle: "How it works", link: "#" },
        ],
      },
    ],
    socialIcons: [
      { icon: "remixicon-facebook-line", iconLink: "https://facebook.com" },
      { icon: "remixicon-twitter-line", iconLink: "https://twitter.com" },
      { icon: "remixicon-instagram-line", iconLink: "https://instagram.com" },
    ],
  };

  render() {
    return (
      <React.Fragment>
        {/* FOOTER START  */}
        <footer className="pt-5 pb-4 position-relative bg-light">
          <Container className="container">
            <Row>
              <Col lg={3}>
                <div className="footer-about-content mt-4">
                  <img
                    src={footerlogo}
                    alt="footerLogo"
                    className="img-fluid"
                  />
                  <p className="mt-4 text-muted f-15">
                  We believe that having a single place where your job can reach the right audience in no time is very important to your business.
                  </p>
                  <ul className="list-inline footer-icon mt-4">
                    {this.state.socialIcons.map((item, key) => (
                      <li className="list-inline-item h4 mr-4" key={key}>
                        <Link target="_blank" to={{pathname:item.iconLink}} className="text-purple">
                          <i className={item.icon} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col lg={8} className="offset-lg-1">
                <div className="row">
                  {this.state.footerItems.map((item, key) => (
                    <div className="col-md-4" key={key}>
                      <div className="mt-4">
                        <h5 className="text-dark footer-title font-weight-medium mb-4">
                          {item.title}
                        </h5>
                        <ul className="list-unstyled footer-sub-menu">
                          {item.links.map((fLink, key) => (
                            <li className="f-15 mt-3 mb-3" key={key}>
                              <Link to={fLink.link} className="text-muted">
                                {fLink.linkTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
            <FooterLinks />
          </Container>
        </footer>

        {/* FOOTER END  */}
      </React.Fragment>
    );
  }
}

export default Footer;
