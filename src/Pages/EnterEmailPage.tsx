import { Typography } from "@mui/material";
import { CHOOSE_LANGUAGE_PAGE } from "../App";
import termsAgreementIcon from "../assets/termsAgreementIcon.svg";

export function EnterEmailPage({
  email,
  setEmail,
  setPage,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p
        className="primary-text"
        style={{
          marginBottom: "16px",
        }}
      >
        Love learning new stuff?
        <br />
        get an article on any subject you like!
      </p>

      <form
        onSubmit={() => {
          setPage(CHOOSE_LANGUAGE_PAGE);
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p className="secondary-text">Type your email address</p>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="me@email.com"
        />
        <button className="primary-button" type="submit">
          Continue
        </button>
      </form>
      <Typography className="terms-agreement-text">
        <img src={termsAgreementIcon} />
        By clicking “continue” I agree to Pery’s terms
      </Typography>
    </div>
  );
}
