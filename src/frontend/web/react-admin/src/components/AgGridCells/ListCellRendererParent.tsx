import React from 'react';

const ListCellRendererParent = ({ data }) => {
  const { eleves } = data;
  
  const elevesitems = eleves.map((classItem, index) => {
    
    return classItem.firstName + classItem.lastName;

});
  return (
    <span>
      {elevesitems.join(', ').split()}
    </span>
  );
};

export default ListCellRendererParent;
