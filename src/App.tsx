import { FormEvent, useRef, useState } from "react";

const SERVER_URL = "https://pery-assignment-maor-server.vercel.app:3000";

function App() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const signupLanguageRef = useRef<HTMLInputElement | null>(null);
  const articleNameRef = useRef<HTMLInputElement | null>(null);
  const articleLanguageRef = useRef<HTMLInputElement | null>(null);
  const tokenRef = useRef<HTMLInputElement | null>(null);

  const [signupData, setSignupData] = useState("");
  const [articleData, setArticleData] = useState<any | null>(null);
  const [signupError, setSignupError] = useState("");
  const [articleError, setArticleError] = useState("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const language = signupLanguageRef.current?.value;
    if (!username) {
      setSignupError("username is required");
      setSignupData("");
    }

    const response = await fetch(`${SERVER_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        language,
      }),
    });

    if (!response.ok) {
      setSignupError(`something went wrong. error code: ${response.status}`);
    }

    setSignupError("");
    setSignupData(await response.text());
  };

  const handleArticle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const articleName = articleNameRef.current?.value;
    const articleLanguage = articleLanguageRef.current?.value;
    const token = tokenRef.current?.value;
    if (!articleName) {
      setArticleError("article name is required");
      setArticleData("");
    }

    const response = await fetch(`${SERVER_URL}/introduction/${articleName}`, {
      method: "GET",
      headers: {
        "accept-language": articleLanguage || "",
        "x-authentication": token || "",
      },
    });

    if (!response.ok) {
      setArticleError(`something went wrong. error: ${await response.text}`);
    }

    setArticleError("");
    setArticleData(await response.text());
  };
  console.log(import.meta.env.SERVER);

  return (
    <div>
      <h4>signup:</h4>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "row" }}
      >
        <input ref={usernameRef} placeholder="username" required />
        <input ref={signupLanguageRef} placeholder="language. default: en" />
        <button type="submit">submit</button>
      </form>
      {signupError ? signupError : <></>}
      {signupData ? signupData : <></>}
      <h4>get article:</h4>
      <form onSubmit={handleArticle}>
        <input ref={articleNameRef} placeholder="article name" required />
        <input ref={articleLanguageRef} placeholder="language. default: en" />
        <input ref={tokenRef} placeholder="token. will override language" />
        <button type="submit">submit</button>
      </form>
      {articleError ? articleError : <></>}
      {articleData ? articleData : <></>}
    </div>
  );
}

export default App;
