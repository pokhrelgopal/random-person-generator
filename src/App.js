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
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { first, last } = person.name;
    const { password } = person.login;
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
    if (e.target.classList.contains("icon")) {
      console.log("hello");
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
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
          <div className="values-list pt-8 flex items-center justify-evenly">
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaUser className="icon" data-label="name" />
            </button>
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen className="icon" data-label="email" />
            </button>
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaCalendarTimes className="icon" data-label="age" />
            </button>
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaMap className="icon" data-label="street" />
            </button>
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaPhone className="icon" data-label="phone" />
            </button>
            <button
              className="icon text-violet-700 text-xl md:text-2xl"
              onMouseOver={handleValue}
            >
              <FaLock className="icon" data-label="password" />
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
