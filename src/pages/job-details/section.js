import React, { Component } from "react";

import { Container, Row, Col,ListGroup, ListGroupItem, } from "reactstrap";
import {getJob} from "../../api/api";
import { withRouter, Link, } from 'react-router-dom';
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

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      shareUrl:process.env.REACT_APP_DOMAIN,
      jobData: [],
      isFound: true,
    };
    this.callModal.bind(this);
    this.isValidEmailAddress = this.isValidEmailAddress.bind(this);
  }
  isValidEmailAddress = (email) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true;
    }
    return false;
  }
  componentWillMount() {
    // const jobid = parseInt(this.props.location.pathname.split('/').slice(-1).pop());
    const jobid = parseInt(this.props.location.pathname.split('/').slice(-2)[0]);
    // let fgg = '/jobs/job/49/job-title-goes-here';
    // console.log('job id is', fgg.split('/').slice(-2)[0]);
    const sharelink = this.state.shareUrl + this.props.location.pathname;
    this.setState({...this.state, shareUrl:sharelink});
    // console.log("job id = " + JSON.stringify(jobid));
    getJob(jobid)
    .then( (res) => {
        console.log(res);
        this.setState({...this.state, jobData: res.payload});
    })
    .catch((err) => {
      this.setState({...this.state, jobData: [], isFound:false});
    });
  }
  componentDidMount() {
    // const jobid = parseInt(this.props.location.pathname.split('/').slice(-1).pop());
    // const sharelink = this.state.shareUrl + this.props.location.pathname;
    // this.setState({...this.state, shareUrl:sharelink});
    // // console.log("job id = " + JSON.stringify(jobid));
    // getJob(jobid)
    // .then( (res) => {
    //     console.log(res);
    //     this.setState({...this.state, jobData: res.payload});
    // })
    // .catch((err) => {
    //   this.setState({...this.state, jobData: [], isFound:false});
    // });
  }
  callModal = () => {
    this.refs.child.openModal();
  };

  render() {
      const jobdata = this.state.jobData;
    return (
      <React.Fragment>
        {/* SEO meta */}
        <Helmet>
            <title>{jobdata.title + " job at " + jobdata.organization + " posted on " + process.env.REACT_APP_DOMAIN_NAME + " in " + jobdata.location}</title>
            <meta name="description" content={jobdata.title + " job at " + jobdata.organization + " posted on " + process.env.REACT_APP_DOMAIN_NAME + " in " + jobdata.location + ". Brief: " + jobdata.brief}/>
            <meta name="keywords" content={process.env.REACT_APP_WEBSITE_META_KW}/>
            <link rel="canonical" href={this.state.shareUrl} />
        </Helmet>
        {/* HERO START */}
        <section className="hero-6-bg smaller-f position-relative" id="home">
          <Container>
            {/* Primary tags */}
            <Row className="tag-area">
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN}>Healthcare jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/physician-assistant-jobs'}>physician assistant jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/pharmacy-technician-jobs'}>pharmacy technician jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                 <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/pharmacist-jobs'}>pharmacist jobs</ListGroupItem>
              </Col>
              
              <Col lg={2} className="bbb">
                 <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/medical-assistant-jobs'}>medical assistant jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                 <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/psychologist-jobs'}>psychologist jobs</ListGroupItem>
              </Col>

              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/nurse-jobs'}>nurse jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/rn-jobs'}>rn jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/nurse-practitioner-jobs'}>nurse practitioner jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/dental-assistant-jobs'}>dental assistant jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/physical-therapist-jobs'}>physical therapist jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/ occupational-therapist-jobs'}>occupational therapist jobs</ListGroupItem>
              </Col>
              <Col lg={2} className="bbb">
                <ListGroupItem className={"tag-area-link"} tag="a" href={process.env.REACT_APP_DOMAIN + '/jobs/tag/entist-jobs'}>dentist jobs</ListGroupItem>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={12}>
                <div className="text-left hero-6-content">
                  <h1 className="text-dark hero-6-title font-weight-medium mb-4 line-height-1_4 hcustom">
                    {jobdata.title}
                  </h1>
                  <p className="text-muted w-10 mx-auto mb-5">
                    {jobdata.brief}
                  </p>
                  <p> <span className="mr-2">Share via</span> 
                    <FacebookShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TwitterShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <EmailShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                    <LinkedinShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <TelegramShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <RedditShareButton url={this.state.shareUrl} quote={jobdata.title}>
                        <RedditIcon size={32} round />
                    </RedditShareButton>
                  </p>
                  <hr></hr>

                  <p className="text-muted w-10 mx-auto mb-5" dangerouslySetInnerHTML={{__html: jobdata.description}}>
                  </p>
                  {jobdata.howto ? (
                    <div>
                      <h3>How to Apply</h3>
                      <p className="text-muted w-10 mx-auto mb-5" dangerouslySetInnerHTML={{__html: jobdata.howto}}>
                      </p>
                    </div>
                  ):(
                    <p></p>
                  )}
                  <hr></hr>
                  <a href="#" className="btn btn-default btn-pointed btn-outlined j-meta-btn">
                    <i className="remixicon-building-fill mr-1" />
                    {jobdata.organization}
                  </a>
                  {jobdata.salary && (
                    <a href="#" className="btn btn-default btn-pointed btn-outlined j-meta-btn">
                      <i className="remixicon-briefcase-4-fill mr-1" title={"Annual Salary USD" + jobdata.salary } />
                      Annual Salary ${jobdata.salary}
                    </a>
                  )}
                  <a href="#" className="btn btn-default btn-pointed btn-outlined j-meta-btn">
                    <i className="remixicon-map-pin-fill mr-1" />
                    {jobdata.location}
                  </a>
                  <a href="#" className="btn btn-default btn-pointed btn-outlined j-meta-btn">
                    <i className="remixicon-mac-fill mr-1" />
                    { jobdata.remote === 1 && (
                    <span>Remote</span>
                    )}
                    { jobdata.remote === 0 && (
                        <span>Office</span>
                    )}
                  </a>
                    {this.isValidEmailAddress(jobdata.link) ? (
                      <a href={"mailto:" + jobdata.link} className="btn btn-pointed btn-outlined j-meta-btn-apply" target="_blank">
                        <i className="remixicon-briefcase-fill mr-1" />
                        Apply Job
                      </a>
                    ):(
                      <a href={jobdata.link} className="btn btn-pointed btn-outlined j-meta-btn-apply" target="_blank">
                        <i className="remixicon-briefcase-fill mr-1" />
                        Apply Job
                      </a>
                    )}
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

export default withRouter(Section);

