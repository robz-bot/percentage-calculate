import "./App.css";
import React, { useState } from "react";
import JSONDATA from "./dbjson.json";

function App() {
  const [searchTerm, setSearchTerm] = useState(false);

  const total = (val) => {
    return (
      (val.maths + val.physics + val.chemistry + val.biology + val.english) / 5
    );
  };

  const report = (val) => {
    if (val >= 90) return "Success";
    if (val >= 70) return "Average";
    if (val >= 50) return "Pass";
    if (val <= 30) return "Fail";
    return "asd";
  };

  const Results = () => (
    <div id="results">
      {JSONDATA.filter((val) => {
        if (val.id === parseInt(searchTerm)) {
          console.log(val);
          return val;
        } else {
          console.log(val);
          return null;
        }
      }).map((val, key) => {
        return (
          <div className="my-4">
            <h4>Subject Percentage</h4>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td>Maths (%)</td>
                    <td>Physics (%)</td>
                    <td>Chemistry (%)</td>
                    <td>Biology (%)</td>
                    <td>English (%)</td>
                  </tr>
                  <tr>
                    <td>{val.maths}</td>
                    <td>{val.physics}</td>
                    <td>{val.chemistry}</td>
                    <td>{val.biology}</td>
                    <td>{val.english}</td>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            <h4>Total Percentage</h4>
          </div>
        );
      })}

      {JSONDATA.filter((val) => {
        if (val.id === parseInt(searchTerm)) {
          return val;
        } else {
          return null;
        }
      }).map((val, key) => {
        return (
          <div>
            <div className="progress">
              <div
                className={`progress-bar progress-bar-striped 
                  ${total(val) > 90 && total(val) <= 100 ? "bg-success" : ""}
                  ${total(val) > 70 && total(val) <= 90 ? "bg-primary" : ""}
                  ${total(val) > 30 && total(val) <= 70 ? "bg-warning" : ""}
                  ${total(val) >= 0 && total(val) <= 30 ? "bg-danger" : ""}`}
                role="progressbar"
                style={{
                  width: `${total(val)}%`,
                }}
              >
                {total(val)} % (Complete) {report(total(val))}
              </div>
            </div>
            <div className="my-3">
              <bold>Report :</bold> {total(val)} % (Complete){" "}
              {report(total(val))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="App container row my-4">
      <div className="col-sm-6">
        <h5>Calculate the percentage level of a Person's mark</h5>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Student Id"
          id="studentId"
        />
        <br></br>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => {
            setSearchTerm(document.getElementById("studentId").value);
          }}
        >
          Get data from Server
        </button>
        {searchTerm ? <Results /> : null}
      </div>
    </div>
  );
}

export default App;
