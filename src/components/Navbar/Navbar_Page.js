import React, { Component } from "react";
import {
  Container,
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Stickey Header
import StickyHeader from "react-sticky-header";

import logolight from "../../assets/images/logo-dark.png";
import logodark from "../../assets/images/logo-dark.png";

class NavbarPage extends Component {
  prevScrollpos = 0;

  constructor(props) {
    super(props);
    this.state = {
      hasRobot: false,
      goHome: false,
      gotUrl: "/",
      robot: {},
      navItems: [
        { id: 1, idnm: "about", urlTo: process.env.REACT_APP_DOMAIN + "/about-us", navheading: "About us" },
        { id: 1, idnm: "service", urlTo: process.env.REACT_APP_DOMAIN + "/support", navheading: "Support" },
      ],
      isOpen: false,
      topPos: "0",
      isOpenMenu: false,
      navCenterClass: "",
    };
    this.toggleLine = this.toggleLine.bind(this);
    this.handleScrollMenu = this.handleScrollMenu.bind(this);
    // this.handleActiveRobot = this.handleActiveRobot.bind(this);
    this.signOut = this.signOut.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goHome(url)
  {
    this.setState({...this.state, goHome: true, gotUrl: url});
  }
  signOut()
  {
    localStorage.removeItem('robot');
    this.setState({...this.state, hasRobot: false, robot: {}});
    this.forceUpdate();
  }
  // handleActiveRobot()
  // {
  //   const robot = JSON.parse(localStorage.getItem("robot"));
  //   // console.log(robot);
  //   if( robot )
  //   {
  //     this.setState({...this.state, hasRobot: true, robot: robot});
  //   }
  // }
  handleScrollMenu = async () => {
    let currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      await this.setState({ topPos: "0" });
    } else {
      await this.setState({ topPos: "-420px" });
    }
    this.prevScrollpos = currentScrollPos;

    if (window.innerWidth <= 768) {
      await this.setState({ navCenterClass: "" });
    } else {
      await this.setState({
        navCenterClass: "navbar-nav mx-auto navbar-center",
      });
    }
  };

  componentDidMount() {
    // this.handleActiveRobot();
    this.prevScrollpos = window.pageYOffset;
    window.addEventListener("scroll", this.handleScrollMenu);
    if (window.innerWidth <= 768) {
      this.setState({ navCenterClass: "" });
    } else {
      this.setState({ navCenterClass: "navbar-nav mx-auto navbar-center" });
    }
  }

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  toggle = async () => {
    await this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    return (
      <NavbarBrand href="/" onClick={() => this.goHome()} className="logo">
        <img
          src={this.props.imglight ? logolight : logodark}
          alt=""
          className="logo-light logo-custom"
          height={32}
        />
      </NavbarBrand>
    );
    if( this.state.goHome )
    {
      return <Redirect to={this.state.gotUrl} />;
    }
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.state.navItems.map((item) => {
      return item.idnm;
    });
    return (
      <React.Fragment>
        <StickyHeader
          header={
            <Navbar
              className={`navbar navbar-expand-lg fixed-top navbar-custom ${
                this.props.isStickyNav === true
                  ? `sticky sticky-light`
                  : ` navbar-light`
              }`}
              id="navbar"
              style={{ top: this.state.topPos }}
            >
              <Container>
                <NavbarBrand href="/" onClick={() => this.goHome()} className="logo">
                  <img
                    src={this.props.imglight ? logolight : logodark}
                    alt=""
                    className="logo-light logo-custom"
                    height={32}
                  />
                </NavbarBrand>

                <NavbarToggler
                  className="navbar-toggler"
                  type="button"
                  aria-label="Toggle navigation"
                  onClick={this.toggle}
                >
                  <i className="remixicon-menu-fill" />
                </NavbarToggler>
                <Collapse
                  id="navbarCollapse"
                  isOpen={this.state.isOpenMenu}
                  navbar
                >
                  <Nav
                      navbar
                      className="navbar-nav mx-auto navbar-center"
                      id="mySidenav"
                    >
                      {this.state.navItems.map((item, key) => (
                        <NavItem
                          key={key}
                          className="nav-item">
                          {/* <Link target="_blank" to={{pathname: item.urlTo}} className="nav-link">
                            {" "}
                            {item.navheading}
                          </Link> */}
                        </NavItem>
                      ))}
                    </Nav>
                  {/* <ScrollspyNav
                    scrollTargetIds={targetId}
                    scrollDuration="150"
                    headerBackground="false"
                    activeNavClass="active"
                    navCenterClass={this.state.navCenterClass}
                  >
                    
                  </ScrollspyNav> */}
                    {this.state.hasRobot === true && (
                      <ul className="">
                        <li className="ios-list">
                            <a className="">
                              Howdy, {this.state.robot.name.split(' ')[0]}
                            </a>
                        </li>
                        <li className="ios-list">
                            <a className="" onClick={this.signOut}>
                              Sign Out
                            </a>
                        </li>
                      </ul>
                    )}
                    {this.state.hasRobot === false && (
                      <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href={process.env.REACT_APP_DOMAIN +'/employer/new/job'} className="btn btn-orange btn-pointed small-btn btn-simple a-btn post-job">
                              Post a job
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a href="/users/returning" className="btn btn-orange btn-pointed small-btn a-btn btn-simple-inv">
                              Sign In
                            </a>
                        </li> */}
                      </ul>
                    )}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="#" className="nav-link ios-social">
                        <i style={{color:"white"}} className="remixicon-facebook-line f-16" />
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="#" className="nav-link ios-social">
                        <i style={{color:"white"}} className="remixicon-twitter-line f-16" />
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="#" className="nav-link ios-social">
                        <i style={{color:"white"}} className="remixicon-instagram-line f-16" />
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          }
          stickyOffset={-100}
        ></StickyHeader>
      </React.Fragment>
    );
  }
}

export default NavbarPage;
