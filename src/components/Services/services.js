import React, { Component } from "react";
import { Container, Row, Col ,ListGroup, ListGroupItem,} from "reactstrap";

//Import Spinner Box
import SpinnerBox from "../Common/SpinnerBox";
import ServiceBox from "./service-box";
import { getJobs, searchJobs } from "../../api/api";
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

import InfiniteScroll from 'react-infinite-scroller';

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
    this.handleLoading = this.handleLoading.bind(this);
    this.gotoJobPost = this.gotoJobPost.bind(this);
  }
  state = {
    description:"",
    shareUrl: process.env.REACT_APP_DOMAIN,
    appName:process.env.REACT_APP_WEBSITE_NAME,
    pageCount:0,
    limit:100,
    offset:0,
    perPage:100,
    services: [],
    isError: false,
    search: "",
    hasMore:false,
    preload:true,
  };
  gotoJobPost = (link) => {
    window.location.href = link;
  }
  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);
    this.setState({ ...this.state, offset:offset, preload:true, }, () => {
      getJobs(this.state.offset)
      .then( res => this.setState({...this.state, services: res.payload, pageCount: Math.ceil(res.total_count / res.limit), preload:false }))
      .catch(() => this.setState({...this.state, isError: true, preload:false }));
    });
  };
  handleSearch = (event) => {
      const v = event.target.value
      this.setState({...this.state, offset: 0, search:v,});
      // console.log('seach', v);
      if( v.length > 0 )
      {
        this.setState({...this.state, offset: 0, search:v, preload:true});
        searchJobs(v)
        .then( (res) => {
          this.setState({
            ...this.state,
            services: res.payload,
            pageCount: Math.ceil(res.total_count / res.limit),
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
        getJobs(this.state.offset)
        .then( res => this.setState({...this.state, services: res.payload, pageCount: Math.ceil(res.total_count / res.limit), }))
        .catch(() => this.setState({...this.state, isError: true }));
        this.setState({...this.state, search: v});
      }
  }
  handleLoading = () => {
    if (this.state.search === "")
    {
      getJobs(this.state.offset)
      .then( res => this.setState({
        ...this.state, 
        services: res.payload, 
        pageCount: Math.ceil(res.total_count / res.limit),
        preload:false, 
      }))
      .catch(() => this.setState({
        ...this.state, 
        isError: true,
        preload:false,
      }));
    }
    else
    {
      
    }
  }
  componentWillMount(){
    this.setState({...this.state, preload:true});
    this.handleLoading();
  }
  componentWillUnmount(){
    return this.setState([]);
  }
  componentDidMount() {
    
  }
  render() {
    const joblist = this.state.services;
    const loader = <div className="loader">Loading ...</div>;
    return (
      <React.Fragment>
        {/* SERVICE START  */}
        <section id="service" className="section section-custom section-dark position-relative">
          <Container>
            {/* <SectionTitle
              className="s-title"
              title="Featured Jobs"
              description=""
            /> */}
            {/* post a job */}
            <div className="div-link" onClick={() => this.gotoJobPost(process.env.REACT_APP_DOMAIN + '/employer/new/job')}>
              <Row className="justify-content-center apply-job-content">
                <div className="col-lg-12">
                  <p>
                      <span className="call-to-action">
                      👉 Hiring in <u>Healthcare</u>? Reach 1,200,000+ Job seekers on the 🏆 #1 Healthcare jobs board 
                      </span>
                      <a href={process.env.REACT_APP_DOMAIN + '/employer/new/job'} className="btn btn-orange btn-pointed small-btn btn-action a-btn post-job ">Post a job</a>
                  </p>
                </div>
              </Row>
            </div>
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
            <br></br>
            {/* Primary tags */}
            <Row className="justify-content-center tag-area">
              <Col lg={12} className="bbb">
                <ListGroup horizontal>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN}>Healthcare jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/physician-assistant-jobs'}>physician assistant jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/pharmacy-technician-jobs'}>pharmacy technician jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/pharmacist-jobs'}>pharmacist jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/medical-assistant-jobs'}>medical assistant jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/psychologist-jobs'}>psychologist jobs</ListGroupItem>
                </ListGroup>
                
                <ListGroup horizontal>
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/nurse-jobs'}>nurse jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/rn-jobs'}>rn jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/nurse-practitioner-jobs'}>nurse practitioner jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/dental-assistant-jobs'}>dental assistant jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/physical-therapist-jobs'}>physical therapist jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/ occupational-therapist-jobs'}>occupational therapist jobs</ListGroupItem>
                  <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/entist-jobs'}>dentist jobs</ListGroupItem>
              </ListGroup>
              </Col>
            </Row>
            <br></br>
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
                  {/* <InfiniteScroll pageStart={0} loadMore={this.loadItems.bind(this)} hasMore={this.state.hasMoreItems} loader={loader}> */}
                    <ServiceBox services={joblist} />
                  {/* </InfiniteScroll> */}
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

export default Services;
