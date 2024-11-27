import { useState } from "react";

function sanitization(input) {
  const sql = /\b(INSERT|UPDATE|DROP|CREATE)\b/i;

  if (sql.test(input)) {
    alert("Error: Potential SQL statement detected!");
  }
}

export default sanitization;
