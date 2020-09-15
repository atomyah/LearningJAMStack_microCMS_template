import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import homeImg from "../images/home.jpg"
import jigyo1Img from "../images/jigyo1.jpg"
import jigyo2Img from "../images/jigyo2.jpg"
import jigyo3Img from "../images/jigyo3.jpg"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Row style={{maxWidth:`960px`}}> 
        <img src={homeImg} style={{width:`100%`,marginBottom:`2rem`}} />
    </Row>
    <Row>
      <Col xs={12} md={6} style={{maxWidth:`480px`}}>
        <Row>
          <Col style={{backgroundColor:`cornflowerblue`,color:`white`,padding:`0.5rem`}}>インフォメーション</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>インフォメーション①</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>インフォメーション②</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>インフォメーション③</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>インフォメーション④</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>インフォメーション⑤</Col>
        </Row>
      </Col>
      <Col xs={12} md={6} style={{maxWidth:`480px`}}>
        <Row>
          <Col style={{backgroundColor:`cornflowerblue`,color:`white`,padding:`0.5rem`}}>IR情報</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>決算報告</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>社長挨拶（動画）</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>広告スペース</Col>
        </Row>
        <Row>
          <Col style={{padding:`0.5rem`}}>広告スペース</Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col style={{backgroundColor:`cornflowerblue`,color:`white`,padding:`0.5rem`,maxWidth:`960px`,marginTop:`2rem`}}>事業内容</Col>
    </Row>
    <Row>
      <Col style={{maxWidth:`960px`}}>
        <Row>
          <Col xs={6} md={4}>
            <Card style={{marginTop:`1rem`}}>
              <Card.Img variant="top" src={jigyo1Img} alt={`軌道上デブリ除去`} />
              <Card.Body>
                <Card.Title style={{fontSize:`1rem`}}>軌道上デブリ除去</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card style={{marginTop:`1rem`}}>
              <Card.Img variant="top" src={jigyo2Img} alt={`テレポーテーションゲート開設`} />
              <Card.Body>
                <Card.Title style={{fontSize:`1rem`}}>テレポーテーションゲート開設</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={4}>
            <Card style={{marginTop:`1rem`}}>
              <Card.Img variant="top" src={jigyo3Img} alt={`業子力学による量子コントロール`} />
              <Card.Body>
                <Card.Title style={{fontSize:`1rem`}}>業子力学による量子コントロール</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
    <Row>
      <Col style={{maxWidth:`960px`, paddingTop:`3rem`}}></Col>
    </Row>
  </Layout>
);

export default IndexPage;