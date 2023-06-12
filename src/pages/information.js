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
  EmailShareButton,
  EmailIcon,
} from "react-share";
import Layout from "../components/layout";
import SEO from "../components/seo";
import "../style/common.scss";

const InformationPage = ({ location, data }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    location.state && location.state.category ? location.state.category : null
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
    setShareUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const emailBody = `記事一覧を共有します。\n`;

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
              <Card style={{ marginTop: "1rem", display: "flex" }}>
                <Card.Body style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div>
                      <Card.Title>
                        <Link
                          to={`/information/${node.category.category}/${node.id}`}
                        >
                          {node.title}
                        </Link>
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {node.date}
                      </Card.Subtitle>
                    </div>
                    {/* <div>
                      <Card.Text>{node.exerpt}</Card.Text>
                    </div> */}
                  </div>
                  <div>
                    <Card.Img
                      variant="top"
                      src={node.image.url}
                      style={{
                        marginLeft: "5px",
                        width: "150px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
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
          className="Demo__some-network__share-button"
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
        <EmailShareButton
          url={shareUrl}
          subject="Devpediacodeの記事一覧共有"
          body={emailBody}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
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
          image {
            url
            height
            width
          }
        }
      }
    }
  }
`;
