import "./profiles.css"
import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';


// import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// export default function AnimalProfiles() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<AnimalTable />} />
//                 <Route path="/animal/:id" element={<AnimalPage />} /> 
//             </Routes>
//         </Router>
//     )
// }

export default function AnimalProfiles() {
    const [animals, setAnimals] = useState([]);
    async function fetchData() {
        const response = await fetch("/backend/fetch-animaltable", {
            method: "GET",
          });
          const responseData = await response.json();
          const animalsAsObjects = responseData.data.map((a) => (
            {
                ID : a[0],
                Name : a[1],
                Arrival : a[2],
                Age : a[3],
                Breed: a[4],
                Type: a[6]
            }
          ))

          setAnimals(animalsAsObjects);
    }

    useEffect(() => {fetchData()}, [])
    
    function GetColumnContents(start, end) {
        function makeProfile(a) {
            return (
                <div className="profileButton">                   
                <p className="bold">{a.Name}</p>
                <button className="topRDelete" onClick={() => Delete(a.ID)}>delete</button>
                    <div>
                        {DisplayAnimal(a)}
                    <table className="profileInfo">
                        <tbody>
                    <tr><td className="bold profileInfo">Age:</td><td>{a.Age}</td><td className="bold profileInfo">Status:</td><td>{a.adoptionHistory}</td></tr>
                    <tr><td className="bold profileInfo">Type:</td><td>{a.Type}</td><td className="bold profileInfo">Breed:</td><td>{a.Breed}</td></tr>
                    </tbody>
                    </table>
                    </div>
                    </div>
            )
        }
    
        return (
            // typeof animals
            animals.slice(start, end).map(makeProfile)
        )
    }

    async function Delete(id) {
        const response = await fetch("/backend/delete-animal", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({animalID : id})
        });
        await fetchData();
    }
    
    function DisplayAnimal(animal) {
        let url; 
        if (animal.Type === "Rabbit") {
            url = "https://cdn12.picryl.com/photo/2016/12/31/hare-rabbit-dwarf-bunny-animals-f6bb6e-1024.jpg";
        } else if (animal.Type === "Dog") {
            url = "https://live.staticflickr.com/65535/53797833953_26aa2b2e4f_b.jpg";
        } else if (animal.Type === "Cat") {
            url = "https://miro.medium.com/v2/resize:fit:1400/1*F4-gW2fiE1a76BJm57lgiw.jpeg";
        } else if (animal.Type === "Horse") {
            url = "https://images.pexels.com/photos/1996338/pexels-photo-1996338.jpeg";
        }
        return (
            <img src={url} className="animalImg" alt="animal"></img>
        )
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function DivisionButton() {
        const [volunteers, setVolunteers] = useState([]);
        async function getVolunteers() {
            const response = await fetch("/backend/fetch-division", {
                method: "GET",
              });
              const responseData = await response.json();
            setVolunteers(responseData.data);    
        }
        useEffect(() => {getVolunteers()}, []);
        return (
            <div>
        <button className="projSelected" onClick={handleOpen}>Friends of the Animals!</button>

      <Modal open={open} onClose={handleClose}>
        <div className="division"> 
            <p>These volunteers have walked every animal:</p> 
            <p>{volunteers.length > 0 ? `${volunteers.map((v) => v[0]).join(', ')}` : "No one has walked every animal..."}</p>
            </div>
        
      </Modal>
    </div>
        )
    }
    
       return (
        <>
        <div><h1
        className="heading fw-bold mt-5 header">
        <p>Animals</p>
        <hr></hr>
        </h1></div>
        <div>        
            {DivisionButton()}
        </div>
        {/* <div><input type="text" placeholder="Search..." name="search" className="searchBox"></input></div> */}
        <div className="container">
        <div className="column names">{GetColumnContents(0, Math.ceil(animals.length / 2))}</div>
        <div className="column names">{GetColumnContents(Math.ceil(animals.length / 2), animals.length)}</div>
        </div>
        </>
    ) 
}



// function AnimalPage() {
//     const id = Number(useParams().id);
//     const animal = animals.find(a => a.id === id);
//     return (
//         <>
//         <div>
//             <h1 className="heading fw-bold mt-5 header">
//             {animal.name}
//             <hr></hr></h1>
//             <button className="addButton">Update Status</button>
//         </div>

//         <div>
//             {MakeAnimalTable(animal)}
//         </div>
//         </>
//     )
// } 

// function MakeAnimalTable(animal) {
//     return (
//         <table className="centredTable">
//             <tr> <td className="clientKeys">Animal ID: </td> <td className="names"> {animal.Id}</td></tr>
//             <tr> <td className="clientKeys">Type: </td> <td className="names"> {animal.type}</td></tr>
//             <tr> <td className="clientKeys">Breed: </td> <td className="names"> {animal.Breed}</td></tr>
//             <tr> <td className="clientKeys">Age: </td> <td className="names"> {animal.Age}</td></tr>
//             <tr> <td className="clientKeys">Arrival Date: </td> <td className="names"> {animal.Arrival}</td></tr>
//             <tr> <td className="clientKeys">Status: </td> <td className="names"> adopted/fostered/available</td></tr>
//             <tr> <td className="clientKeys">Foster History: </td> <td className="names"> {animal.adoptionHistory}</td></tr>
//             <tr> <td className="clientKeys">Adoption History: </td> <td className="names"> {animal.fosterHistory}</td></tr>
//         </table>
//     )
// }