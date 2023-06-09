import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Col, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/layout.scss";
import "../style/common.scss";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const InformationPost = ({ data }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const post = data.microcmsInformation;

  return (
    <Layout>
      <SEO title={post.title} />
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <Col className="title-obj">
          <h1 className="artical-title-font margin-left-minus-15">
            {post.title}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col className="margin-left-minus-15">
          {post.date}
          {``}
          {post.category.category}
        </Col>
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <div className="share-button-container">
        <p>Share this page:</p>
        <FacebookShareButton
          url={shareUrl}
          quote={"Dummy text!"}
          hashtag="#muo"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} quote={"Dummy text!"} hashtag="#muo">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LineShareButton url={shareUrl} quote={"Dummy text!"}>
          <LineIcon size={32} round />
        </LineShareButton>
      </div>
    </Layout>
  );
};

export default InformationPost;

export const query = graphql`
  query($id: String!) {
    microcmsInformation(id: { eq: $id }) {
      id
      title
      date(formatString: "YYYY 年 MM 月 DD 日")
      body
      category {
        category
      }
    }
  }
`;
