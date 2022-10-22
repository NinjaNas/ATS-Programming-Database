import React, { Component } from "react";
import Link from "next/link";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <nav>
        <div>
          <Link href="/">
            <a title="Boomerang">Home</a>
          </Link>
          <Link href="/sign-up">
            <a title="Sign Up">Sign Up</a>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
