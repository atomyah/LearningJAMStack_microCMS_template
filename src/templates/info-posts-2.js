import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { Table, Col, Row } from "react-bootstrap";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Prism from "prismjs";
import "../style/layout.scss";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-haxe";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-json";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-stylus";
import "prismjs/components/prism-typescript";
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

const TableRow = ({ rowData }) => {
  return (
    <tr>
      {rowData.map((data, index) => (
        <td key={index}>
          {data}
        </td>
      ))}
    </tr>
  );
};

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

  const parseTable = tableString => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(tableString, "text/html");

    const rows = Array.from(doc.querySelectorAll("tr")).map(row => {
      return Array.from(row.querySelectorAll("td, th")).map(
        cell => cell.textContent
      );
    });

    return rows;
  };

  const renderTable = tableData => {
    const headerRow = tableData.shift(); // Remove the first row (header) from the data

    return (
      <table className="postTable">
        <thead>
          <tr>
            {headerRow.map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <TableRow key={index} rowData={rowData} />
          ))}
        </tbody>
      </table>
    );
  };

  const getCodeElements = htmlString => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Extract language from code block comment, e.g., // language: javascript
    const codeElement = doc.querySelector("code");
    const classAttribute = codeElement?.getAttribute("class") || "";
    let language = classAttribute?.replace("language-", "") ?? "javascript";
    const codeContent = doc.documentElement.textContent;

    return {
      language: language,
      codeContent: codeContent,
    };
  };

  const parseContent = () => {
    if (typeof window !== `undefined`) {
      const regex = /(<pre><code\b[^>]*>[\s\S]*?<\/code><\/pre>)|(<p\b[^>]*>[\s\S]*?<\/p>)|(<figure\b[^>]*>[\s\S]*?<img\b[^>]*>[\s\S]*?<\/figure>)|(<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>)|<b\b[^>]*>[\s\S]*?<\/b>|<i\b[^>]*>[\s\S]*?<\/i>|<u\b[^>]*>[\s\S]*?<\/u>|<table\b[^>]*>[\s\S]*?<\/table>|<ul\b[^>]*>[\s\S]*?<\/ul>|<ol\b[^>]*>[\s\S]*?<\/ol>|<li\b[^>]*>[\s\S]*?<\/li>|<strike\b[^>]*>[\s\S]*?<\/strike>|<blockquote\b[^>]*>[\s\S]*?<\/blockquote>|<div class="iframely-embed">[\s\S]*?<\/div>|<a\b[^>]*>[\s\S]*?<\/a>|<hr\b[^>]*>|<br\b[^>]*>/gi;
      const matches = post.body.match(regex);
      const parsedLines = [];

      if (matches) {
        matches.forEach((match, index) => {
          if (match.startsWith("<pre><code")) {
            // Handle <pre><code> (multi-line codeblock) tags
            // Extract content within <code> tags
            const htmlString = match.replace(/<\/?pre>|<\/?code>/gi, "");
            const elements = getCodeElements(htmlString);

            if (
              elements.language === "routeros" ||
              elements.language === "reasonml" ||
              elements.language === "" ||
              elements.language === " " ||
              elements.language === undefined
            ) {
              elements.language = "javascript";
            }

            parsedLines.push(
              <SyntaxHighlighter
                key={index}
                language={elements.language}
                style={customDarcula}
              >
                {elements.codeContent}
              </SyntaxHighlighter>
            );
          } else if (match.startsWith("<p")) {
            // Handle <p> (paragraph) tags
            const paragraph = match;
            const codeMatches = paragraph.split("<br>");
            if (codeMatches) {
              codeMatches.forEach((codeMatch, codeIndex) => {
                if (codeMatch.startsWith("<code")) {
                  const htmlString = codeMatch.replace(/<\/?code>/gi, "");
                  const elements = getCodeElements(htmlString);
                  parsedLines.push(
                    <SyntaxHighlighter
                      key={`${index}-${codeIndex}`}
                      language={"javascript"}
                      style={customDarcula}
                    >
                      {elements.codeContent}
                    </SyntaxHighlighter>
                  );
                } else {
                  parsedLines.push(
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{ __html: codeMatch }}
                    />
                  );
                }
              });
            }
          } else if (match.startsWith("<figure><img")) {
            // Handle <img>(Image) tags
            const imgElement = new DOMParser()
              .parseFromString(match, "text/html")
              .querySelector("img");
            const srcAttribute = imgElement?.getAttribute("src") || "";
            const altAttribute = imgElement?.getAttribute("alt") || "";

            if (srcAttribute) {
              parsedLines.push(
                <div className="imgContainer">
                  <img
                    className="imgStyle"
                    key={index}
                    src={srcAttribute}
                    alt={altAttribute}
                  />
                </div>
              );
            } else {
              parsedLines.push(<p key={index}>Image Not Found</p>);
            }
          } else if (match.match(/^<h[1-6]/)) {
            // Handle <h>(h1~h6) tags
            const headingLevel = match.charAt(2); // Get the heading level (1 to 6)
            const htmlString = match.replace(
              new RegExp(`<\/?h${headingLevel}>`, "gi"),
              ""
            );
            parsedLines.push(
              React.createElement(`h${headingLevel}`, {
                key: index,
                dangerouslySetInnerHTML: { __html: htmlString },
              })
            );
          } else if (match.startsWith("<ul")) {
            // Handle <ul> (unordered list) tags
            const htmlString = match.replace(/<\/?ul>/gi, "");
            parsedLines.push(
              <ul
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
                className="ulStyle"
              />
            );
          } else if (match.startsWith("<li")) {
            // Handle <li> (list item) tags
            const htmlString = match.replace(/<\/?li>/gi, "");
            parsedLines.push(
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
              />
            );
          } else if (match.startsWith("<ol")) {
            // Handle <ol> (ordered list) tags
            const htmlString = match.replace(/<\/?ol>/gi, "");
            parsedLines.push(
              <ol
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
                className="olStyle"
              />
            );
          } else if (match.startsWith("<u")) {
            // Handle <u> (underline) tags
            const htmlString = match.replace(/<\/?u>/gi, "");
            parsedLines.push(
              <u key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
            );
          } else if (match.startsWith("<b")) {
            // Handle <b> (bold) tags
            const htmlString = match.replace(/<\/?b>/gi, "");
            parsedLines.push(
              <b key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
            );
          } else if (match.startsWith("<strike")) {
            // Handle <strike> (strikethrough) tags
            const htmlString = match.replace(/<\/?strike>/gi, "");
            parsedLines.push(
              <strike
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
              />
            );
          } else if (match.startsWith("<i")) {
            // Handle <i> (italic) tags
            const htmlString = match.replace(/<\/?i>/gi, "");
            parsedLines.push(
              <i key={index} dangerouslySetInnerHTML={{ __html: htmlString }} />
            );
          } else if (match.startsWith("<table")) {
            // Handle <table> tags
            const tableData = parseTable(match); // Call a function to extract table data
            parsedLines.push(renderTable(tableData));
          } else if (match.startsWith("<blockquote")) {
            // Handle <blockquote> tags
            const htmlString = match.replace(/<\/?blockquote>/gi, "");
            parsedLines.push(
              <blockquote
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
              />
            );
          } else if (match.startsWith('<div class="iframely-embed"')) {
            // Handle <iframe> tags
            const iframeUrl = match.match(
              /<a\b[^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>/i
            );
            if (iframeUrl && iframeUrl[1]) {
              const htmlString = iframeUrl[1];
              parsedLines.push(
                <iframe
                  key={index}
                  src={htmlString}
                  title={`Embedded Content ${index}`}
                  className="iframeStyle"
                />
              );
            }
          } else if (match.startsWith("<a")) {
            // Handle <a> (link) tags
            const htmlString = match.replace(/<\/?a>/gi, "");
            parsedLines.push(
              <a
                className="postLinkStyle"
                key={index}
                dangerouslySetInnerHTML={{ __html: htmlString }}
              />
            );
          } else if (match.startsWith("<hr")) {
            // Handle <hr> (horizontal rule) tags
            parsedLines.push(<hr key={index} />);
          } else if (match.startsWith("<br")) {
            // Handle <br> (line break) tags
            parsedLines.push(<br key={index} />);
          }
        });
      }
      return parsedLines;
    }
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
                <p className="dateStyle">{`Posted at ${post.date}`}</p>
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
