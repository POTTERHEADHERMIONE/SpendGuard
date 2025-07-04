import React from "react";
import { saveAs } from "file-saver";
import { fetchDb } from "../../utils/comms";
import Button from "../shared/Button";

function ExportData() {
  const handleClick = (e) => {
    fetchDb().then((db) => {
      const blob = new Blob([JSON.stringify(db)], { type: "application/json" });

      saveAs(blob, "simply-budget-db.json");
    });
  };

  return (
    <Button
      callback={handleClick}
      className="import-export"
      display="Export Data"
    />
  );
}

export default ExportData;
