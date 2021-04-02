import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import TimeAgo from 'react-timeago';
import hok from "../../assets/images/hok-dk.png";
class ServiceBox extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }
  getForegroundColor(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
  determineHighlight(service)
  {
    if(service.brand_color)
    {
      return service.selected_color;
    }
    if(service.yellow_it)
    {
      return '#fff9c9';
    }
    return '#ffffff';
  }
  constructor(props) {
    super(props);
    this.getForegroundColor = this.getForegroundColor.bind(this);
    this.determineHighlight = this.determineHighlight.bind(this);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.services.map((service, key) => (
          <div className="col-md-12" key={key}>
            <div style={{backgroundColor: this.determineHighlight(service)}} className="service-box mt-2 sbox-custom">
              <Row>
                <Col lg={1}>
                  <br></br>
                  { service.show_logo ? (
                    <img className="show-logo-badge" src={service.logo}/>
                  ):(
                    <div className="img-txt">
                      <p className="show-logo-badge">
                        <span>{service.organization.charAt(0)}</span>
                      </p>
                    </div>
                  )}
                  <br></br>
                </Col>
                <Col lg={4}>
                  <p className="company-title" style={{color:this.getForegroundColor(this.determineHighlight(service))}}>
                    <Link to={{pathname:'/jobs/healthcare-companies/' + service.organization.split(" ").join("-")}} style={{color: this.getForegroundColor(this.determineHighlight(service))}}>
                      {service.organization}
                    </Link>
                  </p>
                  <h5>
                    <Link to={{pathname:'/jobs/job/' + service.id + '/' + service.title.replace(/[\W_]/g, '-')}} style={{color: this.getForegroundColor(this.determineHighlight(service))}} className="text-title-black">
                    {service.title}
                    <span>
                      <img width={16} height={16} src={hok} style={{borderRadius: '100%',verticalAlign: 'middle', marginLeft:4,marginTop: -2}}/>
                    </span>
                    </Link>
                  </h5>
                  <p className="location-title">🌏 {service.location}</p>
                </Col>
                <Col lg={4}>
                  <p></p>
                  <div className="s-tags">
                    {service.tags.split(",").map((tag, idx) => (
                      idx <= 2 && tag.length > 2 && (
                        <Link key={idx} to={{pathname:'/jobs/tag/' + tag.trim()}} style={{color: this.getForegroundColor(this.determineHighlight(service))}}>
                          <span style={{color:this.getForegroundColor(this.determineHighlight(service)), borderWidth:2, border:"solid", borderColor:this.getForegroundColor(this.determineHighlight(service)), padding:4, margin:4, display:"inline-block", borderRadius:8,fontSize:12}} className="tag-item">{tag}</span>
                        </Link>
                      )
                    ))}
                  </div>
                  <p></p>
                </Col>
                {/* stickyS */}
                { service.sticky_day ? (
                  <Col lg={1}>
                    <p></p>
                    <span className="time-sticky" style={{color:this.getForegroundColor(this.determineHighlight(service))}}>
                    📎
                    </span>
                    <p></p>
                  </Col>
                ):(
                  <p></p>
                )}
                { service.sticky_week ? (
                  <Col lg={1}>
                    <p></p>
                    <span className="time-sticky" style={{color:this.getForegroundColor(this.determineHighlight(service))}}>
                    📎 
                    </span>
                    <p></p>
                  </Col>
                ):(
                  <p></p>
                )}
                { service.sticky_month ? (
                  <Col lg={1}>
                    <p></p>
                    <span className="time-sticky" style={{color:this.getForegroundColor(this.determineHighlight(service))}}>
                    📎 
                    </span>
                    <p></p>
                  </Col>
                ):(
                  <p></p>
                )}
                <Col lg={2}>
                  <p></p>
                  <span className="time-sticky" style={{color:this.getForegroundColor(this.determineHighlight(service))}}>
                    <i className="remixicon-time-fill h4" />
                    <TimeAgo date={service.created_at} />
                  </span>
                  <p></p>
                </Col>
              </Row>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ServiceBox;
