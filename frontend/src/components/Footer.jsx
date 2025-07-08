import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 position-relative" style={{top:"200px"}} >
      {/* Back to Top */}
      <div className="text-center py-3 border-bottom border-secondary" style={{backgroundColor:"#37475a",position:"relative",bottom:"24px"}}>
        <a href="#top" className="text-light text-decoration-none">Back to Top</a>
      </div>

      {/* Footer Content */}
      <div className="container py-4">
        <div className="row text-start">
          {Array(4).fill(0).map((_, i) => (
            <div className="col-6 col-md-3 mb-4" key={i}>
              <h6 className="text-uppercase fw-bold mb-3">Get to Know Us</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
                <li><a href="#" className="text-light text-decoration-none">About Amazon</a></li>
                <li><a href="#" className="text-light text-decoration-none">Investor Relations</a></li>
                <li><a href="#" className="text-light text-decoration-none">Amazon Devices</a></li>
                <li><a href="#" className="text-light text-decoration-none">Amazon Science</a></li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-secondary text-center text-light py-3">
        <div>
          <a href="#" className="text-light mx-2 text-decoration-none">Conditions of Use</a>
          <a href="#" className="text-light mx-2 text-decoration-none">Privacy Notice</a>
          <a href="#" className="text-light mx-2 text-decoration-none">Your Ads Privacy Choices</a>
        </div>
        <div className="mt-2 text-light">
          © 1996–2025, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
};

export default Footer;
