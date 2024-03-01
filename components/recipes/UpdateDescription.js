import React, { useState } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css'


const UpdateDescription = ({ initialDescription, onSave }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onSave(description);
  };

  return (
    <div className={styles.descriptionContainer}>
      <textarea className={styles.textarea}
        value={description}
        onChange={handleDescriptionChange}
      />
      <button className={styles.saveButton} onClick={handleSave}>
        Save Description
      </button>
      <br/>
    </div>
  );
};

export default UpdateDescription;

