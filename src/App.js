import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
  FaLandmark,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };
  useEffect(() => {
    getPerson();
  }, []);
  const handleValue = (e) => {
    //
  };

  return (
    <main className="container mx-auto p-3 md:p-0">
      <div className="container flex flex-col items-center justify-center -mt-20 h-screen">
        <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-8 shadow-md ">
          <div className="img flex items-center justify-center">
            <img
              src={(person && person.image) || defaultImage}
              alt="image"
              className="rounded-full border-2 shadow-md"
            />
          </div>
          <div className="p-container flex flex-col items-center ">
            <p className="text-sm">My {title} is</p>
            <p className="text-lg font-semibold capitalize">{value}</p>
          </div>
          <div className="icons pt-8 flex items-center justify-evenly">
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="age"
              onMouseOver={handleValue}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="text-violet-700 text-xl md:text-2xl"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <div className="button pt-8 flex items-center justify-center">
            <button
              className="bg-violet-600 text-white rounded py-1 px-2"
              type="button"
              onClick={getPerson}
            >
              {loading ? "Loading..." : "Random User"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
