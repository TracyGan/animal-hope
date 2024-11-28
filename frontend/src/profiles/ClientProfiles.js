import "./profiles.css"
import React, { useState, useEffect } from 'react';

export default function ClientProfiles() { 
  const [clients, setClients] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/backend/fetch-clienttable", {
                method: "GET",
              });
              const responseData = await response.json();
              console.log("I AM FINISHED FETCHING THE DATA!");
              console.log(responseData.data);
              const clientsAsObjects = responseData.data.map((c) => (
                {
                    ID : c[0],
                    Name : c[1],
                    Email : c[2],
                    FosterCert : c[3],
                    AdoptCert : c[4],
                }
              ))

              setClients(clientsAsObjects);
        }
        fetchData();
    }, [])

    function GetColumnContents(start, end) {
      function makeProfile(c) {
        return (      
        <div className="clientProfileButton">                   
          <p className="bold">{c.Name}</p>
          <table className="profileInfo">
            <tbody>
              <tr><td className="bold profileInfo">ID:</td> <td>{c.ID}</td></tr>
              <tr><td className="bold profileInfo">Email:</td> <td>{c.Email}</td></tr>
              <tr><td className="bold profileInfo">Foster Certification:</td><td>#{c.FosterCert}</td></tr> 
              <tr><td className="bold profileInfo">Adoption Certification:</td> <td>#{c.AdoptCert}</td></tr>
              </tbody>
              </table>
              </div>
              )
      }
        

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

    const selectionOptions = ["ID", "Email", "Foster Certification ID", "Adoption Certification ID"];

    async function GetProjection() {
      // get projection results + re render
    }

    function ProjectionOptions() {
      return (
        <>
          {buttonStates.map((state, idx) => (
            <button key={idx} className={state ? `projSelected` : `projNotSelected`} onClick={() => handleProjClick(idx)}>{selectionOptions[idx]}</button>
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
        {/* <button className="addButton">Add New Client</button> */}
    </>
    )
}


// function MakeClientTable(client) {
//     return (
//         <table className="centredTable">
//             <tr> <td className="clientKeys">Client ID: </td> <td className="names"> {client.id}</td></tr>
//             <tr> <td className="clientKeys">Address: </td> <td className="names"> {client.address}</td></tr>
//             <tr> <td className="clientKeys">Donations: </td> <td className="names"> ${client.donations}</td></tr>
//             <tr> <td className="clientKeys">Adoption Certification: </td> <td className="names"> {client.aCertId}</td></tr>
//             <tr> <td className="clientKeys">Foster Certification: </td> <td className="names"> {client.fCertId}</td></tr>
//             <tr> <td className="clientKeys">Adopted Animals: </td> <td className="names"> {client.adopted}</td></tr>
//             <tr> <td className="clientKeys">Fostered Animals: </td> <td className="names"> {client.fostered}</td></tr>
//         </table>
//     )
// }



// function ClientPage() {
//   const id = Number(useParams().id);
//   const client = clients.find(c => c.id === id);
//   return (
//       <>
//       <div>
//           <h1 className="heading fw-bold mt-5 header">
//           {client.name}
//           <hr></hr></h1>
//       </div>
//       <div>
//           {MakeClientTable(client)}
//       </div>
//       </>
//   )
// }
