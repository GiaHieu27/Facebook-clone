import { useState } from "react";
import Bio from "./Bio";

function Detail({ img, value, text, name, rel }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="add_details_flex " onClick={() => setShow(!show)}>
        {value ? (
          <div className="info_profile no_underline">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <div className="underline">Add {text}</div>
          </>
        )}
      </div>
      {show && (
        <Bio
          placeholder={`Edit ${name}`}
          name={name}
          setShow={setShow}
          detail
          rel={rel}
        />
      )}
    </div>
  );
}

export default Detail;
