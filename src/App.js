import { useState } from "react";
import "./App.css";
import ResponsiveDateTimePickers from "./DatePicker";

const initialTime = {
  date: "",
  time: "",
};

function App() {
  const [timeStamp, setTimeStamp] = useState(initialTime);

  console.log("timeStamp", timeStamp);

  const [showinput, setShowInput] = useState(false);
  const [textChange, setTextChange] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState("");

  console.log("events", events);

  const getTime = (time) => {
    setTimeStamp(time);
  };

  const handleChange = (e) => {
    setEvent(e.target.value);
  };

  const onClear = () => {
    setEvent("");
    setTimeStamp(initialTime);
  };

  const handleSubmit = () => {
    if (!timeStamp.date) {
      alert("Please select diff time");
      return;
    }

    const already = events.find((it) => it.id === timeStamp.date);

    let dates = [];
    if (already) {
      dates = events.map((it) => {
        if (it.id === timeStamp.date) {
          return {
            id: it.id,
            events: [
              ...it.events,
              {
                time: timeStamp.time,
                text: event,
              },
            ],
          };
        }
        return it;
      });
    } else {
      dates = [
        ...events,
        {
          id: timeStamp.date,
          events: [
            {
              time: timeStamp.time,
              text: event,
            },
          ],
        },
      ];
    }

    setEvents(dates);

    onClear();
  };

  const onDelete = (date, time) => {
    const dates = events.map((it) => {
      if (it.date === date) {
        return {
          id: it.id,
          events: it.events.filter((it) => it.time !== time),
        };
      }
      return it;
    });

    console.log("onDelete", dates);

    setEvents(dates);
  };

  const onEdit = (date, time) => {
    const dates = events.map((it) => {
      if (it.date === date) {
        return {
          id: it.id,
          events: it.events.map((it) => {
            if (it.time === time) {
              return {
                time: it.time,
                text: textChange,
              };
            }
            return it;
          }),
        };
      }
      return it;
    });

    setShowInput(false);
    setTextChange("");

    setEvents(dates);
  };

  return (
    <div className="App">
      <ResponsiveDateTimePickers
        event={event}
        timeStamp={timeStamp}
        getDate={getTime}
      />
      <input value={event} onChange={handleChange} placeholder="Event" />
      <button onClick={handleSubmit}>Submit</button>

      <ul>
        {events.map((it) => (
          <li key={it.id} style={{ margin: "10px 0px" }}>
            <div>
              {it.id}
              {it?.events.map((it) => (
                <div>
                  <span>
                    {it.time === showinput ? (
                      <input
                        defaultValue={it.text}
                        value={textChange}
                        onChange={(e) => setTextChange(e.target.value)}
                        placeholder="Event"
                      />
                    ) : (
                      it.text
                    )}
                  </span>
                  <button
                    onClick={() => {
                      if (showinput) setShowInput(false);
                      else {
                        setShowInput(it.time);
                        setTextChange(it.text);
                      }
                      showinput == it.time && onEdit(it.id, it.time);
                    }}
                  >
                    {showinput == it.time ? "Update" : "Edit"}
                  </button>
                  <button onClick={() => onDelete(it.id, it.time)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
