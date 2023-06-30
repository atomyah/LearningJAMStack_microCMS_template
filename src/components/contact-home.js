import React from "react";
import SEO from "../components/seo";
import "../style/layout.scss";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <SEO title="お問い合わせ" />
      <iframe
        class="responsive-iframe"
        src="https://forms.zohopublic.jp/zinwaiwainwe9999/form/AssetRequestForm/formperma/ZvbGk7T_omPBy6o3BSwfdhBp-RsOGfqE4Zb2A0DePxQ"
      ></iframe>
    </div>
  );
};
export default ContactPage;
