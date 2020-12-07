import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/RingLoader'
//Import countries
import { loginUser } from "../../api/api";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      isFormError: false,
      isLoggedUser: false,
      isValidEmail: true,
      isValidPassword: true,
      email:'',
      password:'',
    };
    this.callModal.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }
  handleRedirect()
  {
    // browserHistory.push("/users/profile");
  }
  handleEmailChange(event) {
    const v = event.target.value;
    if ( this.validateEmail(v) )
    {
      this.setState({...this.state, email: v, isValidEmail: true});
    }
    else
    {
      this.setState({...this.state, email: v, isValidEmail: false});
    }
  }
  handlePasswordChange(event) {
    const v = event.target.value;
    if ( v.length >= 8)
    {
      this.setState({...this.state, password: v, isValidPassword: true});
    }
    else
    {
      this.setState({...this.state, password: v, isValidPassword: false});
    }
  }
  validateEmail(email) 
  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  handleSubmit(event) {
    this.setState({...this.state, isLoading: true});
    if( 
      this.state.isValidEmail && 
      this.state.isValidPassword
    )
    {
        let postData = {
            email: this.state.email,
            password: this.state.password,
        }
        loginUser(postData)
        .then( (res) => {
            if ( res.status === 200 )
            {
              localStorage.setItem('robot', JSON.stringify(res.payload));
              this.setState({...this.state, isLoading: false, isFormError: false, isLoggedUser: true, resMessage: res.message});
              this.forceUpdate();
              this.handleRedirect();
              // console.log(res.payload);
            }
            else
            {
                this.setState({...this.state, isLoading: false, isFormError: true, isLoggedUser: false, resMessage: res.message});
            }
        })
        .catch( (error) => {
            this.setState({...this.state, isLoading: false, isFormError: true, isLoggedUser: false, resMessage: error });
        });
        // console.log(this.state);
        event.preventDefault();
    }
    else 
    {
        this.setState({...this.state, isFormError: true});
        this.setState({...this.state, isLoading: false});
    }
    
  }

  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
    if( this.state.isLoggedUser )
    {
      return <Redirect to='/users/profile' />;
    }
    return (
      <React.Fragment>
        {/* PRELOAD START */}
        <section className="hero-6-bg smaller-mid position-relative" id="home">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="text-center hero-6-content">
                <h1 className="text-dark hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    Sign In
                </h1>
                { this.state.isFormError === true && (
                    <h3 className="error-custom">{this.state.resMessage}</h3>
                )}
                { this.state.isCreatedUser === true && (
                    <h3 className="alert alert-success">{this.state.resMessage}</h3>
                )}
                <form className="registration-form" onSubmit={this.handleSubmit}>
                <LoadingOverlay
                active={this.state.isLoading}
                spinner={<BounceLoader />}
                >
                </LoadingOverlay>
                <Row className="justify-content-center">
                    <Col lg={5}>
                        <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                            Email Address*
                        </label>
                        <input placeholder="" type="email" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.email} onChange={this.handleEmailChange} />
                        { this.state.isValidEmail === false && (
                            <small className="error-custom">enter valid email</small>
                        )}
                        </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={5}>
                      <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                            Password
                        </label>
                        <input placeholder="" type="password" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.password} onChange={this.handlePasswordChange} />
                        { this.state.isValidPassword === false && (
                            <small className="error-custom">enter a min of 8 characters</small>
                        )}
                        </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={5}>
                    <button
                      type="submit"
                      className="btn btn-purple btn-block btn-sm btn-ios "
                    >
                      Sign In
                    </button>
                    </Col>
                  </Row>
                </form>
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

