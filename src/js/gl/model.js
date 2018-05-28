import observable from "proxy-observable";

class MODEL {
  constructor(props) {
    this.store = observable({
      ...props,
      activeVideoTypes:['webcam', 'canvas']
    });
  }
}

module.exports = new MODEL();
