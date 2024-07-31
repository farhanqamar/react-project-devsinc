import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";

const apiuRL = import.meta.env.REACT_APP_API;

const FirstData = () => {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("firstPageUsers")
    );
    if (dataFromLocalStorage) {
      setUsersData(dataFromLocalStorage);
    } else {
      axios
        .get(apiuRL)
        .then((res) => {
          const myData = res.data;
          localStorage.setItem("firstPageUsers", JSON.stringify(myData));
          setUsersData(myData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3">
      {usersData?.map((data) => (
        <>
          <Cards data={data} image={data.avatar_url} username={data.login} />
        </>
      ))}
    </div>
  );
};

export default FirstData;
