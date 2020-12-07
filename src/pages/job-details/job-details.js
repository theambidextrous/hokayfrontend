import React, { Component } from "react";
import NavbarPage from "../../components/Navbar/Navbar_Page";
import Section from "./section";
import Footer from "../../components/Footer/footer";

class Index6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: document.documentElement.scrollTop,
      imglight: false,
      navClass: "",
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <React.Fragment>
        {/* Importing Navbar */}

        <NavbarPage
          navclass={this.state.navClass}
          imglight={this.state.imglight}
        />
        <Section />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Index6;
