import ProgBarStyles from "../../styles/ProgressBar.module.css";

//Progressbar used in the current Student pahe (Home) on Admin dashboard//
const ProgressBar = (props) => {
  const { completed } = props;

  //Styles given to the porgress bar rendered using props to adjust width//
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#e6b566",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className={ProgBarStyles.containerStyles}>
      <div style={fillerStyles}>
        <span className={ProgBarStyles.labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
