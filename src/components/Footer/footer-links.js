import React, { Component } from "react";

class FooterLinks extends Component {
  render() {
    let newDate = new Date()
    let year = newDate.getFullYear();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center mt-4">
              <p className="text-muted f-15 mb-0">
                {year} © healtHire.
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FooterLinks;
