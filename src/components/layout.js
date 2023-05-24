import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Container } from "react-bootstrap";

import Header from "./header";
import "../style/layout.scss";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="layout-container">
      <Header siteTitle={data.site.siteMetadata.title} />

      <div className="content-container">
        <main className="main-content">
          <Container className="p-3">{children}</Container>
        </main>
      </div>

      <footer className="footer mt-auto py-3 bg-light text-black text-center">
        © {new Date().getFullYear()}, Built with
        {` `}
        Devpediacode Developer Team
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
