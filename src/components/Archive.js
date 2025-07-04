import React, { useEffect } from "react";
import "../styles/archive.css";
import { connect } from "react-redux";
import ArchivedBudget from "./archive/ArchivedBudget";
import BackButton from "./shared/BackButton";
import { chooseDashboard } from "../actions/ui_actions";
import { fetchArchives } from "../actions/archive_actions";
import ScrollToTop from "./shared/ScrollToTop";
import useJumpToTop from "../hooks/useJumpToTop";

function Archive({ archive, fetchArchives, chooseDashboard }) {
  useJumpToTop();

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  return (
    <>
      <div className="banner">
        <BackButton callback={chooseDashboard} />

        <h2>Archived Budgets</h2>
      </div>

      <div className="archive">
        {archive.length === 0 ? (
          <div className="no-items">
            <p>Nothing to see here!</p>
            <p>Why don't you archive something...or not, it's OK!</p>
          </div>
        ) : (
          <ul>
            {archive.map((archived) => (
              <li key={archived.id}>
                <ArchivedBudget {...{ archived }} />
              </li>
            ))}
          </ul>
        )}

        <ScrollToTop />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  archive: state.archive,
});

export default connect(mapStateToProps, { chooseDashboard, fetchArchives })(
  Archive
);
