import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import axios from "axios";
// import leadService from "../Services/leadService";
import moment from "moment";

class ContactForm extends Form {
  state = {
    data: { phone: "", name: "", email: "" },
    errors: {},
    newLead: false,
  };

  schema = {
    phone: Joi.string().regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/),
    name: Joi.string().required().min(2).label("Name"),
    email: Joi.string()
      .required()
      .min(2)
      .label("email")
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
  };

  doSubmit = async () => {
    console.log("works");
    const apiUrl = "https://typster-api.herokuapp.com/api";
    // const apiUrl = "http://localhost:3500/api";
    const refreshForm = {
      phone: "",
      name: "",
      email: "",
    };
    const { phone, name, email } = this.state.data;
    moment.locale();
    const lead = {};
    lead.phone = phone;
    lead.name = name;
    lead.email = email;
    lead.Customazetion = false;
    lead.origin = "landing";
    lead.date = moment().format("LL");
    try {
      await axios.post(`${apiUrl}/leads`, lead);
      this.setState({ newLead: true, data: refreshForm });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { phone: ex.response.data } });
      }
    }
  };

  render() {
    const { newLead } = this.state;
    return (
      <div className="col-8">
        <div
          id="contactUs"
          className="col-lg-12 col-md-8 col-sm-12 ml-auto font3"
        >
          <div className="">
            <div className="text-center mt-5">
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                method="POST"
                className="input-group mb-3"
              >
                <div className="row">
                  {this.renderInput("phone", "טלפון", "tel")}
                  {this.renderInput("email", "מייל", "email")}
                  {this.renderInput("name", "שם", "text")}
                  <div className="col-12">{this.renderButton("תחזרו אלי")}</div>
                </div>
              </form>
            </div>

            {newLead && (
              <div className="text-center">
                <h5 className="font text-center ml-3">נדבר בקרוב! </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactForm;
