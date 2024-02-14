import React, { useState } from "react";
import './index.css'; // Import the CSS file with provided styles

export const Layout = () => {
    // Sample data representing facilities, rooms, and details
    const [facilitiesData, setFacilitiesData] = useState([
        {
            id: 1,
            facilityName: "Facility 1",
            rooms: [
                { id: 1, name: "Room 1" },
                { id: 2, name: "Room 2" }
            ],
            details: [
                { room: "Room 1", detail1: "Detail 1", detail2: "Detail 2" },
                { room: "Room 2", detail1: "Detail 1", detail2: "Detail 2" }
            ]
        },
        {
            id: 2,
            facilityName: "Facility 2",
            rooms: [
                { id: 3, name: "Room 1" },
                { id: 4, name: "Room 2" }
            ],
            details: [
                { room: "Room 1", detail1: "Detail 1", detail2: "Detail 2" },
                { room: "Room 2", detail1: "Detail 1", detail2: "Detail 2" }
            ]
        }
    ]);

    const [editFacility, setEditFacility] = useState(null);
    const [editRoom, setEditRoom] = useState(null);
    const [displayNotes, setDisplayNotes] = useState(false)
    const handleFacilityNameChange = (id, newName) => {
        // This function will be called only when Enter key is pressed
        setFacilitiesData(prevState => {
            return prevState.map(facility => {
                if (facility.id === id) {
                    return { ...facility, facilityName: newName };
                }
                return facility;
            });
        });
        setEditFacility(null);
    };

    const handleRoomNameChange = (facilityId, roomId, newName) => {
        // This function will be called only when Enter key is pressed
        setFacilitiesData(prevState => {
            return prevState.map(facility => {
                if (facility.id === facilityId) {
                    return {
                        ...facility,
                        rooms: facility.rooms.map(room => {
                            if (room.id === roomId) {
                                return { ...room, name: newName };
                            }
                            return room;
                        })
                    };
                }
                return facility;
            });
        });
        setEditRoom(null);
    };

    const toggleEditFacility = (id) => {
        setEditFacility(id);
    };

    const toggleEditRoom = (facilityId, roomId) => {
        setEditRoom({ facilityId, roomId });
    };

    const handleKeyPress = (event, facilityId, roomId, newName) => {
        if (event.key === 'Enter') {
            if (facilityId && roomId) {
                handleRoomNameChange(facilityId, roomId, newName);
            } else if (facilityId) {
                handleFacilityNameChange(facilityId, newName);
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="headerContainer">
                    <h2>Facilities</h2>
                    <div className="buttons">
                        <button>Add</button>
                        <button>Remove</button>
                        <button>Edit</button>
                    </div>
                </div>
                {facilitiesData.map((facility, index) => (
                    <div key={facility.id} className="facility">
                        <div className="facilityHeader">
                            {editFacility === facility.id ? (
                                <input
                                    type="text"
                                    style={{ marginBottom: '5px' }}
                                    value={facility.facilityName}
                                    onChange={(e) => setEditFacility(e.target.value)}
                                    onBlur={() => setEditFacility(null)}
                                    onKeyPress={(e) => handleKeyPress(e, facility.id)}
                                    autoFocus
                                />
                            ) : (
                                <div className="headerContainer">
                                    <h3 onClick={() => setDisplayNotes(!displayNotes)} style={{cursor:'pointer'}}>{facility.facilityName}</h3>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="buttonsc" onClick={() => toggleEditFacility(facility.id)}>Add</button>
                                        <button className="buttonsc" onClick={() => toggleEditFacility(facility.id)}>Edit</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="rooms">
                            {facility.rooms.map(room => (
                                <div key={room.id} className="room">
                                    {editRoom && editRoom.facilityId === facility.id && editRoom.roomId === room.id ? (
                                        <input
                                            type="text"
                                            value={room.name}
                                            onChange={(e) => setEditRoom(e.target.value)}
                                            onBlur={() => setEditRoom(null)}
                                            onKeyPress={(e) => handleKeyPress(e, facility.id, room.id, room.name)}
                                            autoFocus
                                        />
                                    ) : (
                                        <div className="headerContainer">
                                            <h4>{room.name}</h4>
                                            <button className="buttonsc" onClick={() => toggleEditRoom(facility.id, room.id)}>Edit</button>
                                        </div>
                                    )}
                                    <div className="details">
                                        {facility.details.map((detail, detailIndex) => (
                                            detail.room === room.name && (
                                                <div key={detailIndex}>
                                                    <p>{detail.detail1}</p>
                                                    <p>{detail.detail2}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {displayNotes && <div>
                    <label>Notes</label>
                    <textarea
                        aria-label="notes"
                        value={''}
                        rows={3}
                    />
                </div>}
            </div>

        </>
    );
};
