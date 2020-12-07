import React, { Component } from "react";

import { Container, Row, Col, FormGroup, Label, Input, FormText, Form, } from "reactstrap";
import {Editor,} from "@tinymce/tinymce-react";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/DotLoader'
import Modal from 'react-modal';
import StickyFooter from 'react-sticky-footer';
import conf from "../../api/config";
//Import countries
import countries from "../../api/country";
import { addJob } from "../../api/api";
import cvs from "../../assets/images/cvs.png";
import united from "../../assets/images/united.jpg";
import mc from "../../assets/images/mc.png";
import ame from "../../assets/images/ame.png";
import cigna from "../../assets/images/cigna.png";
import cad from "../../assets/images/cad.png";
import wal from "../../assets/images/wal.png";
// import ant from "../../assets/images/ant.jpg";
import jj from "../../assets/images/jj.jpeg";
import footerlogo from "../../assets/images/logo-dark.png";
/** stripe */
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe(conf.stripe_p_key);
const stripe = useStripe();
const elements = useElements();

class Section extends Component {
// const Section = () => {
  constructor(props) {
    super(props);
    this.logoFileInput = React.createRef();
    this.state = {
      isOpen: false,
      isLoading: false,
      isFormError: false,
      isCreatedJob: false,
      showModal:false,
      resMessage: 'All fields are required',
      
      isValidOrganization: true,
      isValidTitle: true,
      isValidPrimaryTag:true,
      isValidTag: true,
      isValidBrief: true,
      isValidCountry: true,
      isValidCity: true,
      isValidLogo:true,
      isValidSalary: true,
      isValidCoEmail:true,
      isValidCoTwitter: true,
      isValidDescription: true,
      isValidHowToApply:true,
      isValidLink: true,
      isValidInvAddress:true,

      organization:'',
      title:'',
      primaryTag:'',
      tag:'',
      brief:'',
      country:'',
      city:'',
      showlogo:true,
      matchJob:true,
      bumpTofront:false,
      showInYellow:false,
      logo:'',
      salaryRange:'',
      coEmail:'',
      coTwitter:'',
      description:'',
      howToApply:'',
      link:'',
      invAddress:'',
      remote:false,
    };
    this.callModal.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePrimaryTagChange = this.handlePrimaryTagChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleBriefChange = this.handleBriefChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleShowLogoChange = this.handleShowLogoChange.bind(this);
    this.handleMatchJobChange = this.handleMatchJobChange.bind(this);
    this.handleBumpTofrontChange = this.handleBumpTofrontChange.bind(this);
    this.handleShowInYellowChange = this.handleShowInYellowChange.bind(this);
    this.handleSalaryRangeChange = this.handleSalaryRangeChange.bind(this);
    this.handleCoEmailChange = this.handleCoEmailChange.bind(this);
    this.handleCoTwitterChange = this.handleCoTwitterChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleHowtoApplyChange = this.handleHowtoApplyChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleRemoteChange = this.handleRemoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidHttpUrl = this.isValidHttpUrl.bind(this);
    this.isValidEmailAddress = this.isValidEmailAddress.bind(this);
    this.closeMessageModal = this.closeMessageModal.bind(this);
    this.handleLogoChange = this.handleLogoChange.bind(this);
    this.handleInvAddressChange = this.handleInvAddressChange.bind(this);
  }
  
