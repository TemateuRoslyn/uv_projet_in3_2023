import React from 'react';

const ListCellRenderer = ({ data }) => {
  const { classes } = data;
  
  const classesitems = classes.map((classItem, index) => {
    return classItem.shortName + classItem.speciality + classItem.no;
});
  return (
    <span>
      {classesitems.join(',').split()}
    </span>
  );
};

export default ListCellRenderer;
