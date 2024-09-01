import React, { useState } from "react";
import "./BhajanForm.css";

const fields = [
  {
    id: "applicant_name",
    label:
      "Applicant's Name in full (If known by some other name/Alias or Surname, it should be noted)",
    type: "text",
    required: true,
  },
  {
    id: "caste",
    label: "Caste (in case of Hindus their tribe should be given)",
    type: "text",
    required: true,
  },
  { id: "dob", label: "Date of birth and age", type: "date", required: true },
  {
    id: "qualifications",
    label: "Educational and other Qualifications",
    type: "text",
    required: true,
  },
  {
    id: "occupation",
    label: "Occupation (If in service, name of Post, Department, and Office)",
    type: "text",
    required: true,
  },
  {
    id: "monthly_income",
    label: "Monthly income",
    type: "text",
    required: true,
  },
  {
    id: "marital_status",
    label: "Whether unmarried / married / widow / widower / divorcee",
    type: "select",
    options: ["Unmarried", "Married", "Widow", "Widower", "Divorcee"],
    required: true,
  },
  {
    id: "address",
    label: "Present Address in full",
    type: "text",
    required: true,
  },
  {
    id: "father_name",
    label: "Father's full Name",
    type: "text",
    required: true,
  },
  {
    id: "father_satsangi",
    label: "Satsangi/Non-Satsangi (Father)",
    type: "select",
    options: ["Satsangi", "Non-Satsangi"],
    required: true,
  },
  {
    id: "husband_name",
    label: "Husband's full Name",
    type: "text",
    required: true,
  },
  {
    id: "husband_satsangi",
    label: "Satsangi/Non-Satsangi (Husband)",
    type: "select",
    options: ["Satsangi", "Non-Satsangi"],
    required: true,
  },
  {
    id: "dayalbagh_satsangi",
    label: "Are/were they Satsangis of Dayalbagh?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "guardian_occupation",
    label:
      "Occupation of Father/Husband/Guardian (If in service, name of Post, Department, and Office)",
    type: "text",
    required: true,
  },
  {
    id: "guardian_income",
    label: "Father's/Husband's/Guardian's monthly income",
    type: "text",
    required: true,
  },
  {
    id: "guardian_name",
    label: "Full Name (Guardian)",
    type: "text",
    required: true,
  },
  {
    id: "guardian_relationship",
    label: "Relationship with the applicant (Guardian)",
    type: "text",
    required: true,
  },
  {
    id: "guardian_satsangi",
    label: "Is he/she Satsangi of Dayalbagh?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "first_initiation_date",
    label: "Date of First Initiation",
    type: "date",
    required: true,
  },
  {
    id: "initiation_age",
    label: "Age at the time of taking First Initiation",
    type: "text",
    required: true,
  },
  {
    id: "initiation_address",
    label: "Full Address at the time of taking First Initiation",
    type: "text",
    required: true,
  },
  {
    id: "sumiran_dhyan_initiator",
    label: "Through whom initiated in Sumiran & Dhyan and at what place",
    type: "text",
    required: true,
  },
  {
    id: "current_satsang_branch",
    label:
      "Name of Branch Satsang/Centre where he/she regularly attends Satsang",
    type: "text",
    required: true,
  },
  {
    id: "initiation_satsang_branch",
    label:
      "Name of Branch Satsang/Centre where he/she attended Satsang at the time of Initiation",
    type: "text",
    required: true,
  },
  {
    id: "satsang_period",
    label: "Period for which attended Satsang in Branch/Centre",
    type: "text",
    required: true,
  },
  {
    id: "dayalbagh_visit",
    label: "Has the seeker ever visited Dayalbagh? If so, when",
    type: "text",
    required: true,
  },
  {
    id: "bhajan_initiation",
    label: "Has the seeker received Initiation in Bhajan?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "dhyan_initiation",
    label: "Has the seeker received Initiation in Dhyan?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "satsang_initiation",
    label: "Has the seeker received Initiation in Satsang?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "service_details",
    label: "Service rendered in Branch/Centre (Give details)",
    type: "text",
    required: true,
  },
  {
    id: "adverse_report",
    label: "Is there any adverse report against the applicant?",
    type: "select",
    options: ["Yes", "No"],
    required: true,
  },
  {
    id: "signature",
    label: "Signature of the applicant",
    type: "text",
    required: true,
  },
  {
    id: "mobile_number",
    label: "Mobile Number of the applicant",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email of the applicant",
    type: "text",
    required: true,
  },
  {
    id: "form_date",
    label: "Date of filling the form",
    type: "date",
    required: true,
  },
];

const BhajanForm = () => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSinglePage, setIsSinglePage] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleToggle = () => {
    setIsSinglePage(!isSinglePage);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Handle form submission logic here
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "date":
        return (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id] || ""}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        );
      case "select":
        return (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id}>{field.label}</label>
            <select
              id={field.id}
              value={formData[field.id] || ""}
              onChange={handleChange}
              required={field.required}
            >
              <option value="">Select</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bhajan-form">
      <button onClick={handleToggle}>
        {isSinglePage
          ? "Switch to Step-by-Step Form"
          : "Switch to Single Page Form"}
      </button>

      {isSinglePage ? (
        <form onSubmit={handleFinish}>
          {fields.map(renderField)}
          <button type="submit">Finish</button>
        </form>
      ) : (
        <div className="step-form">
          {renderField(fields[currentStep])}
          <div className="step-navigation">
            {currentStep > 0 && <button onClick={handleBack}>Back</button>}
            {currentStep < fields.length - 1 && (
              <button onClick={handleNext}>Next</button>
            )}
            {currentStep === fields.length - 1 && (
              <button onClick={handleFinish}>Finish</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BhajanForm;
