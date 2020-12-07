import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import {getJob} from "../../api/api";
import { withRouter, Link, } from 'react-router-dom'
//Import Image
import heroBgImg from "../../assets/images/hero-job-illustration.png";
//Import sharebuttons
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
  } from "react-share";

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      shareUrl:process.env.REACT_APP_DOMAIN,
    };
    this.callModal.bind(this);
  }
  componentDidMount() {
    const sharelink = this.state.shareUrl + this.props.location.pathname;
    this.setState({...this.state, shareUrl:sharelink});
  }
  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
    return (
      <React.Fragment>
        {/* HERO START */}
        <section className="hero-6-bg smaller-f position-relative" id="home">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="text-left hero-6-content">
                  <h1 className="text-dark hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    Support
                  </h1>
                  <p className="text-muted w-10 mx-auto mb-5">for support, business and cutomer service email us using email bellow</p>
                  <p className="text-purple w-10 mx-auto mb-5">support@healthire.com</p>
                </div>
              </Col>
              <div className="col-lg-6">
                <img src={heroBgImg} alt="heroBgImg" className="img-fluid mx-auto d-block img-custom"/>
              </div>
            </Row>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="text-left hero-6-content">
                  <h3 className="text-dark hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    FaQs
                  </h3>
                  <p className="text-muted w-10 mx-auto mb-5">no data found yet</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default withRouter(Section);

