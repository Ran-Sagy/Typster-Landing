import React from "react";
// import { a } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer
        dir="rtl"
        className="footer pt-10 pb-5 mt-auto bg-light footer-dark mt-5 text-dark font2 text-dark shadow-lg"
      >
        <div className="container ">
          <div className="row ">
            <div className="col-lg-5 mt-5 text-right">
              <div className="footer-brand">
                {" "}
                <a className="" href="/">
                  <img
                    src={
                      "https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1615457386/images/logo-no-background_homjhf.png"
                    }
                    alt=""
                  />
                </a>
              </div>
              {/* <div className="col-12">פיתוח מערכות אינטרנט מורכבות ופשוטות</div> */}
            </div>
          </div>
          <hr />
          <div className="row align-items-center ">
            <div className="col-md-6 small">
              Copyright &copy; Typster {new Date().getFullYear()}
            </div>
            <div className="col-md-6 text-md-right small">
              <a href="/terms-of-use">תנאי שימוש</a>
              &middot;
              <a href="/privacy-policy">מדיניות פרטיות</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
