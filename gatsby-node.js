// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

// You can delete this file if you're not using it
// gatsby-node.js
// 「5.3.3 インフォメーション詳細ページ（動的ページ）の作成」

const path = require("path");
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMicrocmsInformation {
        edges {
          node {
            id
            category {
              category
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  const informationTemplate = require.resolve("./src/templates/info-posts.js");
  result.data.allMicrocmsInformation.edges.forEach(({ node }) => {
    createPage({
      path: `/information/${node.category.category}/${node.id}`,
      component: informationTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
