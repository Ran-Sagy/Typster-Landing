import React, { Component } from "react";
import { FiMenu } from "react-icons/fi";

class Navnar extends Component {
  state = {};

  render() {
    return (
      <header dir="rtl" className="">
        <nav className="header-inner navbar navbar-expand-lg ">
          {" "}
          <a className="logo" href="/">
            <img
              className="maxh"
              height="80px"
              src={
                "https://res.cloudinary.com/prodme-app-cloud-6/image/upload/v1622814410/images/%D7%9C%D7%95%D7%92%D7%95_%D7%A4%D7%99%D7%AA%D7%95%D7%97_%D7%9C%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98_ktlruf.png"
              }
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FiMenu />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul>
              {/* <li>
                <a className="font4 nav-link " href="/">
                  דפי נחיתה
                </a>
              </li>
              <li>
                <a className="font4 nav-link " href="/">
                  פיתוח מערכות
                </a>
              </li> */}

              <li className="">
                {" "}
                <a className="btn btn-outline-secondary font2 " href="#contact">
                  פה הכל מתחיל {""}{" "}
                </a>{" "}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navnar;
