import "./profiles.css"
import React, { useState, useEffect } from 'react';

// const clients = [
//     {
//         name: "Kelly",
//         id: 8632,
//         address: "123 Helm St",
//         donations: 262,
//         aCertId: 9824,
//         fCertId: 8358,
//         adopted: 1,
//         fostered: 1
//       },
//       {
//         name: "Sydney",
//         id: 7726,
//         address: "4912 Maple St",
//         donations: 426,
//         aCertId: 5832,
//         fCertId: 2514,
//         adopted: 3,
//         fostered: 2
//       },
//       {
//         name: "Tracy",
//         id: 6863,
//         address: "456 Oak St",
//         donations: 720,
//         aCertId: 7159,
//         fCertId: 7011,
//         adopted: 1,
//         fostered: 0
//       },
//       {
//         name: "Wilson",
//         id: 2732,
//         address: "1214 Pine Ave",
//         donations: 356,
//         aCertId: 8558,
//         fCertId: 3325,
//         adopted: 0,
//         fostered: 0
//       },
//       {
//         name: "John",
//         id: 8787,
//         address: "683 Cedar St",
//         donations: 127,
//         aCertId: 7892,
//         fCertId: 9921,
//         adopted: 0,
//         fostered: 1
//       },
//       {
//         name: "Sonny",
//         id: 7147,
//         address: "212-2014 Fir Ave",
//         donations: 0,
//         aCertId: 6852,
//         fCertId: 3738,
//         adopted: 1,
//         fostered: 1
//       },
//       {
//         name: "Janet",
//         id: 7535,
//         address: "202 Birch Blvd",
//         donations: 63,
//         aCertId: 6268,
//         fCertId: 6635,
//         adopted: 2,
//         fostered: 4
//       },
//       {
//         name: "Jane Smith",
//         id: 8061,
//         address: "6823 Douglas Ave",
//         donations: 982,
//         aCertId: 5169,
//         fCertId: 7242,
//         adopted: 4,
//         fostered: 3
//       },
//       {
//         name: "Brie",
//         id: 4671,
//         address: "2384 Garden Dr",
//         donations: 161,
//         aCertId: 9585,
//         fCertId: 5955,
//         adopted: 0,
//         fostered: 10
//       },
//       {
//         name: "Audrey",
//         id: 3245,
//         address: "2384 Garden Dr",
//         donations: 161,
//         aCertId: 9585,
//         fCertId: 5955,
//         adopted: 0,
//         fostered: 10
//       },      {
//         name: "Paxton",
//         id: 7421,
//         address: "2384 Garden Dr",
//         donations: 161,
//         aCertId: 9585,
//         fCertId: 5955,
//         adopted: 0,
//         fostered: 10
//       }
//   ];

// export default function ClientProfiles() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<ClientList />} />
//                 <Route path="/client/:id" element={<ClientPage />} /> 
//             </Routes>
//         </Router>
//     )
// }

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
