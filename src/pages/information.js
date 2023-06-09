import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { Col, Row, Card } from "react-bootstrap";
import { uniqBy } from "lodash";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/common.scss";

const InformationPage = ({ location, data }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category ?? null
  );

  const categories = uniqBy(
    data.allMicrocmsInformation.edges.map(({ node }) => node.category),
    "category"
  );

  const handleCategorySelect = category => {
    if (category === selectedCategory) {
      return; // Prevent changing category if it's already selected
    }

    setSelectedCategory(category);
  };

  useEffect(() => {
    setShareUrl(window.location.href);
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
        <Col xs={4} md={2}>
          <button
            className={`category-link ${
              selectedCategory === null ? "active" : ""
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            All
          </button>
        </Col>
        {categories.map(category => (
          <Col key={category.category} xs={4} md={2}>
            <button
              className={`category-link ${
                selectedCategory === category.category ? "active" : ""
              }`}
              onClick={() => handleCategorySelect(category.category)}
            >
              {category.category}
            </button>
          </Col>
        ))}
      </Row>
      <Row>
        {data.allMicrocmsInformation.edges
          .filter(
            ({ node }) =>
              !selectedCategory || node.category.category === selectedCategory
          )
          .map(({ node }) => (
            <Col xs={12} md={6} key={node.id}>
              <Card style={{ marginTop: "1rem" }}>
                <Card.Body>
                  <Card.Title>
                    <Link
                      to={`/information/${node.category.category}/${node.id}`}
                    >
                      {node.title}
                    </Link>
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
      <Link to="/" className="btn btn-primary link-design">
        Back to Home
      </Link>
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
