import React, { Component } from "react";
import Link from "next/link";
import Axios from "axios";

// This is a React class component instead of a React functional component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  logout = async () => {
    try {
      await Axios.post("http://localhost:3000/api/logout");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a title="Boomerang">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/sign-up">
              <a title="Sign Up">Sign Up</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a title="Login">Login</a>
            </Link>
          </li>
          <li onClick={() => this.logout()}>
            <Link href="/">
              <a title="Logout">Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
