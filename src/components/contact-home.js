import React from "react";
import "../style/layout.scss";
import SEO from "../components/seo";

const ContactPage = () => {
  return (
    <div>
      <SEO title="お問い合わせ" />
      <iframe
        class="responsive-iframe"
        src="https://forms.zohopublic.jp/zinwaiwainwe9999/form/AssetRequestForm/formperma/ZvbGk7T_omPBy6o3BSwfdhBp-RsOGfqE4Zb2A0DePxQ"
      ></iframe>
    </div>
  );
};
export default ContactPage;
