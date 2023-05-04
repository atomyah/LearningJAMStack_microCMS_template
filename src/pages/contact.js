import React from "react";
import Layout from "../components/layout";
import Contact from "../components/contact-home";
import SEO from "../components/seo";

const ContactPage = () => (
  <Layout>
    <SEO title="お問い合わせ" />
    <Contact />
  </Layout>
);

export default ContactPage;
