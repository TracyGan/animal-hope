import "./profiles.css"
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const animals = [
    {
        id: 2349,
        name: "Mocha",
        type: "bunny",
        breed: "holland lop",
        age: 2, 
        arrived: "", // date time object
        fosterHistory: "", // table representing fostered history
        adoptionHistory: "" // not adopted OR adopted on <date> by <client name>
    },
    {
        id: 3102,
        name: "Cocoa",
        type: "bunny",
        breed: "flemish giant",
        age: 5, 
        arrived: "", // date time object
        fosterHistory: "", // table representing fostered history
        adoptionHistory: "" // not adopted OR adopted on <date> by <client name>
    },
    {
        id: 5923,
        name: "Happy",
        type: "dog",
        breed: "corgi",
        age: 1, 
        arrived: "", // date time object
        fosterHistory: "", // table representing fostered history
        adoptionHistory: "" // not adopted OR adopted on <date> by <client name>
    },
    {
        id: 5923,
        name: "Clawdia",
        type: "cat",
        breed: "tuxedo",
        age: 10, 
        arrived: "", // date time object
        fosterHistory: "", // table representing fostered history
        adoptionHistory: "" // not adopted OR adopted on <date> by <client name>
    }
]

export default function AnimalProfiles() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AnimalTable />} />
                <Route path="/animal/:id" element={<AnimalPage />} /> 
            </Routes>
        </Router>
    )
}

function AnimalTable() {
    return (
        <>
        <div><h1
        className="heading fw-bold mt-5 header">
        <p>Animals</p>
        <hr></hr>
        </h1></div>
        <div>        
            <button className="addButton">Add New Animal</button>
        </div>
        <div><input type="text" placeholder="Search..." name="search" className="searchBox"></input>
        </div>
        <div className="container">
        <div className="column names">{GetColumnContents(0, Math.ceil(animals.length / 2))}</div>
        <div className="column names">{GetColumnContents(Math.ceil(animals.length / 2), animals.length)}</div>
        </div>
        </>
    ) 
}

function GetColumnContents(start, end) {
    function makeProfile(a) {
        return (
            <p><Link to={"/animal/" + a.id}><button className="profileButton">
                <p className="bold">{a.name}</p>
                <div>
                    {DisplayAnimal(a)}
                <table className="profileInfo">
                <tr><td className="bold profileInfo">Age:</td> <td>{a.age}</td><td className="bold profileInfo">Status:</td> <td>{a.adoptionHistory}</td></tr>
                <tr><td className="bold profileInfo">Type:</td> <td>{a.type}</td><td className="bold profileInfo">Breed:</td> <td>{a.breed}</td></tr>
                </table>
                </div>
                </button></Link></p>
        )
    }
    return (
        animals.slice(start, end).map(makeProfile)
    )
}

function DisplayAnimal(animal) {
    let url; 
    if (animal.type === "bunny") {
        url = "https://cdn12.picryl.com/photo/2016/12/31/hare-rabbit-dwarf-bunny-animals-f6bb6e-1024.jpg";
    } else if (animal.type === "dog") {
        url = "https://live.staticflickr.com/65535/53797833953_26aa2b2e4f_b.jpg";
    } else if (animal.type === "cat") {
        url = "https://miro.medium.com/v2/resize:fit:1400/1*F4-gW2fiE1a76BJm57lgiw.jpeg";
    }
    return (
        <img src={url} className="animalImg" alt="animal"></img>
    )
}

function MakeAnimalTable(animal) {
    return (
        <table className="centredTable">
            <tr> <td className="clientKeys">Animal ID: </td> <td className="names"> {animal.id}</td></tr>
            <tr> <td className="clientKeys">Type: </td> <td className="names"> {animal.type}</td></tr>
            <tr> <td className="clientKeys">Breed: </td> <td className="names"> {animal.breed}</td></tr>
            <tr> <td className="clientKeys">Age: </td> <td className="names"> {animal.age}</td></tr>
            <tr> <td className="clientKeys">Arrival Date: </td> <td className="names"> {animal.arrived}</td></tr>
            <tr> <td className="clientKeys">Status: </td> <td className="names"> adopted/fostered/available</td></tr>
            <tr> <td className="clientKeys">Foster History: </td> <td className="names"> {animal.adoptionHistory}</td></tr>
            <tr> <td className="clientKeys">Adoption History: </td> <td className="names"> {animal.fosterHistory}</td></tr>
        </table>
    )
}


function AnimalPage() {
    const id = Number(useParams().id);
    const animal = animals.find(a => a.id === id);
    return (
        <>
        <div>
            <h1 className="heading fw-bold mt-5 header">
            {animal.name}
            <hr></hr></h1>
            <button className="addButton">Update Status</button>
        </div>

        <div>
            {MakeAnimalTable(animal)}
        </div>
        </>
    )
}