import React from "react";
import Button from "../shared/Button";
import lightbulbOn from "../../images/lightbulb-on.svg";
import lightbulbOff from "../../images/lightbulb-off.svg";
import { connect } from "react-redux";
import { patchSettings } from "../../actions/settings_actions";

function DarkModeBtn({ darkMode, patchSettings }) {
  const displayImage = darkMode ? lightbulbOn : lightbulbOff;
  const handleClick = () => {
    patchSettings({ "dark-mode": !darkMode });
  };

  return (
    <Button
      display={<img src={displayImage} alt="toggle dark mode" />}
      className="dark-mode-btn"
      callback={handleClick}
    />
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.settings["dark-mode"],
});

export default connect(mapStateToProps, { patchSettings })(DarkModeBtn);