  closeMessageModal() {
      this.setState({...this.state, showModal:false});
  }
  handleInvAddressChange(event) {
    const v = event.target.value;
    if ( v.length >= 5)
    {
        this.setState({...this.state, invAddress: v, isValidInvAddress: true});
    }
    else 
    {
        this.setState({...this.state, invAddress: v, isValidInvAddress: false});
    }
  }
  handleOrganizationChange(event) {
    const v = event.target.value;
    if ( v.length >= 2)
    {
        this.setState({...this.state, organization: v, isValidOrganization: true});
    }
    else 
    {
        this.setState({...this.state, organization: v, isValidOrganization: false});
    }
  }
  handleTitleChange(event) {
    const v = event.target.value;
    if ( v.length >= 10)
    {
        this.setState({...this.state, title: v, isValidTitle: true});
    }
    else
    {
        this.setState({...this.state, title: v, isValidTitle: false});
    }
    
  }
  handlePrimaryTagChange(event){
    const v = event.target.value;
    if ( v.length >= 2 && v !== 'nn')
    {
        this.setState({...this.state, primaryTag: v, isValidPrimaryTag: true});
    }
    else 
    {
        this.setState({...this.state, primaryTag: v, isValidPrimaryTag: false});
    }
  }
  handleTagChange(event){
    const v = event.target.value;
    if ( v.length >= 10)
    {
        this.setState({...this.state, tag: v, isValidTag: true});
    }
    else 
    {
        this.setState({...this.state, tag: v, isValidTag: false});
    }
  }
  handleBriefChange(event) {
    const v = event.target.value;
    if ( v.length >= 10)
    {
        this.setState({...this.state, brief: v, isValidBrief: true});
    }
    else 
    {
        this.setState({...this.state, brief: v, isValidBrief: false});
    }
  }
  handleCountryChange(event) {
    const v = event.target.value;
    if ( v.length >= 2 && v !== 'nn')
    {
        this.setState({...this.state, country: v, isValidCountry: true});
    }
    else 
    {
        this.setState({...this.state, country: v, isValidCountry: false});
    }
  }
  handleCityChange(event) {
    const v = event.target.value;
    if ( v.length >= 2)
    {
        this.setState({...this.state, city: v, isValidCity: true});
    }
    else 
    {
        this.setState({...this.state, city: v, isValidCity: false});
    }
  }
  handleShowLogoChange(event){
    const target = event.target;
    if( target.checked )
    {
        this.setState({...this.state, showlogo: true});
    }
    else
    {
        this.setState({...this.state, showlogo: false});
    }
  }
  handleMatchJobChange(event){
    const target = event.target;
    if( target.checked )
    {
        this.setState({...this.state, matchJob: true});
    }
    else
    {
        this.setState({...this.state, matchJob: false});
    }
  }
  handleBumpTofrontChange(event)
  {
    const target = event.target;
    if( target.checked )
    {
        this.setState({...this.state, bumpTofront: true});
    }
    else
    {
        this.setState({...this.state, bumpTofront: false});
    }
  }
  handleShowInYellowChange(event)
  {
    const target = event.target;
    if( target.checked )
    {
        this.setState({...this.state, showInYellow: true});
    }
    else
    {
        this.setState({...this.state, showInYellow: false});
    }
  }
  handleSalaryRangeChange(event){
    const v = event.target.value;
    if ( v.length >= 2)
    {
        this.setState({...this.state, salaryRange: v, isValidSalary: true});
    }
    else 
    {
        this.setState({...this.state, salaryRange: v, isValidSalary: false});
    }
  }
  handleCoEmailChange(event){
    const v = event.target.value;
    if ( this.isValidEmailAddress(v) )
    {
        this.setState({...this.state, coEmail: v, isValidCoEmail: true});
    }
    else 
    {
        this.setState({...this.state, coEmail: v, isValidCoEmail: false});
    }
  }
  handleCoTwitterChange(event){
    const v = event.target.value;
    if ( v.length >= 2)
    {
        this.setState({...this.state, coTwitter: v, isValidCoTwitter: true});
    }
    else 
    {
        this.setState({...this.state, coTwitter: v, isValidCoTwitter: false});
    }
  }
  handleDescriptionChange(content) {
    const v = content;
    if ( v.length >= 20)
    {
        this.setState({...this.state, description: v, isValidDescription: true});
        this.forceUpdate();
    }
    else 
    {
        this.setState({...this.state, description: v, isValidDescription: false});
        this.forceUpdate();
    }
  }
  handleHowtoApplyChange(content){
    const v = content;
    if ( v.length >= 10)
    {
        this.setState({...this.state, howToApply: v, isValidHowToApply: true});
        this.forceUpdate();
    }
    else 
    {
        this.setState({...this.state, howToApply: v, isValidHowToApply: false});
        this.forceUpdate();
    }
  }
  handleLinkChange(event) {
    const v = event.target.value;
    if( this.isValidHttpUrl(v)  || this.isValidEmailAddress(v) )
    {
        this.setState({...this.state, link: v, isValidLink:true});
    }
    else
    {
        this.setState({...this.state, link: v, isValidLink:false});
    }
  }
  handleRemoteChange(event) {
    const v = event.target.value;
    const c = event.target.checked;
    if( c )
    {
        this.setState({...this.state, remote: v});
    }
  }
  handleLogoChange(event) {
    this.setState({...this.state, logo: event.target.files[0] });
  }
  isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  isValidEmailAddress(email) {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }
    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!stripe || !elements) {
        /** stripe not loaded */
        return;
    }
    this.setState({...this.state, logo: this.logoFileInput.current.files[0] });
    this.setState({...this.state, isLoading: true});
    if( 
        this.state.isValidOrganization && 
        this.state.isValidTitle &&
        this.state.isValidPrimaryTag &&
        this.state.isValidTag &&
        this.state.isValidBrief &&
        this.state.isValidCountry &&
        this.state.isValidCity && 
        this.state.isValidSalary &&
        this.state.isValidCoEmail &&
        this.state.isValidDescription && 
        this.state.isValidHowToApply &&
        this.state.isValidLink
    )
    {
        var postData = new FormData();
        postData.append('logo',this.state.logo);
        postData.append('organization',this.state.organization);
        postData.append('title',this.state.title);
        postData.append('primary_tag',this.state.primaryTag);
        postData.append('tags',this.state.tag);
        postData.append('brief',this.state.brief);
        postData.append('description',this.state.description);
        postData.append('location',this.state.city + ', ' + this.state.country);
        postData.append('remote',this.state.remote);
        postData.append('link',this.state.link);
        postData.append('source','none-specified');
        postData.append('co_mail',this.state.coEmail);
        postData.append('co_twitter',this.state.coTwitter);
        postData.append('howto',this.state.howToApply);
        postData.append('salary',this.state.salaryRange);
        postData.append('show_logo',this.state.showlogo);
        postData.append('bump',this.state.bumpTofront);
        postData.append('match',this.state.matchJob);
        postData.append('yellow_it',this.state.showInYellow);
        addJob(postData)
        .then( (res) => {
            console.log(res);
            if ( res.status === 200 )
            {
                this.setState({isLoading: false, isFormError: false, isCreatedJob: true, resMessage: res.message, showModal:true});
            }
            else
            {
                this.setState({...this.state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: res.message, showModal:true});
            }
        })
        .catch( (error) => {
            console.log(error);
            this.setState({...this.state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: JSON.stringify(error), showModal:true });
        });
        // console.log(this.state);
        event.preventDefault();
    }
    else 
    {
        this.setState({...this.state, isFormError: true, showModal:true, isLoading: false});
        return;
        // this.setState({...this.state, });
    }
    
  }
  customStyles = {
    content : {
    top: '50%',
    left: '50%',
    height:150,
    width:'40%',
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
  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
      const states = countries.data;
    //   console.log(states);
    return (
      <React.Fragment>
        {/* PRELOAD START */}
        <Elements stripe={stripePromise}>
        <form className="registration-form" onSubmit={this.handleSubmit}>
        <section className="hero-6-bg smaller-mid position-relative" id="home">
          <Container style={{minWidth:'100%'}}>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="hero-6-content">
                <h1 className="text-dark text-center hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    Hire HealthCare Professionals
                </h1>
                <Modal isOpen={this.state.showModal} contentLabel="Error message" style={this.customStyles}>
                    <button onClick={this.closeMessageModal} className="close-btn"> X </button>
                    { this.state.isFormError === true && (
                    <p className="error-custom">{this.state.resMessage}</p>
                    )}
                    { this.state.isCreatedJob === true && (
                        <p className="succ-custom">{this.state.resMessage}</p>
                    )}
                </Modal>
                <Modal isOpen={this.state.isLoading} contentLabel="Loading" style={this.customStylesB}>
                    <LoadingOverlay active={true} spinner={<BounceLoader />}></LoadingOverlay>
                </Modal>
                <Row>
                    <Col lg={8} className="job-form">
                        <Row className="form-inner">
                            <Col lg={12}><p className="text-center section-label">Let's Start</p></Col>
                            <Col lg={12} title="Let's Start">
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Company Name*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.organization} onChange={this.handleOrganizationChange} />
                                    <small className="text-muted">Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc.</small>
                                    { this.state.isValidOrganization === false && (
                                        <small className="error-custom">enter valid organization</small>
                                    )}
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Job Position*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.title} onChange={this.handleTitleChange} />
                                    <span className="text-muted">Please specify as single job position like "Marketing Manager" or "Node JS Developer", not a sentence like "Looking for PM / Biz Dev / Manager". If posting multiple roles, please create multiple job posts. A job post is limited to a single job. We only allow real jobs, absolutely no MLM-type courses "learn how to work online" please.</span>
                                    { this.state.isValidTitle === false && (
                                        <small className="error-custom">enter valid job title</small>
                                    )}
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Primary Job Tag*
                                    </label>
                                    <select className="form-control input-ios" id="exampleFormControlInput1" value={this.state.primaryTag} onChange={this.handlePrimaryTagChange}>
                                        <option value="nn">Select Primary Tag</option>
                                        <option value="Medical-Doctor">Medical Doctor</option>
                                        <option value="Nursing">Nursing</option>
                                        <option value="Pharmacy">Pharmacy</option>
                                        <option value="Surgeon">Surgeon</option>
                                        {/* <option value="Hospital Finance">Hospital Finance</option> */}
                                        <option value="Health-Records">Health Records</option>
                                        <option value="Scanning">X-ray & Scanning </option>
                                        <option value="Maternal-Health">Maternal Health</option>
                                    </select>
                                    <span className="text-muted">This primary tag shows first and increases visibility in the main sections.</span>
                                    { this.state.isValidPrimaryTag === false && (
                                        <small className="error-custom">select valid tag</small>
                                    )}
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Extra Tags (comma separated)*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.tag} onChange={this.handleTagChange} />
                                    <span className="text-muted">Use tags like industry and tech stack, and separate multiple tags by comma. Short words are preferred. The first 3 tags are shown on the site, the other tags aren't but the job will be shown on each tag specific page (like /remote-react-jobs). We also generate tags automatically after you post/edit.</span>
                                    { this.state.isValidTag === false && (
                                        <small className="error-custom">enter valid tags, a comma list</small>
                                    )}
                                </div>


                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Short Description*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.brief} onChange={this.handleBriefChange} />
                                    <span className="text-muted">Use this field to add a brief description of your job. Keep it short but very precise. Include job position, department and a brief of work experience needed etc. 140 characters tops</span>
                                    { this.state.isValidBrief === false && (
                                        <small className="error-custom">enter valid job description</small>
                                    )}
                                </div>
                            </Col>
                            <Col lg={12}>
                                

                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Country*
                                    </label>
                                    <select className="form-control input-ios" id="exampleFormControlInput1" value={this.state.country} onChange={this.handleCountryChange}>
                                        <option value="nn">Select Country</option>
                                        {states.map((e, key) => {
                                            return <option key={key} value={e.name}>{e.name}</option>;
                                        })}
                                    </select>
                                    <span className="text-muted">Country where this job is available. This helps your job's visibility to relevant potential employee(s). Select one from the list.</span>
                                    { this.state.isValidCountry === false && (
                                        <small className="error-custom">select valid country</small>
                                    )}
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        City/Town*
                                    </label>
                                    <input placeholder="e.g. New York" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.city} onChange={this.handleCityChange} />
                                    <span className="text-muted">Narrow your job target location by providing the city in which the hired employee will be stationed. This improves your visibility on <u><b>Healthcare Okay</b></u></span>
                                    { this.state.isValidCity === false && (
                                        <small className="error-custom">enter valid city/town</small>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        {/* badges */}
                        <Row className="form-inner">
                            <Col lg={12}><p className="text-center section-label">Design Your Job</p></Col>
                            <Col lg={12}>
                                <div className="form-group mb-2">
                                    <input name="badge" type="checkbox" checked={this.state.showlogo} onChange={this.handleShowLogoChange} /><span className="badge-label">Show my ⭐️ company logo besides my job post 
                                    <span className="benefit-badge">2x More views</span>
                                    <span className="rec-badge">Highly Recommended</span>
                                    </span>
                                </div>
                                <div className="form-group mb-2">
                                    <input name="badge" type="checkbox" checked={this.state.matchJob} onChange={this.handleMatchJobChange} /><span className="badge-label">Get matched with suitable applicants from our <u>Network of 5000+ subscribers</u></span>
                                </div>
                                <div className="form-group mb-2">
                                    <input name="badge" type="checkbox" checked={this.state.bumpTofront} onChange={this.handleBumpTofrontChange} /><span className="badge-label">Auto renew my job post and bump it to the frontpage after 30 days</span>
                                </div>
                                <div className="form-group mb-2">
                                    <input name="badge" type="checkbox" onChange={this.handleShowInYellowChange} checked={this.state.showInYellow} /><span className="badge-label">
                                        Highlight your post in ⚠️ yellow 
                                        <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">3x More views</span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        {/* job details */}
                        <Row className="form-inner">
                            <Col lg={12}><p className="text-center section-label">Job Details</p></Col>
                            <Col lg={12}>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Company Logo (png or jpg)*
                                    </label>
                                    <input ref={this.logoFileInput} type="file" onChange={this.handleLogoChange} className="form-control input-ios" id="exampleFormControlInput1" />
                                    { this.state.isValidLogo === false && (
                                        <small className="error-custom">upload valid image</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Annual Salary Range(USD) *
                                    </label>
                                    <input type="text" placeholder="e.g. 55k-120k" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.salaryRange} onChange={this.handleSalaryRangeChange} />
                                    <span className="text-muted">Not required but HIGHLY recommended, because Google does NOT index jobs without salary data! Write it preferrably in US DOLLARS PER YEAR, like $75,000. If you pay hourly, or monthly, please convert to annual equivalent yourself (hourly rate * 8h * 22d * 12mo OR monthly salary * 12mo). Our robot can also convert it but it's not perfect and it might make a mistake if you enter it differently than annual. If not sure, write an indication of the salary.</span>
                                    { this.state.isValidSalary === false && (
                                        <small className="error-custom">enter a valid range</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Company Email (stays private, for invoice + edit link)*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.coEmail} onChange={this.handleCoEmailChange} />
                                    <span className="text-muted">Make sure this email is accessible by you! We use this to send the invoice and edit link. We can not and do not manually resend it!</span>
                                    { this.state.isValidCoEmail === false && (
                                        <small className="error-custom">enter a valid email</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Company Twitter Handle*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.coTwitter} onChange={this.handleCoTwitterChange} />
                                    <span className="text-muted">Twitter username without @. Not required, but used to tag your company when we tweet out your job post.</span>
                                    { this.state.isValidCoTwitter === false && (
                                        <small className="error-custom">enter a valid email</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Job Description*
                                    </label>
                                    <Editor
                                    apiKey={conf.tinymcekey}
                                    cloudChannel='5-dev'
                                    disabled={false}
                                    id='jobdescription'
                                    init= {{ height: 400, }}
                                    initialValue={this.state.description}
                                    inline={false}
                                    onEditorChange={this.handleDescriptionChange}
                                    plugins=''
                                    tagName='div'
                                    textareaName=''
                                    toolbar=''
                                    className='input-ios'
                                    value=''
                                    />
                                    { this.state.isValidDescription === false && (
                                        <small className="error-custom">enter valid job description</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        How to Apply*
                                    </label>
                                    <Editor
                                        apiKey={conf.tinymcekey}
                                        cloudChannel='5-dev'
                                        disabled={false}
                                        id='howtoapply'
                                        init= {{height: 300,}}
                                        initialValue={this.state.howToApply}
                                        inline={false}
                                        onEditorChange={this.handleHowtoApplyChange}
                                        plugins=''
                                        tagName='div'
                                        textareaName=''
                                        toolbar=''
                                        className='input-ios'
                                        value=''
                                    />
                                    { this.state.isValidHowToApply === false && (
                                        <small className="error-custom">enter valid process</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Applications submission Link or Email*
                                    </label>
                                    <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={this.state.link} onChange={this.handleLinkChange} />
                                    { this.state.isValidLink === false && (
                                        <small className="error-custom">enter a valid job link</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Company Card*
                                    </label>
                                    <Row>
                                        <Col lg={6}>
                                            <p className="form-control input-ios">
                                                <CardElement
                                                options={{
                                                    style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        backgroundColor:'#ffffff',
                                                        borderWidth:3,
                                                        borderColor:'#000000',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                        color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                    },
                                                }}
                                                />
                                            </p>
                                            <span className="text-muted">
                                                If you have "Auto renew/bump" enabled, make sure your card is chargeable in the future, or we won't be able to bump it.
                                            </span>
                                        </Col>
                                        <Col lg={6}>
                                            <span className="text-muted">
                                                🔐 Secure payment guaranteed by Stripe over HTTPS
                                                <br></br>
                                                💳 Card is only charged when you press "Post your Job"
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="exampleFormControlInput1" className="flabel">
                                        Invoice Address *
                                    </label>
                                    <input type="text" placeholder="e.g. your company's full name and full invoice address, including building, street, including country." className="form-control input-ios" id="exampleFormControlInput1" value={this.state.invAddress} onChange={this.handleInvAddressChange} />
                                    <span className="text-muted">
                                        If you specify your company address here, we'll put it on the Stripe receipt + invoice for your bookkeeping. We CANNOT add or edit this later for you. Make sure it's right.
                                    </span>
                                    { this.state.isValidInvAddress === false && (
                                        <small className="error-custom">enter a valid address</small>
                                    )}
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="form-group mb-4">
                                <label htmlFor="exampleFormControlInput1" className="flabel">
                                    Work Type*
                                </label>
                                <FormGroup tag="fieldset">
                                    <FormGroup check>
                                    <Label check className="radio-custom-left">
                                        <Input onChange={this.handleRemoteChange} name="remoteOpt" value="1" type="radio" />{' '}
                                        Remote job
                                    </Label>
                                    <Label check>
                                        <Input onChange={this.handleRemoteChange} name="remoteOpt" defaultChecked value="0" type="radio" />{' '}
                                        Office based job
                                    </Label>
                                    </FormGroup>
                                </FormGroup>
                                </div>
                            </Col>
                            <Col lg={7}>
                                {/* <button type="submit" className="btn btn-purple btn-block btn-sm btn-ios "> Post a Job </button> */}
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} className="job-form-right">
                        <p className="tagline"><b>Healthcare Okay</b> is <b>the most popular Healthcare jobs board in the world</b> trusted by millions of Healthcare professionals and tens of thousands of Healthcare companies such as</p>
                        <div className="logos">
                            <img className="corp-use" src={cvs}/>
                            <img className="corp-use" src={united}/>
                            <img className="corp-use" src={mc}/>
                            <img className="corp-use" src={ame}/>
                            <img className="corp-use" src={cigna}/>
                            <img className="corp-use" src={cad}/>
                            <img className="corp-use" src={wal}/>
                            {/* <img className="corp-use" src={ant}/> */}
                            <img className="corp-use" src={jj}/>
                        </div>
                    </Col>
                </Row>
                {/* </form> */}
                </div>
              </Col>
            </Row>
            <StickyFooter
                bottomThreshold={50}
                normalStyles={{
                    backgroundColor: "#ffffff",
                    padding: "2rem",
                    borderTopColor: 'black',
                    borderTopWidth: 10,
                }}
                stickyStyles={{
                    zIndex:1000,
                    backgroundColor: "rgba(255,255,255,1)",
                    padding: "2rem",
                    width:"100%",
                }}
            >
                <Row className="floating-foot">
                    <Col lg={4}>
                        <img className="corp-use" src={footerlogo}/>
                        <br></br>
                        Top Healthcare Jobs Board
                    </Col>
                    <Col lg={4}>
                        {/* Add any footer markup here */}
                    </Col>
                    <Col lg={4}>
                        <button disabled={!stripe} type="submit" className="submit-job"> Post Your Job - $0.00 </button>
                    </Col>
                </Row>
            </StickyFooter>
          </Container>
        </section>
        </form>
        </Elements>
        {/* HERO END  */}
      </React.Fragment>
    );
  }
}

export default Section;

