import React from 'react';
import './card.css';

const Card = (props) => {
  return (
    <div className='movie_card'>
      <img src={props.POSTER} alt={props.TITLE} />
      <h1>{props.TITLE}</h1>
    </div>
  );
};

export default Card;
