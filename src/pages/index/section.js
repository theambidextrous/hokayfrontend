import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";

//Import Image
import heroBgImg from "../../assets/images/hero-job-illustration.png";

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.callModal.bind(this);
  }

  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
    return null;
    return (
      <React.Fragment>
        {/* HERO START */}
        <section className="hero-6-bg hero-6-bg-cstm smaller-f position-relative" id="home">
          <Container>
            <Row className="justify-content-center">
              {/* <Col lg={6}>
                <div className="text-left hero-6-content">
                <br></br>
                <br></br>
                  <h1 className="text-white hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    Post a job and reach over <br></br>1.2 million people
                  </h1>
                  <br></br>
                  <br></br>
                </div>
              </Col>
              <div className="col-lg-6">

              </div> */}
            </Row>
          </Container>
        </section>

        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default Section;

