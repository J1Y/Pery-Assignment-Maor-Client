import { useState } from "react";
import { Layout } from "./Layout";
import { EnterEmailPage } from "./Pages/EnterEmailPage";
import { ChooseLanguagePage, LANGUAGES } from "./Pages/ChooseLanguagePage";
import { EnterArticlePage } from "./Pages/EnterArticlePage";
import { ReadArticlePage } from "./Pages/ReadArticlePage";
import "./styles.css";

export const SERVER_URL = "http://localhost:3000";

export const ENTER_EMAIL_PAGE = 1;
export const CHOOSE_LANGUAGE_PAGE = 2;
export const ENTER_ARTICLE_PAGE = 3;
export const READ_ARTICLE_PAGE = 4;

function App() {
  const [page, setPage] = useState(ENTER_EMAIL_PAGE);
  const [email, setEmail] = useState("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof typeof LANGUAGES>("en");
  const [token, setToken] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [articleData, setArticleData] = useState<any>(null);
  const [articleError, setArticleError] = useState("");

  return (
    <>
      {(() => {
        switch (page) {
          case ENTER_EMAIL_PAGE:
            return (
              <Layout text={`Welcome to\nPery!`}>
                <EnterEmailPage
                  email={email}
                  setEmail={setEmail}
                  setPage={setPage}
                />
              </Layout>
            );
          case CHOOSE_LANGUAGE_PAGE:
            return (
              <Layout text={`Welcome to\nPery!`}>
                <ChooseLanguagePage
                  tokenError={tokenError}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  setPage={setPage}
                  email={email}
                  setToken={setToken}
                  setTokenError={setTokenError}
                />
              </Layout>
            );
          case ENTER_ARTICLE_PAGE:
            return (
              <Layout text={`Welcome to\nPery!`}>
                <EnterArticlePage
                  token={token}
                  setPage={setPage}
                  setArticleData={setArticleData}
                  setArticleError={setArticleError}
                />
              </Layout>
            );
          case READ_ARTICLE_PAGE:
            return (
              <Layout text={`All set! read\nyour article`}>
                <ReadArticlePage
                  articleData={articleData}
                  articleError={articleError}
                  setPage={setPage}
                />
              </Layout>
            );
          default:
            return <p>if you see this something went wrong</p>;
        }
      })()}
    </>
  );
}

export default App;
