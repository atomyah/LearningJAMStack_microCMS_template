import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { Table, Col, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/layout.scss";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const InformationPost = ({ data }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const post = data.microcmsInformation;
  const emailBody = `記事を共有します。\n`;

  return (
    <Layout>
      <SEO title={post.title} />
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <Table className="info-post">
        <Row className="margin-left-5">
          <Col className="title-obj">
            <h1 className="artical-title-font">{post.title}</h1>
          </Col>
        </Row>
        <Row className="margin-left-5">
          <Col>
            {"posted at "}
            {post.date}
          </Col>
        </Row>
        <Row className="margin-left-5">
          <Col style={{ fontWeight: "300" }}>{post.author.author}</Col>
        </Row>
        <Row>
          <Col className="space"></Col>
        </Row>
        <Row className="margin-left-15">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </Row>
        <Row>
          <Col className="space"></Col>
        </Row>
        <Row className="back-link-row">
          <Col>
            <div className="details-share-button-container d-flex align-items-center justify-content-start">
              <p
                style={{
                  padding: "5% 0% 0% 0%",
                  marginRight: "1rem",
                  marginLeft: "1rem",
                }}
              >
                Share:
              </p>
              <FacebookShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
                quote={"Dummy text!"}
                hashtag="#muo"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                quote={"Dummy text!"}
                hashtag="#muo"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LineShareButton url={shareUrl} quote={"Dummy text!"}>
                <LineIcon size={32} round />
              </LineShareButton>
              <EmailShareButton
                url={shareUrl}
                subject="Devpediacodeの記事一覧共有"
                body={emailBody}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </Col>
        </Row>
      </Table>
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
      author {
        author
      }
      body
      category {
        category
      }
    }
  }
`;
