import "./style.css";

export default function Footer() {
  return (
    <footer className="container-fluid ">
      <div className="footer__maping position-relative">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.797925760561!2d108.15698081492097!3d16.075972588876766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218dbdcdee5fd%3A0x626956af503b9170!2zMjAzIEjhu5MgVMO5bmcgTeG6rXUsIEhvw6AgTWluaCwgTGnDqm4gQ2hp4buDdSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1625128255691!5m2!1sen!2s"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
        <div className="container-fluid footer__maping__wrapcontact position-md-absolute">
          <div className="footer__mapping--upper row p-5">
            <div className="col-12 col-md-4">
              <h3 className="mapping--upper__title">ADDRESS</h3>
              <p>
                908 New Hampshire Avenue Northwest #100, <br /> Washington, DC
                20037, United States
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h3 className="mapping--upper__title">PHONES</h3>
              <p>
                Phone: +1 916-875-2235 <br /> Mobile: +1 916-875-2235
                <br /> Fax: +1 916-875-2235
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h3 className="mapping--upper__title">CONTACTS</h3>
              <p>
                info@domain.ltd <br />
                thegem@domain.ltd <br />
                www.codex-themes.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid footer__bottom">
        <div className="container">
          <div className="wrap__footer row p-5">
            <div className="footer__introduction col-12 col-md-6 col-xl-4">
              <img
                src="https://codex-themes.com/thegem/sites/resort-hotel/wp-content/uploads/2019/02/6.png"
                alt="logo_footer"
              />
              <p>
                Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean
                sollicitudin, lorem quis bibendum auctor, nisi elit consequat
                ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet
                nibh id elit.
              </p>
            </div>
            <div className="footer__nav col-12 col-md-6 col-xl-4">
              <h3>Useful links</h3>
              <ul>
                <li>General Information For Users</li>
                <li>Interactive Fairy Tales</li>
                <li>Official Storybook Maker Website</li>
                <li>Everyday Mathematics Links</li>
                <li>Basic Knowledge and Experience</li>
              </ul>
            </div>
            <div className="footer__letter col-12 col-md-6 col-xl-4">
              <h3>Newsletter</h3>
              <p>
                Subscribe to our MailChimp newsletter and stay up to date with
                all events coming straight in your mailbox:
              </p>

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="your email"
                  aria-label="your email"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
