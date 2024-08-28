import { useState } from "react";
import "./index.css";

export const CureRooms = () => {
  const defaultData = [
    {
      facility: "333 BarkRoad",
      rooms: [
        {
          room: "Room 1",
          currentTemp: 61,
          avgTemp: 60,
          currentHum: 60,
          avgHum: 61,
          locations: [
            {
              location: "Location 1",
              temperature: 62,
              humidity: 58,
              strains: [
                { strain: "JB", weight: 30, type: "bud" },
                { strain: "GTH", weight: 80, type: "shake" },
              ],
            },
            {
              location: "Location 2",
              temperature: 61,
              humidity: 52,
              strains: [
                { strain: "CT", weight: 25, type: "bud" },
                { strain: "BTH", weight: 50, type: "shake" },
              ],
            },
          ],
        },
      ],
    },
    {
      facility: "1045 Webber",
      rooms: [
        {
          room: "Room 2",
          currentTemp: 63,
          avgTemp: 62,
          currentHum: 64,
          avgHum: 63,
          locations: [
            {
              location: "Location 1",
              temperature: 65,
              humidity: 54,
              strains: [
                { strain: "JB", weight: 30, type: "bud" },
                { strain: "GTH", weight: 80, type: "shake" },
              ],
            },
            {
              location: "Location 2",
              temperature: 62,
              humidity: 53,
              strains: [
                { strain: "CT", weight: 25, type: "bud" },
                { strain: "BTH", weight: 50, type: "shake" },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [data, setData] = useState(defaultData);

  const handleFacilityChange = (e) => {
    const value = e.target.value;
    setSelectedFacilities((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const handleRoomChange = (facility, room) => {
    const value = `${facility}:${room}`;
    setSelectedRooms((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );
  };

  const handleFilter = () => {
    let filteredData = defaultData.filter((d) =>
      selectedFacilities.includes(d.facility)
    );
    filteredData = filteredData.map((facilityData) => ({
      ...facilityData,
      rooms: facilityData.rooms.filter((room) =>
        selectedRooms.includes(`${facilityData.facility}:${room.room}`)
      ),
    }));
    setData(filteredData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "800px",
          marginBottom: "20px",
        }}
        className="facility_room_box_container"
      >
        <div
          style={{
            width: "48%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            maxHeight: "200px",
            overflowY: "auto",
          }}
          className="facility_room_box"
        >
          <h4
            style={{ marginBottom: "10px", fontSize: "20px", fontWeight: 600 }}
          >
            Select Facilities
          </h4>
          {defaultData.map((facility) => (
            <div
              key={facility.facility}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                style={{ marginLeft: "8px", fontSize: "18px", fontWeight: 500 }}
              >
                <input
                  type="checkbox"
                  value={facility.facility}
                  onChange={handleFacilityChange}
                />
                {facility.facility}
              </label>
            </div>
          ))}
        </div>

        {selectedFacilities.length > 0 && (
          <div
            style={{
              width: "48%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              maxHeight: "200px",
              overflowY: "auto",
            }}
            className="facility_room_box"
          >
            <h4
              style={{
                marginBottom: "10px",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Select Rooms
            </h4>
            {defaultData
              .filter((f) => selectedFacilities.includes(f.facility))
              .map((facility) => (
                <div key={facility.facility}>
                  <h5 style={{ fontSize: "18px", fontWeight: 600 }}>
                    {facility.facility}
                  </h5>
                  {facility.rooms.map((room) => (
                    <div
                      key={room.room}
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{
                          marginLeft: "8px",
                          fontSize: "18px",
                          fontWeight: 500,
                        }}
                      >
                        <input
                          type="checkbox"
                          value={room.room}
                          onChange={() =>
                            handleRoomChange(facility.facility, room.room)
                          }
                        />
                        {room.room}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onClick={handleFilter}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Submit
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: "800px" }}>
        {data.map((facilityData) => (
          <div
            key={facilityData.facility}
            style={{
              marginBottom: "20px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {facilityData.facility}
            </h3>
            {facilityData.rooms.map((room) => (
              <div
                key={room.room}
                style={{ marginBottom: "15px", padding: "10px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginRight: "20px" }}>
                    <h4
                      style={{
                        marginBottom: "10px",
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {room.room}
                    </h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "50px",
                    }}
                  >
                    <div>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Current Temp: {room.currentTemp}°F
                      </p>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Current Hum: {room.currentHum}%
                      </p>
                    </div>
                    <div>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Avg Temp: {room.avgTemp}°F
                      </p>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Avg Hum: {room.avgHum}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="room-box">
                  <div
                    style={{
                      overflowX: "auto",
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    {room.locations.map((location) => (
                      <div
                        key={location.location}
                        style={{
                          marginRight: "10px",
                          padding: "15px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          backgroundColor: "#e9ecef",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          minWidth: "350px", // Ensure each location box has a minimum width
                        }}
                      >
                        <h5
                          style={{
                            marginBottom: "8px",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          {location.location}
                        </h5>
                        <div
                          style={{
                            marginBottom: "10px",
                            fontSize: "14px",
                            color: "#6c757d",
                          }}
                        >
                          <p style={{ display: 'flex', margin: 0, padding: 0 }}><p style={{ width: '100px' }}>Temperature:</p> {location.temperature}°C</p>
                          <p style={{ display: 'flex', margin: 0, padding: 0 }}><p style={{ width: '100px' }}>Humidity:</p> {location.humidity}%</p>
                        </div>
                        <div style={{ fontSize: "16px" }}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr",
                              gap: "10px",
                              fontWeight: 600,
                              borderBottom: "2px solid #ddd",
                              paddingBottom: "5px",
                              marginBottom: "10px",
                            }}
                          >
                            <div>Strain</div>
                            <div>Q</div>
                            <div>Type</div>
                          </div>
                          {location.strains.map((strain, index) => (
                            <div
                              key={index}
                              style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr",
                                gap: "10px",
                                marginBottom: "5px",
                              }}
                            >
                              <span>{strain.strain}</span>
                              <span>{strain.weight}g</span>
                              <span>{strain.type}</span>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>


              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
