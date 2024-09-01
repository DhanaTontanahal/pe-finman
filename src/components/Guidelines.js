// src/components/Guidelines.js
import React from "react";
import "./Guidelines.css";

const Guidelines = () => {
  return (
    <div className="guidelines-container">
      <h1>Guidelines</h1>
      <h2>Ra-Dha-Sva-Aa-Mi</h2>
      <p className="instructions">
        Before Filling in the Form read the instructions carefully:
      </p>
      <ol>
        <li>Form should be filled up legibly in dark ink.</li>
        <li>
          The Applicant must give his/her signature (no thumb impression is
          allowed).
        </li>
        <li>
          In the case of ladies, husband’s consent when alive, otherwise
          guardian’s consent with relationship should be recorded, even though
          she may be financially independent.
        </li>
        <li>
          In the case of unemployed gents, consent of father when alive,
          otherwise guardian’s consent should be recorded.
        </li>
        <li>Divorced applicants must attach documentary proof.</li>
        <li>
          Those who sign in Telegu, Tamil, Bengali or Punjabi etc., their names
          must be written in Hindi or English below their signatures.
        </li>
        <li>
          In case of relatives of Branch Secretary, relationship with the Branch
          Secretary should be recorded and the form should also have full
          recommendation of the District Secretary.
        </li>
        <li>
          The Branch Secretary should also give his full recommendation on the
          Forms of the persons of Satsang Centres attached to the Branch.
        </li>
        <li>
          Initiation is not given to the students & to those who are below 23
          years in age.
          <ul>
            <li>
              Exception: Those who are 21 Years in age and both their Parents
              are initiated, with at least 3 years standing, may be given
              initiation. For Male candidates employment is mandatory.
            </li>
          </ul>
        </li>
      </ol>
      <p className="note">
        <strong>Note:</strong> Before recommending the Form, Branch Secretary
        should scrutinize the Form carefully for correct and complete
        information and ensure no column is left blank.
      </p>
    </div>
  );
};

export default Guidelines;
