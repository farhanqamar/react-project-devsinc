import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "../styles/pages/home.scss";
import Cards from "../components/Cards";
import FirstData from '../parts/FirstData';

const apiuRL = import.meta.env.REACT_APP_API;

const Home = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetching();
  }, [search]);

  const fetching = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("users"));
    if (dataFromLocalStorage && search === dataFromLocalStorage.login) {
      setData(dataFromLocalStorage);
    } else {
      axios.get(apiuRL + `/${search}`)
        .then((res) => {
          const myData = res.data;
          localStorage.setItem("users", JSON.stringify(myData));
          setData(myData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetching();
  };

  return (
    <section className="d-flex flex-column align-items-center gap-5 mb-5">
      <form className="formStyle mt-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          className="inputStyle"
          placeholder="Write Username"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="buttonStyle"
          onClick={(e) => setSearch(e.target.value)}
          type="submit"
        >
          Search
        </button>
      </form>

      {data ? (
            <Cards
            data={data}
            image={data.avatar_url}
            name={data.name}
            username={data.login}
            bio={`Bio: ${data.bio ? data.bio : "Bio not found"}`}
            follow={`${data.followers} followers &#8226; ${data.following} following`}
            folwing={data.repos_url}
            />
      ):
      <FirstData/>
      }
    </section>
  );
}


export default Home;