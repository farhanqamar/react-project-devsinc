import React from 'react';
import '../styles/components/card.scss'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Cards = ({data, image, name, username, bio, follow,}) => {
  return (
    <div className='d-flex '>
      <Card className="contai d-flex flex-column align-items-center gap-2">
          <Card.Img
            variant="top"
            className="imageStyle"
            src={image}
            alt='Profile Image'
          />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{username}</Card.Text>
            <Card.Text>{bio}</Card.Text>
            <Card.Text>{follow}</Card.Text>
            <Link to={`/${username}`} state={{ data }}>
              <Button className="btn btn-light">Visit Profile</Button>
            </Link>
          </Card.Body>
        </Card>
    </div>
  )
}

export default Cards
