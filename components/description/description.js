import React, { useState } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css';

/**
 * Component for updating and displaying recipe descriptions.
 * @param {Object} props - Properties passed to the component.
 * @param {string} props.description - The current recipe description.
 * @param {string} props.recipeId - The ID of the recipe associated with the description.
 * @returns {JSX.Element} - Rendered React component.
 */

const UpdateDescription = ({ description, recipeId }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState (false) // state for loading

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Set the timeout to hide the notification after 3 seconds
  };

  const handleSave = async () => {
    try {
      setIsLoading(true); //switch loading state

      const requestBody = JSON.stringify({
        recipeId: recipeId,
        description: editedDescription,
      });

      const response = await fetch('/api/updateDescription/updateDescription', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        showNotification('Description saved successfully.', 'success');
        setIsEditingDescription(false);
      } else {
        showNotification('Failed to save description! Description cannot be empty.', 'error');
      }
    } catch (error) {
      showNotification('An error occurred while saving description.', 'error');
    } finally {
      setIsLoading(false); //switch loading state back to false
    }
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleCancel = () => {
    setEditedDescription(description);
    setIsEditingDescription(false);
  };

  return (
    <div>

      
      {isEditingDescription ? (
        <div>
          <textarea className={styles.inputField}
            value={editedDescription}
            onChange={handleDescriptionChange}
          />

          <div>
            <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>{isLoading ? 'Loading...' : 'Save'}</button>
            <button onClick={handleCancel}className={styles.cancelButton}>Cancel</button>
          </div>
          
        </div>
      ) : (
        <div>
          <p>{editedDescription}</p>
          <button
            style={{
              background:'red',
              borderRadius: '20px',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#972f2f')}
            onMouseLeave={(e) => (e.target.style.background = 'red')}
            onClick={handleEditDescription}
          >
            Edit Description
          </button>
        </div>
      )}

      {notification && (
        <div
          className={
            notification.type === 'success'
              ? styles.successNotification
              : styles.errorNotification
          }
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default UpdateDescription;
