import { Radio } from "@mui/material";
import { ENTER_ARTICLE_PAGE, SERVER_URL } from "../App";
import checked from "../assets/checked.svg";
import unchecked from "../assets/unchecked.svg";

export const LANGUAGES = { en: "English", es: "Spanish", nl: "Dutch" };

export function ChooseLanguagePage({
  email,
  tokenError,
  selectedLanguage,
  setPage,
  setToken,
  setTokenError,
  setSelectedLanguage,
}: {
  email: string;
  tokenError: string;
  selectedLanguage: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setTokenError: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLanguage: React.Dispatch<
    React.SetStateAction<keyof typeof LANGUAGES>
  >;
}) {
  const handleSignup = async () => {
    setTokenError("");
    setToken("");

    if (!email) {
      setTokenError("username is required");
      return;
    }

    const response = await fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: email,
        language: selectedLanguage,
      }),
    });

    if (!response.ok) {
      setTokenError(`something went wrong. error code: ${response.status}`);
    }

    setToken(await response.text());
    setPage(ENTER_ARTICLE_PAGE);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="primary-text">Nice to meet you!</p>
      <p className="secondary-text" style={{ marginBottom: "8px" }}>
        Which language do you prefer to read?
      </p>

      {Object.entries(LANGUAGES).map(([languageCode, languageName]) => (
        <label key={languageCode}>
          <Radio
            value={languageCode}
            checked={selectedLanguage === languageCode}
            disableRipple
            color="default"
            checkedIcon={<img src={checked} />}
            icon={<img src={unchecked} />}
            onChange={() => {
              setSelectedLanguage(languageCode as keyof typeof LANGUAGES);
            }}
          />
          {languageName}
        </label>
      ))}

      <button
        className="primary-button"
        onClick={() => {
          handleSignup();
        }}
      >
        Continue
      </button>
      {tokenError && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "rgb(253, 237, 237)",
            color: "rgb(95, 33, 32)",
            borderRadius: "16px",
          }}
        >
          {tokenError}
        </div>
      )}
    </div>
  );
}
