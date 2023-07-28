import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { Table, Col, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Prism from "prismjs";
import "../style/layout.scss";
import "prismjs/themes/prism.css";

//import "prismjs/components/prism-arduino";
//import "prismjs/components/prism-apache";

import "prismjs/components/prism-c";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csharp";

// import "prismjs/components/prism-graphql";
// import "prismjs/components/prism-groovy";

// //import "prismjs/components/prism-html";
//import "prismjs/components/prism-handlebars";
import "prismjs/components/prism-haxe";
import "prismjs/components/prism-haskell";

import "prismjs/components/prism-ini";

import "prismjs/components/prism-json";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";

import "prismjs/components/prism-markdown";

import "prismjs/components/prism-objectivec";

// import "prismjs/components/prism-php";
// //import "prismjs/components/prism-plaintext";
// //import "prismjs/components/prism-postgresql";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";

import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";

import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";

import "prismjs/components/prism-typescript";

// import "prismjs/components/prism-vbnet";
// //import "prismjs/components/prism-vbscript";

import "prismjs/components/prism-yaml";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const customDarcula = {
    ...darcula,
    'code[class*="language-"]': {
      ...darcula['code[class*="language-"]'],
      textShadow: "none",
      fontSize: "16px",
    },
    "@media (max-width: 767px)": {
      'code[class*="language-"]': {
        fontSize: "14px",
      },
    },
  };

  useEffect(() => {
    setShareUrl(window.location.href);
    Prism.highlightAll();
  }, []);

  const parseContent = () => {
    const regex = /(<pre><code\b[^>]*>[\s\S]*?<\/code><\/pre>)|(<p\b[^>]*>[\s\S]*?<\/p>)/gi;
    const matches = post.body.match(regex);
    const parsedLines = [];

    if (matches) {
      matches.forEach((match, index) => {
        if (match.startsWith("<pre><code")) {
          // Extract content within <code> tags
          const htmlString = match.replace(/<\/?pre>|<\/?code>/gi, "");
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlString, "text/html");

          // Extract language from code block comment, e.g., // language: javascript
          const codeElement = doc.querySelector("code");
          const classAttribute = codeElement?.getAttribute("class") || "";
          const language = classAttribute.replace("language-", "");

          const codeContent = doc.documentElement.textContent;

          parsedLines.push(
            <SyntaxHighlighter
              key={index}
              language={language}
              style={language === " " ? "javascript" : customDarcula}
            >
              {codeContent}
            </SyntaxHighlighter>
          );
        } else if (match.startsWith("<p")) {
          parsedLines.push(
            <p key={index} dangerouslySetInnerHTML={{ __html: match }} />
          );
        }
      });
    }
    return parsedLines;
  };

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
      <div className="table-container">
        <Table className="post-details-table">
          <Row className="margin-left-5">
            <Col className="title-obj">
              <h1 className="post-details-title-font">{post.title}</h1>
            </Col>
          </Row>
          <Row className="margin-left-5">
            <Col>
              <div className="post-details">
                <p>{`Posted at ${post.date}`}</p>
              </div>
            </Col>
          </Row>
          <Row className="adjust-Row">
            <Col className="space"></Col>
          </Row>
          <Row className="post-details-body">{parseContent(customDarcula)}</Row>
          <Row>
            <Col className="space"></Col>
          </Row>
          <Row className="back-link-row">
            <Col>
              <Link to="/" className="btn btn-primary back-link-design">
                Back to Home
              </Link>
            </Col>
            <Col className="d-flex justify-content-end">
              <div className="details-share-button-container d-flex align-items-center">
                <span
                  style={{
                    marginRight: "0.5rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  Share:
                </span>
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
