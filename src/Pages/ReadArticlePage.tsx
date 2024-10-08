import { Typography } from "@mui/material";
import { ENTER_ARTICLE_PAGE } from "../App";

export function ReadArticlePage({
  articleData,
  articleError,
  setPage,
}: {
  articleData: any;
  articleError: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {articleData?.introduction ? (
        <Typography>{articleData?.introduction}</Typography>
      ) : (
        <Typography>{articleError}</Typography>
      )}

      <button
        onClick={() => {
          setPage(ENTER_ARTICLE_PAGE);
        }}
      >
        Start over
      </button>
    </div>
  );
}
