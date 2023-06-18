/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// gatsby-node.js
// 「5.3.3 インフォメーション詳細ページ（動的ページ）の作成」
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(
    `
      {
        allMicrocmsInformation {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allMicrocmsInformation.edges.forEach(edge => {
      createPage({
        path: `/information/${edge.node.id}`,
        component: path.resolve(`./src/templates/info-posts.js`),
        context: {
          id: edge.node.id,
        },
      });
    });
  });
};
// 末尾のスラッシュを削除するヘルパー関数
const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))

// Gatsby の onCreatePage API を使用
exports.onCreatePage = ({ page, actions }) => {
  // actions オブジェクトから createRedirect 関数を取得
  const { createRedirect } = actions

  // ページのパスに '.html' が含まれていない場合、またはルートパス ('/') ではない場合に実行
  if(!page.path.includes('.html') && page.path !== '/') {
    // 末尾にスラッシュがあるパスからスラッシュを削除したパスへのリダイレクトを作成
    createRedirect({ fromPath: `${page.path}/`, toPath: page.path, isPermanent: true })
  }
}