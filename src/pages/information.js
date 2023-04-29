// pages/information.js
import React from "react";
import { Link, graphql } from "gatsby";
import { Col, Row, Card } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";

const InformationPage = ({ data }) => (
  <Layout>
    <SEO title="インフォメーション" />
    <Row>
      <Col className="space"></Col>
    </Row>
    <Row>
      <Col className="title-obi">
        <h1 className="h1-font">インフォメーション</h1>
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
  </Layout>
);

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
