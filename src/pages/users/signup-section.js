import React, { Component } from "react";

import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/RingLoader'
//Import countries
import { addUser } from "../../api/api";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoading: false,
      isFormError: false,
      isCreatedUser: false,
      isValidName: true,
      isValidEmail: true,
      isValidCompany: true,
      isValidPhone: true,
      isValidPassword: true,
      isValidCpassword: true,
      name:'',
      company:'',
      email:'',
      phone:'',
      password:'',
      cpassword:'',
      hasNews:false,
    };
    this.callModal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCpasswordChange = this.handleCpasswordChange.bind(this);
    this.handleHasNewsChange = this.handleHasNewsChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    const v = event.target.value;
    if ( v.length >= 5)
    {
      this.setState({...this.state, name: v, isValidName: true});
    }
    else
    {
      this.setState({...this.state, name: v, isValidName: false});
    }
  }
  handleCompanyChange(event) {
    const v = event.target.value;
    this.setState({...this.state, company: v, isValidCompany: true});
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
  handlePhoneChange(event) {
    const v = event.target.value;
    if ( v.length >= 10 )
    {
      this.setState({...this.state, phone: v, isValidPhone: true});
    }
    else
    {
      this.setState({...this.state, phone: v, isValidPhone: false});
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
  handleCpasswordChange(event) {
    const v = event.target.value;
    if ( v.length === this.state.password.length)
    {
      this.setState({...this.state, cpassword: v, isValidCpassword: true});
    }
    else
    {
      this.setState({...this.state, cpassword: v, isValidCpassword: false});
    }
  }
  handleHasNewsChange(event) {
    const c = event.target.checked;
    if( c )
    {
      this.setState({...this.state, hasNews: true});
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
      this.state.isValidName &&
      this.state.isValidCompany &&
      this.state.isValidEmail && 
      this.state.isValidPassword && 
      this.state.isValidCpassword &&
      this.state.isValidPhone
    )
    {
        let postData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            company: this.state.company,
            password: this.state.password,
            c_password: this.state.cpassword,
            has_news: this.state.hasNews,
        }
        addUser(postData)
        .then( (res) => {
            if ( res.status === 200 )
            {
              localStorage.setItem('robot', JSON.stringify(res.payload));
              this.setState({...this.state, isLoading: false, isFormError: false, isCreatedUser: true, resMessage: res.message});
              this.forceUpdate();
              // console.log(res.payload);
            }
            else
            {
                this.setState({...this.state, isLoading: false, isFormError: true, isCreatedUser: false, resMessage: res.message});
            }
        })
        .catch( (error) => {
            this.setState({...this.state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: error });
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
    return (
      <React.Fragment>
        {/* PRELOAD START */}
        <section className="hero-6-bg smaller-mid position-relative" id="home">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="text-center hero-6-content">
                <h1 className="text-dark hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    Sign Up
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
                            Full Name*
                        </label>
                        <input placeholder="Jane Doe" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.name} onChange={this.handleNameChange} />
                        { this.state.isValidName === false && (
                            <small className="error-custom">enter valid name</small>
                        )}
                        </div>
                    </Col>
                    <Col lg={5}>
                      <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                            Company(optional)
                        </label>
                        <input placeholder="" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.company} onChange={this.handleCompanyChange} />
                        { this.state.isValidCompany === false && (
                            <small className="error-custom">enter valid company name</small>
                        )}
                        </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg={5}>
                        <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                            Email Address*
                        </label>
                        <input placeholder="jane.doe@hotmail.com" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.email} onChange={this.handleEmailChange} />
                        { this.state.isValidEmail === false && (
                            <small className="error-custom">enter valid email address</small>
                        )}
                        </div>
                    </Col>
                    <Col lg={5}>
                    <div className="form-group mb-4">
                        <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                            Phone Number*
                        </label>
                        <input placeholder="" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.phone} onChange={this.handlePhoneChange} />
                        { this.state.isValidPhone === false && (
                            <small className="error-custom">enter valid phone number</small>
                        )}
                        </div>
                    </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col lg={5}>
                          <div className="form-group mb-4">
                          <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                              Password*
                          </label>
                          <input placeholder="" type="password" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.password} onChange={this.handlePasswordChange} />
                          { this.state.isValidPassword === false && (
                              <small className="error-custom">enter at least 8 characters</small>
                          )}
                          </div>
                      </Col>
                      <Col lg={5}>
                        <div className="form-group mb-4">
                          <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                              Confirm Password*
                          </label>
                          <input type="password" placeholder="" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.cpassword} onChange={this.handleCpasswordChange} />
                          { this.state.isValidCpassword === false && (
                              <small className="error-custom">Passwords do not match</small>
                          )}
                          </div>
                      </Col>
                      <Col lg={10}>
                          <div className="form-group mb-4">
                          <label htmlFor="exampleFormControlInput1" className="text-muted f-15">
                              Notifications*
                          </label>
                          <FormGroup tag="fieldset">
                              <FormGroup check>
                              <Label check className="radio-custom-left">
                                  <Input onChange={this.handleHasNewsChange} name="hasnews" defaultChecked value="1" type="radio" />{' '}
                                  I want to receive job alerts
                              </Label>
                              <Label check>
                                  <Input onChange={this.handleHasNewsChange} name="hasnews" value="0" type="radio" />{' '}
                                  I do not want to receive job alerts
                              </Label>
                              </FormGroup>
                          </FormGroup>
                          </div>
                      </Col>
                      <Col lg={5}>
                      <button
                        type="submit"
                        className="btn btn-purple btn-block btn-sm btn-ios "
                      >
                        Sign Up
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

