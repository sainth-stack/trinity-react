import { useState } from "react";
import "./index.css";

export const CureRooms = () => {
  const defaultData = [
    {
      facility: "333 BarkRoad",
      rooms: [
        {
          room: "Room 1",
          locations: [
            {
              location: "Location 1",
              currentTemp: 60,
              avgTemp: 59,
              currentHum: 60,
              avgHum: 61,
              strains: [
                { strain: "JB 80g Bud" },
                { strain: "GG 120g Shake" },
                { strain: "GT4 100g Trim" },
                { strain: "BS 150g Bud" },
              ],
            },
            {
              location: "Location 2",
              currentTemp: 61,
              avgTemp: 60,
              currentHum: 61,
              avgHum: 62,
              strains: [
                { strain: "JB 90g Bud" },
                { strain: "DS 110g Shake" },
                { strain: "GT4 120g Trim" },
                { strain: "BS 140g Bud" },
              ],
            },
            {
              location: "Location 3",
              currentTemp: 62,
              avgTemp: 61,
              currentHum: 62,
              avgHum: 63,
              strains: [
                { strain: "JB 85g Bud" },
                { strain: "GG 125g Shake" },
                { strain: "GT4 105g Trim" },
                { strain: "BS 160g Bud" },
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
          locations: [
            {
              location: "Location 1",
              currentTemp: 63,
              avgTemp: 62,
              currentHum: 64,
              avgHum: 63,
              strains: [
                { strain: "GT4 90g Trim" },
                { strain: "JB 95g Bud" },
                { strain: "GG 135g Shake" },
                { strain: "BS 155g Bud" },
              ],
            },
            {
              location: "Location 2",
              currentTemp: 65,
              avgTemp: 64,
              currentHum: 66,
              avgHum: 65,
              strains: [
                { strain: "GT4 100g Trim" },
                { strain: "JB 100g Bud" },
                { strain: "GG 140g Shake" },
                { strain: "BS 150g Bud" },
              ],
            },
          ],
        },
      ],
    },
    {
      facility: "2029 Gypsy",
      rooms: [
        {
          room: "Room 3",
          locations: [
            {
              location: "Location 1",
              currentTemp: 58,
              avgTemp: 59,
              currentHum: 57,
              avgHum: 58,
              strains: [
                { strain: "XY 120g Bud" },
                { strain: "AB 90g Shake" },
                { strain: "LM 110g Trim" },
                { strain: "NO 80g Bud" },
              ],
            },
            {
              location: "Location 2",
              currentTemp: 60,
              avgTemp: 61,
              currentHum: 59,
              avgHum: 60,
              strains: [
                { strain: "XY 130g Bud" },
                { strain: "AB 100g Shake" },
                { strain: "LM 115g Trim" },
                { strain: "NO 85g Bud" },
              ],
            },
          ],
        },
      ],
    },
    {
      facility: "742 Evergreen Terrace",
      rooms: [
        {
          room: "Room 4",
          locations: [
            {
              location: "Location 1",
              currentTemp: 64,
              avgTemp: 65,
              currentHum: 66,
              avgHum: 64,
              strains: [
                { strain: "EF 80g Trim" },
                { strain: "GH 70g Bud" },
                { strain: "IJ 100g Shake" },
                { strain: "KL 95g Bud" },
              ],
            },
            {
              location: "Location 2",
              currentTemp: 65,
              avgTemp: 66,
              currentHum: 67,
              avgHum: 65,
              strains: [
                { strain: "EF 85g Trim" },
                { strain: "GH 75g Bud" },
                { strain: "IJ 105g Shake" },
                { strain: "KL 100g Bud" },
              ],
            },
          ],
        },
      ],
    },
    {
      facility: "1313 Mockingbird Lane",
      rooms: [
        {
          room: "Room 5",
          locations: [
            {
              location: "Location 1",
              currentTemp: 62,
              avgTemp: 63,
              currentHum: 61,
              avgHum: 62,
              strains: [
                { strain: "MN 95g Trim" },
                { strain: "OP 85g Bud" },
                { strain: "QR 125g Shake" },
                { strain: "ST 110g Bud" },
              ],
            },
            {
              location: "Location 2",
              currentTemp: 63,
              avgTemp: 64,
              currentHum: 62,
              avgHum: 63,
              strains: [
                { strain: "MN 100g Trim" },
                { strain: "OP 90g Bud" },
                { strain: "QR 130g Shake" },
                { strain: "ST 115g Bud" },
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
                        Current Temp: {room.locations[0].currentTemp}°F
                      </p>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Current Hum: {room.locations[0].currentHum}%
                      </p>
                    </div>
                    <div>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Avg Temp: {room.locations[0].avgTemp}°F
                      </p>
                      <p style={{ marginBottom: "5px", fontSize: "16px" }}>
                        Avg Hum: {room.locations[0].avgHum}%
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
                        <div style={{ fontSize: "16px" }}>
                          {location.strains.map((strain, index) => (
                            <p key={index}>{strain.strain}</p>
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
