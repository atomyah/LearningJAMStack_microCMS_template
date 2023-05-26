import React from "react";
import { Link, graphql } from "gatsby";
import { Row, Col, Card, Table } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import homeImg from "../images/Design1.png";
import aiImg1 from "../images/AI.jpg";
import aiImg2 from "../images/ai2.jpg";
import webImg1 from "../images/WEB.jpg";
import webImg2 from "../images/web2.jpg";
import iotImg1 from "../images/IOT.jpg";
import iotImg2 from "../images/iot2.jpg";
import "../style/common.scss";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Table className="homePage">
      <tbody>
        <tr>
          <td colSpan="2">
            <img src={homeImg} style={{ width: "100%" }} alt="Home" />
          </td>
        </tr>

        {data.allMicrocmsInformation.edges.map(({ node }) => (
          <React.Fragment key={node.id}>
            <tr>
              <td colSpan="2" className="title">
                {node.title}
              </td>
            </tr>
            <tr>
              <td className="article">
                <Card className="card">
                  {node.title === "IOT" && (
                    <Card.Img
                      variant="top"
                      src={iotImg1}
                      alt="IOT記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  {node.title === "AI" && (
                    <Card.Img
                      variant="top"
                      src={aiImg1}
                      alt="AI記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  {node.title === "WEB" && (
                    <Card.Img
                      variant="top"
                      src={webImg1}
                      alt="WEB記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      <Link
                        to={`/information/${node.id}`}
                        className="btn btn-primary link-design"
                      >
                        記事を読む
                      </Link>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </td>
              <td className="article">
                <Card style={{ width: "100%" }}>
                  {node.title === "IOT" && (
                    <Card.Img
                      variant="top"
                      src={iotImg2}
                      alt="IOT記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  {node.title === "AI" && (
                    <Card.Img
                      variant="top"
                      src={aiImg2}
                      alt="AI記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  {node.title === "WEB" && (
                    <Card.Img
                      variant="top"
                      src={webImg2}
                      alt="WEB記事"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>
                      <Link
                        to={`/information/${node.id}`}
                        className="btn btn-primary link-design"
                      >
                        記事を読む
                      </Link>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </td>
            </tr>
            <tr></tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  </Layout>
);

export default IndexPage;
export const query = graphql`
  query {
    allMicrocmsInformation(limit: 4, sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          date
          category {
            category
          }
        }
      }
    }
  }
`;
