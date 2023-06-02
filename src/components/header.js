import { Link } from "gatsby";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
import logo from "../images/home-logo.png";
import "../style/common.scss";

const Header = ({ siteTitle }) => (
  <Navbar className="navBg" bg="light" variant="light" expand="lg">
    <Navbar.Brand
      as={Link}
      href="/"
      className="siteTitle"
      style={{ width: "5%", height: "5%" }}
    >
      <img src={logo} style={{ width: "80%", height: "60%" }} alt="Home" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <NavItem href="/about">
          <Nav.Link
            as={Link}
            style={{ align: "bottom" }}
            activeClassName="active"
            to="/information"
          >
            記事一覧
          </Nav.Link>
        </NavItem>
        <NavItem href="/about">
          <Nav.Link
            as={Link}
            style={{ align: "bottom" }}
            activeClassName="active"
            to="/contact"
          >
            お問い合わせ
          </Nav.Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: `DevpediaCode`,
};

export default Header;
