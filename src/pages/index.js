import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Contact from "../components/contact-home";
import { Link, graphql } from "gatsby";
import homeImg from "../images/home.jpg";
import jigyo1Img from "../images/jigyo1.jpg";
import jigyo2Img from "../images/jigyo2.jpg";
import jigyo3Img from "../images/jigyo3.jpg";
import aiImg1 from "../images/AI.jpg";
import aiImg2 from "../images/ai2.jpg";
import webImg1 from "../images/WEB.jpg";
import webImg2 from "../images/web2.jpg";
import iotImg1 from "../images/IOT.jpg";
import iotImg2 from "../images/iot2.jpg";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Row style={{ maxWidth: `960px` }}>
      <img src={homeImg} style={{ width: `100%`, marginBottom: `2rem` }} />
    </Row>

    {data.allMicrocmsInformation.edges.map(({ node }) => (
      <div>
        <Row>
          <Col
            style={{
              backgroundColor: `cornflowerblue`,
              color: `white`,
              padding: `0.5rem`,
              maxWidth: `960px`,
              marginTop: `2rem`,
            }}
          >
            {node.title}
          </Col>
        </Row>
        <Row
          style={{
            color: `white`,
            padding: 0,
            maxWidth: `960px`,
            marginTop: `2rem`,
          }}
        >
          <Col style={{ borderColor: `blue` }}>
            <Card>
              {node.title === "IOT" && (
                <Card.Img
                  variant="top"
                  src={iotImg1}
                  alt={`軌道上デブリ除去`}
                />
              )}
              {node.title === "AI" && (
                <Card.Img variant="top" src={aiImg1} alt={`軌道上デブリ除去`} />
              )}
              {node.title === "WEB" && (
                <Card.Img
                  variant="top"
                  src={webImg1}
                  alt={`軌道上デブリ除去`}
                />
              )}
              <Card.Body>
                <Card.Title style={{ fontSize: `1rem` }}>
                  <Link to={`/information/${node.id}`}>軌道上デブリ除去</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ borderColor: `blue` }}>
            <Card>
              {node.title === "IOT" && (
                <Card.Img
                  variant="top"
                  src={iotImg2}
                  alt={`軌道上デブリ除去`}
                />
              )}
              {node.title === "AI" && (
                <Card.Img variant="top" src={aiImg2} alt={`軌道上デブリ除去`} />
              )}
              {node.title === "WEB" && (
                <Card.Img
                  variant="top"
                  src={webImg2}
                  alt={`軌道上デブリ除去`}
                />
              )}
              <Card.Body>
                <Card.Title style={{ fontSize: `1rem` }}>
                  <Link to={`/information/${node.id}`}>
                    テレポーテーションゲート開設
                  </Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    ))}

    {/* <Row>
      <Col style={{ maxWidth: `960px` }}>
        <Row>
          <Col xs={6} md={4}>
            <Card style={{ marginTop: `1rem` }}>
              <Card.Img
                variant="top"
                src={jigyo1Img}
                alt={`軌道上デブリ除去`}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: `1rem` }}>
                  軌道上デブリ除去
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card style={{ marginTop: `1rem` }}>
              <Card.Img
                variant="top"
                src={jigyo2Img}
                alt={`テレポーテーションゲート開設`}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: `1rem` }}>
                  テレポーテーションゲート開設
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card style={{ marginTop: `1rem` }}>
              <Card.Img
                variant="top"
                src={jigyo3Img}
                alt={`業子力学による量子コントロール`}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: `1rem` }}>
                  業子力学による量子コントロール
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row> */}
    <Row>
      <Col style={{ maxWidth: `960px`, paddingTop: `3rem` }}></Col>
    </Row>
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
