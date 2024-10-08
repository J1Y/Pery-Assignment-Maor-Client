import { ReactNode } from "react";
import "./Layout.css";
import CompeteLogo from "./assets/compete.svg";
import faqsAndHelpIcon from "./assets/faqsAndHelpIcon.svg";

export function Layout({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <div className="whole-page">
      <div className="gradient-div">
        <div className="gradient-content-div">
          <img className="compete-logo" src={CompeteLogo} />
          <p className="gredient-text">{text}</p>
        </div>
      </div>
      <div className="content">
        {children}
        <a href="https://www.mypery.com/#faqs" className="faqs-help-button">
          <img src={faqsAndHelpIcon} className="faqs-help-icon" />
          FAQs & help
        </a>
        <div className="shade" />
      </div>
    </div>
  );
}
