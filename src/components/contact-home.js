import React from "react";
import "../style/common.scss";
import { Col, Row } from "react-bootstrap";
import SEO from "../components/seo";

const ContactPage = () => {
  return (
    <div>
      <SEO title="お問い合わせ" />
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <Col className="contact-title-obi">
          <h1 className="h1-font">お問い合わせ</h1>
        </Col>
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <iframe
        class="responsive-iframe"
        src="https://forms.zohopublic.jp/zinwaiwainwe9999/form/ProductFeedback/formperma/tSM_DHuruFGY6V7MfGDnyPYG5nZwIbcI_-L9KgaKz4I"
      ></iframe>
    </div>
  );
};
export default ContactPage;
