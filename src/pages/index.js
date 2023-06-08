import React from "react";
import { Link, graphql, navigate } from "gatsby";
import { Row, Col, Card, Table } from "react-bootstrap";
import SEO from "../components/seo";
import Layout from "../components/layout";
import homeImg from "../images/home.png";
import "../style/common.scss";

const IndexPage = ({ data }) => {
  const handleCategoryClick = category => {
    // Navigate to the Information page with the selected category parameter
    navigate("/information", {
      state: { category: category },
    });
  };

  const articlesPerRow = 2;

  const createArticleCards = (articles, category) => {
    const articleCards = [];

    for (let i = 0; i < articles.length; i += articlesPerRow) {
      const row = articles.slice(i, i + articlesPerRow).map(({ node }) => (
        <Col key={node.id} md={6} style={{ marginBottom: "1rem" }}>
          <Card>
            <Link to={`/information/${category}/${node.id}`}>
              <Card.Img
                variant="top"
                src={node.image.url}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title style={{ height: "40px", objectFit: "cover" }}>
                  {node.title}
                </Card.Title>
                <Link
                  to={`/information/${category}/${node.id}`}
                  className="btn btn-primary link-design"
                >
                  記事を読む
                </Link>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ));

      articleCards.push(
        <Row key={i} style={{ justifyContent: "space-between" }}>
          {row}
        </Row>
      );
    }

    articleCards.push(
      <Row key="view-more">
        <button
          style={{
            marginLeft: "30px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000000",
            border: "none",
            backgroundColor: "#ffffff",
          }}
          onClick={() => handleCategoryClick(category)}
        >
          もっと見る &gt;&gt;&gt;
        </button>
      </Row>
    );

    return articleCards;
  };

  return (
    <Layout>
      <SEO title="Home" />
      <Table>
        <tbody
          style={{
            borderCollapse: "collapse",
            borderColor: "cornflowerblue 1px",
          }}
        >
          <tr>
            <td colSpan="2">
              <img
                src={homeImg}
                style={{ width: "102%", margin: "45px 0px 5px -12px" }}
                alt="Home"
              />
            </td>
          </tr>
          <tr className="title borderStyle">
            <td>
              <button
                className="title-btn"
                onClick={() => handleCategoryClick("IOT")}
              >
                IOT
              </button>
            </td>
          </tr>
          <tr className="borderStyle">
            <td colSpan="2">{createArticleCards(data.iot.edges, "IOT")}</td>
          </tr>
          <tr className="title borderStyle">
            <td>
              <button
                className="title-btn"
                onClick={() => handleCategoryClick("WEB")}
              >
                WEB
              </button>
            </td>
          </tr>
          <tr className="borderStyle">
            <td colSpan="2">{createArticleCards(data.web.edges, "WEB")}</td>
          </tr>
          <tr className="title borderStyle">
            <td>
              <button
                className="title-btn"
                onClick={() => handleCategoryClick("AI")}
              >
                AI
              </button>
            </td>
          </tr>
          <tr className="borderStyle">
            <td colSpan="2">{createArticleCards(data.ai.edges, "AI")}</td>
          </tr>
        </tbody>
      </Table>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    iot: allMicrocmsInformation(
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { category: { category: { eq: "IOT" } } }
    ) {
      edges {
        node {
          id
          date
          title
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
    ai: allMicrocmsInformation(
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { category: { category: { eq: "AI" } } }
    ) {
      edges {
        node {
          id
          date
          title
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
    web: allMicrocmsInformation(
      limit: 4
      sort: { fields: date, order: DESC }
      filter: { category: { category: { eq: "WEB" } } }
    ) {
      edges {
        node {
          id
          date
          title
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
