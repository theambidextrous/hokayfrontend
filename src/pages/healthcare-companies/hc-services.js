import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { withRouter, Link, Redirect, } from 'react-router-dom'

//Import Spinner Box
import SpinnerBox from "../../components/Common/SpinnerBox";

import ServiceBox from "./hc-service-box";
import { findByCompany, searchJobs } from "../../api/api";
import {Helmet} from "react-helmet";
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

import ReactPaginate from 'react-paginate';
import md from "../../assets/images/tags/md.png";
import ant from "../../assets/images/tags/ant.png";
import hrec from "../../assets/images/tags/hrecords.png";
import ns from "../../assets/images/tags/nurse.png";
import phar from "../../assets/images/tags/pharmacy.png";
import sg from "../../assets/images/tags/surgeon.png";
import xr from "../../assets/images/tags/xray.png";
import hok from "../../assets/images/hok.png";

class Services extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.gotoJobPost = this.gotoJobPost.bind(this);
  }
  state = {
    current:this.props.location.pathname.split('/').slice(-1).pop(),
    description:"",
    shareUrl: process.env.REACT_APP_DOMAIN,
    appName:process.env.REACT_APP_WEBSITE_NAME,
    pageCount:0,
    limit:50,
    offset:0,
    perPage:50,
    services: [],
    isError: false,
    search: "",
    preload:true,
  };
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    this.setState({ ...this.state, offset:offset,preload:true, }, () => {
      findByCompany(this.state.current, this.state.offset)
      .then( res => this.setState({...this.state, services: res.payload, pageCount: Math.ceil(res.total_count / res.limit),preload:false, }))
      .catch(() => this.setState({...this.state, isError: true, preload:false, }));
    });
  };
  gotoJobPost = (link) => {
    window.location.href = link;
  }
  handleSearch(event) {
      const v = event.target.value
      this.setState({...this.state, offset: 0, search:v});
      if( v.length > 0 )
      {
        this.setState({...this.state, offset: 0, search:v, preload:true});
        searchJobs(v)
        .then( (res) => {
          this.setState({
            ...this.state,
            services: res.payload,
            pageCount: Math.ceil(res.total_count / res.limit),
            search: v,
            preload:false,
          });
        })
        .catch((err) => {
          this.setState({...this.state, services: [], search: v, preload:false});
        });
        this.forceUpdate();
      }
      else
      {
        findByCompany(this.state.current, this.state.offset)
        .then( res => this.setState({...this.state, services: res.payload, pageCount: Math.ceil(res.total_count / res.limit), }))
        .catch(() => this.setState({...this.state, isError: true }));
        this.setState({...this.state, search: ""});
      }
  }
  componentWillMount() {
    this.setState({...this.state, preload:true});
    if (this.state.search === "")
    {
      findByCompany(this.state.current, this.state.offset)
      .then( res =>  {
          console.log(res);
        this.setState({...this.state, services: res.payload, pageCount: Math.ceil(res.total_count / res.limit), preload:false })
      })
      .catch(() => this.setState({...this.state, isError: true,preload:false }));
    }
    else
    {
      
    }
  }
  render() {
    const joblist = this.state.services;
    return (
      <React.Fragment>
        {/* SEO meta */}
        <Helmet>
            <title>
              {this.state.current.replace('-', ' ')+ " Jobs on " + process.env.REACT_APP_DOMAIN_NAME}
            </title>
            <meta name="description" content={this.state.current.replace('-', ' ') + " Jobs on " + process.env.REACT_APP_DOMAIN_NAME + " in United states. Texas, California, Bellevue, Aneihim, New york"}/>
            <meta name="keywords" content={process.env.REACT_APP_WEBSITE_META_KW}/>
            <link rel="canonical" href={process.env.REACT_APP_DOMAIN + '/jobs/healthcare-companies/' + this.state.current} />
        </Helmet>
        {/* SERVICE START  */}
        <section id="service" className="section section-custom section-dark position-relative">
          <Container>
            {/* <SectionTitle
              className="s-title"
              title="Featured Jobs"
              description=""
            /> */}
            {/* Primary tags */}
            {/* <Row className="justify-content-center tag-content">
              <div className="col-lg-1 tag-nav">
                <p>
                    <a href={process.env.REACT_APP_DOMAIN} 
                    className="">
                      <img className="primary-tag-icon" src={hok}/>
                      <span className="primary-tag-title">Healthcare Jobs</span>
                    </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                    <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Medical-Doctor'} 
                    className="">
                      <img className="primary-tag-icon" src={md}/>
                      <span className="primary-tag-title">Medical Doctor</span>
                    </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Nursing'} 
                  className="">
                    <img className="primary-tag-icon" src={ns}/>
                    <span className="primary-tag-title">Nursing</span>
                  </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Pharmacy'} 
                  className="">
                    <img className="primary-tag-icon" src={phar}/>
                    <span className="primary-tag-title">Pharmacy</span>
                  </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Surgeon'} 
                  className="">
                    <img className="primary-tag-icon" src={sg}/>
                    <span className="primary-tag-title">Surgeon</span>
                  </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Health-Records'} 
                  className="">
                    <img className="primary-tag-icon" src={hrec}/>
                    <span className="primary-tag-title">Health Records</span>
                  </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Scanning'} 
                  className="">
                    <img className="primary-tag-icon" src={xr}/>
                    <span className="primary-tag-title">Hospital Scans</span>
                  </a>
                </p>
              </div>
              <div className="col-lg-1 tag-nav">
                <p>
                  <a href={process.env.REACT_APP_DOMAIN + '/jobs/tag/Maternal-Health'} 
                  className="">
                    <img className="primary-tag-icon" src={ant}/>
                    <span className="primary-tag-title">Maternal Health</span>
                  </a>
                </p>
              </div>
            </Row> */}
            {/* post a job */}
            <div className="div-link" onClick={() => this.gotoJobPost(process.env.REACT_APP_DOMAIN + '/employer/new/job')}>
              <Row className="justify-content-center apply-job-content">
                <div className="col-lg-12">
                  <p style={{marginBottom: 0}}>
                      <span className="call-to-action">
                      👉 Hiring in <u>Healthcare</u>? Reach 1,200,000+ Job seekers on the 🏆 #1 Healthcare jobs board 
                      </span>
                      <a href={process.env.REACT_APP_DOMAIN + '/employer/new/job'} className="btn btn-orange btn-pointed small-btn btn-action a-btn post-job ">Post a job</a>
                  </p>
                </div>
              </Row>
            </div>
            {/* current tag */}
            <Row className="justify-content-center tag-content-c">
                <div className="col-lg-12">
                    <p style={{marginBottom: 0,textAlign:'left'}}>
                        <span className="t-tag">
                            <a href={process.env.REACT_APP_DOMAIN} className="tag-btn">x</a>
                            {" "}
                            {this.state.current.replace('-', ' ')} Jobs
                        </span>
                    </p>
                </div>
            </Row>
            {/* search bar */}
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="text-center hero-6-content s-form">
                  <form action="#">
                    <input type="text" value={this.state.search} onChange={this.handleSearch} placeholder="Search for healthcare jobs" />
                    <button
                      type="submit"
                      className="btn rounded-pill"
                    >
                      <i className="pe-7s-search text-black h1 service-icon"></i>
                    </button>
                  </form>
                </div>
              </Col>
            </Row>
            <Row className="align-items-center">
              <div className="col-lg-12">
                <p> <span className="mr-2">Share Page</span> 
                    <FacebookShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <FacebookIcon size={20} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <WhatsappIcon size={20} round />
                    </WhatsappShareButton>
                    <TwitterShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <TwitterIcon size={20} round />
                    </TwitterShareButton>
                    <EmailShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <EmailIcon size={20} round />
                    </EmailShareButton>
                    <LinkedinShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <LinkedinIcon size={20} round />
                    </LinkedinShareButton>
                    <TelegramShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <TelegramIcon size={20} round />
                    </TelegramShareButton>
                    <RedditShareButton url={this.state.shareUrl} quote={this.state.appName}>
                        <RedditIcon size={20} round />
                    </RedditShareButton>
                  </p>
              </div>
            </Row>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="col-lg-12">
                  <div className="row progress-bar-row">
                    { this.state.preload === true && (
                      <SpinnerBox/>
                    )}
                    {joblist.length === 0 && this.state.isError === false && this.state.preload === false && (
                      <h3 className="no-jobs">No jobs found</h3>
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                {this.state.isError == true && (
                  <h3 className="no-jobs">Error occured No jobs found</h3>
                )}
              </Col>
            </Row>
            {joblist.length > 0 && (
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="text-left hero-6-content s-form">
                <ServiceBox services={joblist} />
                </div>
              </Col>
              <Col lg={12}>
                <div className="text-center hero-6-content">
                <ReactPaginate
                  previousLabel={'previous'}
                  previousClassName={'page-link disabled'}
                  nextClassName={'page-link'}
                  initialPage={0}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  breakLinkClassName={'page-link'}
                  nextLabel={'next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'justify-content-center pagination ios-pg'}
                  subContainerClassName={'pages'}
                  activeClassName={'active'}
                />
                </div>
              </Col>
            </Row>
            )}
          </Container>
        </section>

        {/* SERVICE END  */}
      </React.Fragment>
    );
  }
}

export default withRouter(Services);
