import "./profiles.css"
import React, { useState, useEffect } from 'react';

export default function ClientProfiles() { 
  const [clients, setClients] = useState([]);

  useEffect(() => {
      async function fetchData() {
        const response = await fetch("/backend/fetch-client-names", {
          method: "GET",
        });
        const responseData = await response.json();
        const clientsAsObjects = responseData.data.map((c) => (
          {
            ID : null,
            Name : c[0],
            Email : null,
            FosterCert : null,
            AdoptCert : null,
          }
        ))
        setClients(clientsAsObjects);
      }
      fetchData();
    }, [])

    function makeProfile(c) {
      return (      
      <div className="clientProfileButton">                   
        <p className="bold">{c.Name}</p>
          <table className="profileInfo">
            <tbody>
              {c.ID !== null && <tr><td className="bold profileInfo">ID:</td> <td>{c.ID}</td></tr>}
              {c.Email !== null && <tr><td className="bold profileInfo">Email:</td> <td>{c.Email}</td></tr>}
              {c.FosterCert !== null && <tr><td className="bold profileInfo">Foster Certification:</td><td>{c.FosterCert}</td></tr> }
              {c.AdoptCert !== null && <tr><td className="bold profileInfo">Adoption Certification:</td><td>{c.AdoptCert}</td></tr>}
            </tbody>
          </table>
        </div>
      )
    }

    function GetColumnContents(start, end) {
      return (
        clients.slice(start, end).map((c) => makeProfile(c))
      )
    }

    const [buttonStates, setButtonStates] = useState([false, false, false, false]);
    function handleProjClick(idx) {
      const newStates = [...buttonStates];
      newStates[idx] = !buttonStates[idx];
      setButtonStates(newStates);
    }

    const selectionOptions = [{name: "ID", tableName: "ID"}, 
                              {name: "Email", tableName: "EmailAddress"}, 
                              {name: "Foster Certification ID", tableName: "FosterPersonCertificationID"}, 
                              {name: "Adoption Certification ID", tableName: "AdopterPersonCertificationID"}];

    const getChosenOptionIndex = (chosenOptions, givenColName) => {
      const matchingOption = chosenOptions.find((option) => option.colName === givenColName);
      if (matchingOption) {
        return matchingOption.index;
      }
      return -1;
    }

    async function GetProjection() {
      try {
        var chosenOptions = [];
        var num = 1;
        for (var i = 0; i < 4; i++) {
          if (buttonStates[i]) {
            chosenOptions = [...chosenOptions, {index: num, colName: selectionOptions[i].tableName}];
            num++;
          }
        }
        var chosenColNames = [];
        chosenOptions.map((option) => {
          chosenColNames = [...chosenColNames, option.colName];
        })
        const response = await fetch("/backend/get-client-projection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({columns: chosenColNames}),
        });
        const data = await response.json(); 

        const newObjects = data.data.map(row => ({
          ID : buttonStates[0] ? row[getChosenOptionIndex(chosenOptions, "ID")] : null,
          Name : String(row[0]).trim(),
          Email : buttonStates[1] ? row[getChosenOptionIndex(chosenOptions, "EmailAddress")] : null,
          FosterCert : buttonStates[2] ? (row[getChosenOptionIndex(chosenOptions, "FosterPersonCertificationID")] ? row[getChosenOptionIndex(chosenOptions, "FosterPersonCertificationID")] : "none") : null,
          AdoptCert : buttonStates[3] ? (row[getChosenOptionIndex(chosenOptions, "AdopterPersonCertificationID")] ? row[getChosenOptionIndex(chosenOptions, "AdopterPersonCertificationID")] : "none") : null,
        }));
        setClients(newObjects);
      } catch (e) {
        console.log(e);
      }
    }

    function ProjectionOptions() {
      return (
        <>
          {buttonStates.map((state, idx) => (
            <button key={idx} className={state ? `projSelected` : `projNotSelected`} onClick={() => handleProjClick(idx)}>{selectionOptions[idx].name}</button>
          ))}
          <button className="projSelected" onClick={() => GetProjection()}>Submit</button>
        </>
      )
    }

    return (
        <>
        <div><h1
        className="heading fw-bold mt-5 header">
        Clients
        <hr></hr>
      </h1>
      <div>{ProjectionOptions()}</div>
        </div>
          <div className="container">
          <div className="column names">{GetColumnContents(0, Math.ceil(clients.length / 3))}</div>
          <div className="column names">{GetColumnContents(Math.ceil(clients.length / 3), Math.ceil(2 * clients.length / 3))}</div>
          <div className="column names">{GetColumnContents(Math.ceil(2 * clients.length / 3), clients.length)}</div>
        </div>
    </>
    )
}