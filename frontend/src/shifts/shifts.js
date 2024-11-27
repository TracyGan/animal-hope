import Timeline, {TodayMarker, TimelineHeaders, DateHeader, SidebarHeader} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import "./shifts.css";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';


const ShiftsCalendar = () => {
    const [showCreateModal, setShowCreateModal] = useState({show: false, group: null, time: null, showLength: false, length: 1});
    const [showErrorMessage, setShowMessage] = useState(false);
    const handleCloseCreateModal = () => {
        setShowCreateModal({show: false, group: null, time: null, showLength: false, length: 1});
        setSelectedPet({id: null, name: "Pet"});
    }
    const [events, setEvents] = useState([]);
    const [pets, setPets] = useState([]);
    const [groups, setGroups] = useState([]);
    const [staff, setStaff] = useState([]);
    const [selectedPet, setSelectedPet] = useState({id: null, name: "Pet"});
    const [walksPerVolunteer, setWalksPerVolunteer] = useState([]);

    const groupRenderer = ({ group }) => {
        return (
            <div className="custom-group">
                <span>{group.title}</span>
            </div>
        )
    }

    const getPetNames = async () => {
        try {
            const response = await fetch("/backend/get-pet-names", {
                method: "GET",
            });
            const data = await response.json(); 
            const transformedRows = data.data.map(row => ({
                id: row[0],
                name: row[1]
            }));
            setPets(transformedRows);
        } catch (e) {
          console.error(e);
        }
    };
    
    const getPeople = async () => {
        try {
            const [paidStaffResponse, volunteersResponse] = await Promise.all([
                fetch("/backend/get-paidStaff", { method: "GET" }),
                fetch("/backend/get-volunteers", { method: "GET" })
            ]);

            const paidStaffData = await paidStaffResponse.json();
            const volunteersData = await volunteersResponse.json();

            const paidStaffRows = paidStaffData.data.map(row => ({
                username: row[0],
                name: row[1],
                trainingID: row[2],
                university: row[3]
            }));

            const volunteerRows = volunteersData.data.map(row => ({
                username: row[0],
                name: row[1],
                trainingID: null,
                university: null
            }));

            const combinedRows = [...paidStaffRows, ...volunteerRows];
            
            setStaff(combinedRows);

            const newGroups = combinedRows.map(row => ({
                id: row.username,
                title: row.name,
                stackItems: true,
                height: 50
            }));
            setGroups(newGroups);
        } catch (e) {
            console.error(e);
        }
    };

    const getWalks = async () => {
        try {
            const [walksResponse, feedsResponse, treatsResponse] = await Promise.all([
                fetch("/backend/get-walks", { method: "GET" }),
                fetch("/backend/get-feeds", { method: "GET" }),
                fetch("/backend/get-treats", { method: "GET" })
            ]);
            const walksData = await walksResponse.json(); 
            const feedsData = await feedsResponse.json();
            const treatsData = await treatsResponse.json();

            const walkEvents = walksData.data.map(row => ({
                id: row[0],
                group: row[3],
                title: "Walk " + row[2] + " (" + row[1] + ")", 
                start_time: moment(row[5]),
                end_time: moment(row[5]).add(row[4], 'hour'),
                itemProps: {onDoubleClick: () => { console.log('You clicked double!') },
                style: {
                    background: "#73E1C9",
                    border: 0,
                    borderRadius: 4,
                }}
            }));

            const feedEvents = feedsData.data.map(row => ({
                id: row[0],
                group: row[3], 
                title: "Feed " + row[2] + " (" + row[1] + ")",
                start_time: moment(row[4]), 
                end_time: moment(row[4]).add(1, 'hour'),
                itemProps: {onDoubleClick: () => { console.log('You clicked double!') },
                style: {
                    background: '#FF8ED2',
                    border: 0,
                    borderRadius: 4,
                }}
            }));

            const treatsEvents = treatsData.data.map(row => ({
                id: row[0],
                group: row[3], 
                title: "Feed " + row[2] + " (" + row[1] + ")",
                start_time: moment(row[4]), 
                end_time: moment(row[4]).add(1, 'hour'),
                itemProps: {onDoubleClick: () => { console.log('You clicked double!') },
                style: {
                    background: '#A9E6FC',
                    border: 0,
                    borderRadius: 4,
                }}
            }));

            const allEvents = [...feedEvents, ...walkEvents, ...treatsEvents];
            setEvents(allEvents);
        } catch (e) {
          console.error(e);
        }
    };

    const insertIntoWalks = async (walkData, eventTitle, color) => {
        try {
            const response = await fetch("/backend/insert-walks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json", 
                },
                body: JSON.stringify(walkData), 
            });
            const result = await response.json();
            if (result.success) {
                console.log("Walk inserted successfully!");
                createEventOnScreen(eventTitle, color);
            } else {
                console.error("Failed to insert the walk.");
                setShowMessage(true);
            }          
        } catch (e) {
            console.error(e);
            setShowMessage(true);
        }
    };

    const getMaxWalkID = async () => {
        try {
            const response = await fetch(`/backend/get-maxWalkID`, {
              method: "GET",
            });
            const data = await response.json();
            console.log("Data MaxID: ", data);
            return data.data;
        } catch (e) {
            console.error(e);
            return 0;
        }
    };

    const handleCalc = async () => {
        console.log("handleCalc pressed");
        try {
            const response = await fetch(`/backend/get-walks-per-volunteer`, {
              method: "GET",
            });
            const data = await response.json();
            
            const transformedRows = data.data.map(row => ({
                count: row[0],
                name: row[1]
            }));
            setWalksPerVolunteer(transformedRows);
            console.log(transformedRows);
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    const getFormattedTime = () => {
        const date = new Date(showCreateModal.time);
        const formattedDate = `${date.getFullYear()}-${
            String(date.getMonth() + 1).padStart(2, '0')
        }-${
            String(date.getDate()).padStart(2, '0')
        } ${
            String(date.getHours()).padStart(2, '0')
        }:${
            String(date.getMinutes()).padStart(2, '0')
        }:${
            String(date.getSeconds()).padStart(2, '0')
        }`;
        return formattedDate;
    };

    const createWalk = async (eventTitle, color) => {
        try {
            const maxID = await getMaxWalkID();
            const date = getFormattedTime();
            const newWalk = {
                id: (maxID || 0) + 1, 
                animalID: selectedPet.id,
                volunteerID: showCreateModal.group,
                duration: showCreateModal.length,
                dateTime: date
            };
            console.log(newWalk);
            insertIntoWalks(newWalk, eventTitle, color); // UNCOMMENT LATER!!!!!!!!!!!!!!!!!!!
        } catch (e) {
            console.error("Error:", e);
        }
    };

    const createEventOnScreen = (eventTitle, color) => {
        eventTitle += (selectedPet.name + " (" + selectedPet.id + ")");
        const newEvent = {
            id: events.length + 1,
            group: showCreateModal.group,
            title: eventTitle, 
            start_time: showCreateModal.time,
            end_time: moment(showCreateModal.time).add(showCreateModal.length, 'hour'), 
            itemProps: {onDoubleClick: () => { console.log('You clicked double!') },
            style: {
                background: color,
                border: 0,
                borderRadius: 4,
            }}
        };
        console.log("newEvent: ", newEvent);
        setEvents([...events, newEvent]);
        setShowCreateModal({show: false, group: null, time: null, showLength: false, length: 1});
        setSelectedPet({id: null, name: "Pet"});
    };

    const createEvent = () => {
        var eventTitle = "";
        var color = "";
        staff.forEach(staffMember => {
            if (staffMember.username === showCreateModal.group) {
                if (staffMember.university !== null) {
                    eventTitle += "Treat ";
                    color = "#A9E6FC";
                    if (selectedPet.id !== null) {
                        createEventOnScreen(eventTitle, color);
                    } else {
                        setShowMessage(true);
                    }
                } else if (staffMember.trainingID !== null) {
                    eventTitle += "Feed ";
                    color = "#FF8ED2";
                    if (selectedPet.id !== null) {
                        createEventOnScreen(eventTitle, color);
                    } else {
                        setShowMessage(true);
                    }
                } else {
                    eventTitle += "Walk ";
                    color = "#73E1C9";
                    createWalk(eventTitle, color); 
                }
            }
        });
    };

    const handlePetSelection = (pet) => {
        setSelectedPet(pet);
        setShowMessage(false);
    };

    const handleLengthSelection = (e) => {
        setShowCreateModal({show: showCreateModal.show, group: showCreateModal.group, time: showCreateModal.time, showLength: true, length: e.target.value});
    };

    useEffect(() => {
        getPetNames();
        getPeople();
        getWalks();
    }, []);

    return (
        <div className='shifts-whole-thing'>
        <Modal className='modal' show={!!showCreateModal.show} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {showCreateModal.showLength && (<div data-mdb-input-init className="form-outline" show={!!showCreateModal.showLength}>
                <input type="number" placeholder='length' className="form-control" min="1" value={showCreateModal.length} onChange={handleLengthSelection}/>
            </div>)}
            <Dropdown data-bs-theme="dark" className='dropDown'>
                <DropdownToggle variant="secondary">
                    {selectedPet.name}
                </DropdownToggle>
                <DropdownMenu>
                    {pets.map((pet) => (
                        <DropdownItem key={pet.id} onClick={() => handlePetSelection(pet)}> 
                            {pet.id + " - " + pet.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            {showErrorMessage && (
                <p>
                    Please select values!
                </p>
            )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={createEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>

        <div className='shifts-header'>
            <h2 className='shifts-title'>
                Shifts
            </h2>
            <Button onClick={() => handleCalc()}>
                Calculate # of Walks For Each Volunteer
            </Button>
        </div>
        <Timeline
            groups={groups}
            items={events}
            defaultTimeStart={moment().add(-12, 'hour')}
            defaultTimeEnd={moment().add(12, 'hour')}
            lineHeight={50}
            itemHeightRatio={0.8}
            sidebarContent= {<p>.</p>}
            groupRenderer={groupRenderer}
            onCanvasDoubleClick={(groupId, time) => {
                console.log("groupID: ", groupId);
                var willShowLength = false;
                staff.forEach(staffMember => {
                    if (staffMember.username === groupId) {
                        console.log("staffMember: ", staffMember);
                        if (staffMember.university === null && staffMember.trainingID === null) {
                            willShowLength = true;
                        } 
                    }
                });
                setShowCreateModal({show: true, group: groupId, time: time, showLength: willShowLength, length: 1});
                console.log("showCreateModal: ", showCreateModal);
            }}
        >
            <TodayMarker/>
            <TimelineHeaders className='sticky'>
                <SidebarHeader>
                    {({ getRootProps }) => {
                    return <div {...getRootProps({style: {backgroundColor: "white"},})}/> ;
                    }}
                </SidebarHeader>
                <DateHeader 
                    unit="day"
                />
                <DateHeader 
                    unit="hour"
                    labelFormat="HH:00"
                />
            </TimelineHeaders>
        </Timeline>
        {walksPerVolunteer.length > 0 &&
            <div className='wholeList'>
            <p className='listItem'>
                Walks Per Volunteer:
            </p>
            {walksPerVolunteer.map((walkData, index) => (
                <div key={index} >
                    <p className="listItem">{walkData.name} : {walkData.count}</p>
                </div>
            ))}
        </div>
        }
        
        </div>
    );
}

export default ShiftsCalendar;