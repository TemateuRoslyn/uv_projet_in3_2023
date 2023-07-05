import React from 'react';

const ListCellRenderer = ({ data }) => {
  const { classes } = data;
  
  return (
    <ul>
      {classes.map((classItem, index) => (
        <li key={index}>{classItem.name}</li>
      ))}
    </ul>
  );
};

export default ListCellRenderer;
