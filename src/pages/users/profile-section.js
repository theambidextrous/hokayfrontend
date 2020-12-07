import React, { Component } from "react";

import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/RingLoader'

import { loginUser } from "../../api/api";
//Import Client images
import client1 from "../../assets/images/client/avatar.png";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      hasRobot: true,
      robot:{},
    };
    this.callModal.bind(this);
    this.handleSession = this.handleSession.bind(this);
  }
  handleSession()
  {
    const robot = JSON.parse(localStorage.getItem("robot"));
    this.setState({...this.state, robot: robot });
    // console.log(robot);
    if( !robot )
    {
      this.setState({...this.state, hasRobot: false, robot: {}});
      this.forceUpdate();
    }
  }
  callModal = () => {
    this.refs.child.openModal();
  };
  componentDidMount() {
    this.handleSession();
  }
  render() {
    if( !this.state.hasRobot )
    {
      return <Redirect to='/users/returning' />;
    }
    return (
      <React.Fragment>
        {/* PRELOAD START */}
        <section className="hero-6-bg smaller-prof position-relative" id="home">
          <Container>
            <Row className="justify-content-center">
              <Col lg={4}>
                <div className="item">
                  <div className="testi-content bg-white text-center m-3">
                    <img
                      src={client1}
                      alt="client"
                      className="img-fluid mx-auto d-block rounded-circle user-img img-prof"
                    />
                    <h5 className="text-dark mt-4 f-18 mb-0">{this.state.robot.name}</h5>
                    <p className="text-muted f-14">{this.state.robot.company}</p>
                    <hr></hr>
                    <small className="text-muted f-10 mt-1 mb-0">email</small>
                    <p className="text-primary f-15 mt-0 mb-0">
                      {this.state.robot.email}<sup><i className="remixicon-close-circle-fill h4 error-custom" /></sup>
                    </p>
                    <small className="text-muted f-10 mt-1 mb-0">phone</small>
                    <p className="text-default f-15 mt-0 mb-0">
                      {this.state.robot.phone}
                    </p>
                    <hr></hr>
                    <small className="text-muted f-10 mt-1 mb-0">You have not verified your email</small>
                    <p className="text-default f-15 mt-0 mb-0">
                        <button type="button" className="btn btn-warning btn-block btn-sm btn-ios">
                        Verify Now
                        </button>
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="item">
                  <div className="testi-content bg-white text-left m-3">
                    <h5 className="text-dark mt-4 f-18 mb-0">Notifications Opt In</h5>
                    <p className="text-muted f-14">{this.state.robot.company}</p>
                    <hr></hr>
                    
                  </div>
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

export default Section;
