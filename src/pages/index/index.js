import React, { Component } from "react";
import NavbarPage from "../../components/Navbar/Navbar_Page";
import { Container, Row, Col, FormGroup, Label, Input, FormText, Form, } from "reactstrap";
import Section from "./section";
import Services from "../../components/Services/services";
import Footer from "../../components/Footer/footer";
import StickyFooter from 'react-sticky-footer';
import footerlogo from "../../assets/images/logo-dark.png";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/DotLoader'
import Modal from 'react-modal';
import {Helmet} from "react-helmet";


import { subscribeAlert } from "../../api/api";
class Index6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: "",
      isLoading: false,
      isFormError: false,
      isCreatedJob: false,
      showModal:false,
      resMessage: 'Enter valid email',
      email:'',
      period:1,
      isValidMail:false,
      showFooter:true,
    };
    this.isValidEmailAddress = this.isValidEmailAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePeriodChange = this.handlePeriodChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.closeMessageModal = this.closeMessageModal.bind(this);
  }

  componentDidMount() {
    // console.log('path', window.location.pathname);
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;

    if (scrollup > this.state.pos) {
      this.setState({ navClass: "darkheader", imglight: false });
    } else if (window.innerWidth <= 768) {
      this.setState({ navClass: "darkheader", imglight: false });
    } else {
      this.setState({ navClass: "", imglight: false });
    }
  };
  isValidEmailAddress(email) {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }
    return false;
  }
  handleEmailChange(event){
    const v = event.target.value;
    if ( this.isValidEmailAddress(v) )
    {
      this.setState({...this.state, email: v, isValidMail: true});
    }
    else 
    {
      this.setState({...this.state, email: v, isValidMail: false});
    }
  }
  handlePeriodChange(event){
    const v = event.target.value;
    this.setState({...this.state, period: v,});
  }
  closeMessageModal() {
    this.setState({...this.state, showModal:false});
  }
  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    // return;
    this.setState({...this.state, isLoading: true});
    if( this.state.isValidMail)
    {
        let postData = {
          'email': this.state.email,
          'period': this.state.period,
        };
        subscribeAlert(postData)
        .then( (res) => {
            console.log(res);
            if ( res.status === 200 )
            {
                this.setState({...this.state, isLoading: false, isCreatedJob:true, showModal:true, resMessage: res.message});
                return;
            }
            else
            {
                this.setState({...this.state, isLoading: false, isFormError:true, resMessage: res.message, showModal:true});
                return;
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({...this.state, isLoading: false});
        });
    }
    else 
    {
        this.setState({...this.state,isLoading: false, isFormError:true, showModal:true});
        return;
        // this.setState({...this.state, });
    }
    
  }
  customStyles = {
    content : {
    top: '50%',
    left: '50%',
    height:70,
    width:'20%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius:20,
    transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
  };
  customStylesB = {
    content : {
    top: '50%',
    left: '50%',
    height:150,
    width:'40%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    borderRadius:20,
    borderWidth:0,
    transform: 'translate(-50%, -50%)',
    },
    overlay: {zIndex: 1000}
  };
  render() {
    return (
      <React.Fragment>
        {/* SEO meta */}
        <Helmet>
            <title>{process.env.REACT_APP_WEBSITE_NAME}</title>
            <meta name="description" content={process.env.REACT_APP_WEBSITE_DESCRIPTION}/>
            <meta name="keywords" content={process.env.REACT_APP_WEBSITE_META_KW}/>
            <link rel="canonical" href={process.env.REACT_APP_DOMAIN} />
        </Helmet>
        {/* Importing Navbar */}
        <NavbarPage
          navclass={this.state.navClass}
          imglight={this.state.imglight}
        />

        {/* import section */}
        <Section />
        {/* import services */}
        <Services />
        {/* modal */}
        <Modal isOpen={this.state.showModal} contentLabel="Error message" style={this.customStyles}>
            <button onClick={this.closeMessageModal} className="close-btn"> X </button>
            { this.state.isFormError === true && (
            <p className="error-custom">{this.state.resMessage}</p>
            )}
            { this.state.isCreatedJob === true && (
                <p style={{color:'#155724'}} className="succ-custom">{this.state.resMessage}</p>
            )}
        </Modal>
        <Modal isOpen={this.state.isLoading} contentLabel="Loading" style={this.customStylesB}>
            <LoadingOverlay active={true} spinner={<BounceLoader />}></LoadingOverlay>
        </Modal>
        {/* <Features />

        <Achievement />

        <Clients />

        <Posts />

        <ContactUs /> */}

        {/* import Footer */}
        {/* <Footer /> */}
          <StickyFooter
            bottomThreshold={50}
            normalStyles={{
                backgroundColor: "#181b1f",
                padding: "1rem",
                borderTopColor: 'black',
                borderTopWidth: 10,
            }}
            stickyStyles={{
                zIndex:1000,
                backgroundColor: "#181b1f",
                padding: "1rem",
                width:"100%",
            }}>
            <Row className="floating-foot-b justify-content-center" style={{textAlign: 'center'}}>
                <Col lg={12}>
                  <form onSubmit={this.handleSubmit}>
                  <p className="text-white">
                    <span className="footer-span">Join 20,457+ people and get a </span>
                    <span className="footer-span">
                      <select className="form-control" value={this.state.period} onChange={this.handlePeriodChange}>
                        <option value="1">daily</option>
                        <option value="7">weekly</option>
                      </select>
                    </span>
                   <span className="footer-span">email of all new healthcare  jobs</span>
                   <span className="footer-span">
                     <input value={this.state.email} onChange={this.handleEmailChange} type="text" placeholder="email" className="form-control" id="exampleFormControlInput1"/>
                   </span>
                   <span className="footer-span">
                     <button type="submit" className="subscribe-job"> Subscribe </button>
                   </span>
                  </p>
                  </form>
                </Col>
            </Row>
          </StickyFooter>
        </React.Fragment>
    );
  }
}

export default Index6;
