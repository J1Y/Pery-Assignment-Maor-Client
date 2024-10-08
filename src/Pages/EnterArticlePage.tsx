import { useRef } from "react";
import { READ_ARTICLE_PAGE, SERVER_URL } from "../App";

export function EnterArticlePage({
  token,
  setPage,
  setArticleData,
  setArticleError,
}: {
  token: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setArticleData: React.Dispatch<any>;
  setArticleError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const articleNameRef = useRef<HTMLInputElement | null>(null);

  const handleArticle = async () => {
    setArticleData(null);
    setArticleError("");
    const articleName = articleNameRef.current?.value;

    if (!articleName) {
      setArticleError("article name is required");
      return;
    }

    const response = await fetch(`${SERVER_URL}/introduction/${articleName}`, {
      method: "GET",
      headers: {
        "x-authentication": token,
      },
    });

    if (!response.ok) {
      setArticleError(`something went wrong. ${await response.text()}`);
      return;
    }

    setArticleError("");
    setArticleData(await response.json());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="primary-text">What would you like to read about?</p>
      <p className="secondary-text">
        Dogs? molecular culinary? everything goes...
      </p>
      <p className="secondary-text" style={{ marginTop: "16px" }}>
        Article subject
      </p>
      <input ref={articleNameRef} placeholder="subject" />
      <button
        className="primary-button"
        onClick={() => {
          handleArticle();
          setPage(READ_ARTICLE_PAGE);
        }}
      >
        Continue
      </button>
    </div>
  );
}
