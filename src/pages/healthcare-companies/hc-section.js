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
              <Col lg={6}>
                <div className="text-left hero-6-content">
                  {/* <p className="text-muted w-10 mx-auto mb-5">
                    We believe that having a single place where your job can reach the right audience in no time is very important to your business. We are here to better the healthcare industry in terms of human resource.
                  </p> */}
                </div>
              </Col>
              <div className="col-lg-6">

                {/* <img src={heroBgImg} alt="heroBgImg" className="img-fluid mx-auto d-block img-custom"/> */}
              </div>
            </Row>
          </Container>
        </section>

        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default Section;
