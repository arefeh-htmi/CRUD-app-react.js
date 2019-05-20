import React, { Component } from 'react';
const Create = () => {
  return (
    <>
      <ol>
        {this.state.myData.map((el, id) => (
          <li key={id}>
            {el.name} /{el.mail}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Create;
