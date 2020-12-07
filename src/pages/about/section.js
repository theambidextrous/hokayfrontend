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
                    About Us
                  </h1>
                  <p className="text-muted w-10 mx-auto mb-5">
                  HealtHire is an award-winning HealthCare job listing website.<br/>
                  You’ll find the all top Jobs In HealthCare on HealtHire.com, with 100% free access to job seekers and employers. <br/> Our approach to hiring is unique. We choose to show you what you need at a glance. <br/> Our features include pinned job ads, ordered by age and an on-demand search tool.
                  </p>
                </div>
              </Col>
              <div className="col-lg-6">
                <img src={heroBgImg} alt="heroBgImg" className="img-fluid mx-auto d-block img-custom"/>
              </div>
            </Row>
          </Container>
        </section>

        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default withRouter(Section);

