import React from "react";
import { connect } from "react-redux";
import { clearTooltip } from "../actions/tooltip_actions";
import SingleTooltip from "./tooltip/SingleTooltip";

function Tooltip({ tooltips, clearTooltip }) {
  if (!tooltips.length) {
    return null;
  }

  return (
    <div className="tooltip">
      {tooltips.map((tt) => (
        <SingleTooltip key={tt.id} tooltip={tt} clearTooltip={clearTooltip} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tooltips: state.tooltip,
});

export default connect(mapStateToProps, { clearTooltip })(Tooltip);
