import { useMediaQuery } from "react-responsive";

function DateOfBirthSelect({ ...props }) {
  // const view1 = useMediaQuery({
  //   query: "(min-width: 539px)",
  // });
  // const view2 = useMediaQuery({
  //   query: "(min-width: 850px)",
  // });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <div
      className="reg_grid"
      style={{ marginBottom: `${props.dateError && !view3 ? "75px" : "10px"}` }}
    >
      <select
        name="bDate"
        value={props.bDate}
        onChange={props.handleRegisterChange}
      >
        {props.days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>

      <select
        name="bMonth"
        value={props.bMonth}
        onChange={props.handleRegisterChange}
      >
        {props.months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>

      <select
        name="bYear"
        value={props.bYear}
        onChange={props.handleRegisterChange}
      >
        {props.years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {props.dateError && (
        <div
          className={
            view3 ? "input_error input_error_select_large" : "input_error"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {props.dateError}
        </div>
      )}
    </div>
  );
}

export default DateOfBirthSelect;
