import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { GiShadowFollower } from "react-icons/gi";
import { Image } from "react-bootstrap";
import "../styles/pages/userDetails.scss";
import axios from "axios";
import Cards from '../components/Cards'

const apiuRL = import.meta.env.REACT_APP_API;

const UserDetails = () => {
  const [repoData, setRepoData] = useState();
  const [followersData, setFollowersData] = useState();
  const [followingData, setfollowingData] = useState();
  const [activeSection, setActiveSection] = useState('repositories');

  const location = useLocation();
  const { data } = location.state || {};
  
  useEffect(() => {
    repoDataFetch()
    followersDataFetch()
    followingDataFetch()
  },[])

  const repoDataFetch = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("repoData"));
    if (dataFromLocalStorage && data.login === dataFromLocalStorage.login) {
      setRepoData(dataFromLocalStorage);
    } else {
      axios.get(data.repos_url)
        .then((res) => {
          const myData = res.data;
          localStorage.setItem("repoData", JSON.stringify(myData));
          setRepoData(myData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const followersDataFetch = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("followersData"));
    if (dataFromLocalStorage && data.followers_url === dataFromLocalStorage.login) {
      setFollowersData(dataFromLocalStorage);
    } else {
      axios.get(data.followers_url)
        .then((res) => {
          const myData = res.data;
          localStorage.setItem("followersData", JSON.stringify(myData));
          setFollowersData(myData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const followingDataFetch = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("followingData"));
    if (dataFromLocalStorage && data.following_url === dataFromLocalStorage.login) {
      setfollowingData(dataFromLocalStorage);
    } else {
      axios.get(`${apiuRL}/${data.login}/following`)
        .then((res) => {
          const myData = res.data;
          localStorage.setItem("followingData", JSON.stringify(myData));
          setfollowingData(myData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <div>
      <Link to="/">
        <Button variant="light">← Back</Button>
      </Link>
      
        {data ? (
          <div className="container">
            <div className="row">
            <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center">
              <Image
                src={data.avatar_url}
                className="imageStyle"
                alt="Profile Image"
              />
            </div>
            <div className="col-12 col-md-6 d-flex flex-wrap flex-md-column justify-content-center gap-2 mt-3">
              <p>Name: {data.name}</p>
              <p>User Name: {data.login}</p>
              <p>Bio: {data.bio ? data.bio : "Bio not found"}</p>
              <p>
                {data.followers} followers &#8226; {data.following} following
              </p>

              <p>Repositories: {data.public_repos}</p>
            </div>
          </div>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      

      <hr />
      <div className="button-group text-center my-3">
        <button onClick={() => setActiveSection('repositories')} className="btn btn-light mx-2">
          Repositories
        </button>
        <button onClick={() => setActiveSection('followers')} className="btn btn-light mx-2">
          Followers
        </button>
        <button onClick={() => setActiveSection('following')} className="btn btn-light mx-2">
          Following
        </button>
      </div>

      {activeSection === 'repositories' && (
        <div>
          <h2 className="text-center">Repositories</h2>
          <div className="repoCard d-flex flex-wrap justify-content-center gap-3 p-3">
            {repoData?.map((repo) => (
              <div key={repo.id} className="border bg-black text-white repoStyle">
                <h3>{repo.name}</h3>
                <a href={repo.html_url} className="text-light">Visit Repo</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'followers' && (
        
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          
          {followersData?.map((follower) => (
            <Cards
            key={follower.id}
            data={follower}
            image={follower.avatar_url}
            username={follower.login}
            />
          ))}
        </div>
      )}

      {activeSection === 'following' && (
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          
          {followingData?.map((following) => (
            <Cards
            key={following.id}
            data={following}
            image={following.avatar_url}
            username={following.login}
            />
          ))}
        </div>
      )}
      </div>
  );
}

export default UserDetails;