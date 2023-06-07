// pages/information.js
import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { Col, Row, Card } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";
import "../style/common.scss"; // Import custom CSS file for styling

const InformationPage = ({ data }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href); // Get the current page's URL on the client-side
  }, []);

  return (
    <Layout>
      <SEO title="記事一覧" />
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        <Col className="title-obi">
          <h1 className="h1-font">記事一覧</h1>
        </Col>
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      <Row>
        {data.allMicrocmsInformation.edges.map(({ node }) => (
          <Col xs={12} md={6} key={node.id}>
            <Card style={{ marginTop: "1rem" }}>
              <Card.Body>
                <Card.Title>
                  <Link to={node.id}>{node.title}</Link>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {node.date}
                  {``}
                  {node.category.category}
                </Card.Subtitle>
                <Card.Text>{node.exerpt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="space"></Col>
      </Row>
      {/* Share Button Container */}
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

export default InformationPage;

export const query = graphql`
  query MyQuery {
    allMicrocmsInformation(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          exerpt
          body
          title
          date(formatString: "YYYY 年 MM 月 DD 日")
          category {
            category
          }
        }
      }
    }
  }
`;
