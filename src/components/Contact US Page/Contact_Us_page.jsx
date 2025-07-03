import React from 'react';
import './Contact_Us_page.css';

function App() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="heading text-center" id="Space">
          <h2>Contact <span> Us </span></h2>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="title">
              <h3>Contact details</h3>
              <p>Contact Us for further queries</p>
            </div>
            <div className="content">
              <div className="info">
                <i className="fas fa-mobile-alt"></i>
                <h4 className="d-inline-block">PHONE :
                  <br />
                  <span>+91 0000000000 , +91 0000000000</span>
                </h4>
              </div>
              <div className="info">
                <i className="far fa-envelope"></i>
                <h4 className="d-inline-block">EMAIL :
                  <br />
                  <span>example@gmail.com</span>
                </h4>
              </div>
              <div className="info">
                <i className="fas fa-map-marker-alt"></i>
                <h4 className="d-inline-block">ADDRESS :<br />
                  <span>Wadgaonsheri, Pune-411014</span>
                </h4>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <input type="text" className="form-control" placeholder="Name" />
                </div>
                <div className="col-sm-6">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="col-sm-12">
                  <input type="text" className="form-control" placeholder="Subject" />
                </div>
              </div>
              <div className="form-group">
                <textarea className="form-control" rows="5" id="comment" placeholder="Message"></textarea>
              </div>
              <button className="btn btn-block" type="submit">Send Now!</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

