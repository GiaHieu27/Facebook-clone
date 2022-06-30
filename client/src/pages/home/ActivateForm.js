import HashLoader from "react-spinners/HashLoader";

function ActivateForm({ type, header, text, loading }) {
  return (
    <div className="blur">
      <div className="popup">
        <div
          className={`popup_header ${
            type === "success" ? "success_text" : "error_text"
          }`}
        >
          {header}
        </div>
        <div className="popup_message">{text}</div>
        <HashLoader color="blue" loading={loading} size={30} />
      </div>
    </div>
  );
}

export default ActivateForm;
