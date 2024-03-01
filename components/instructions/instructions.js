import React, { useState } from 'react';
import styles from './instructions.module.css';

/**
 * Component for updating and displaying recipe instructions.
 * @param {Object} props - Properties passed to the component.
 * @param {Array} props.instructions - The current list of recipe instructions.
 * @param {string} props.recipeId - The ID of the recipe associated with the instructions.
 * @returns {JSX.Element} - Rendered React component.
 */

function RecipeInstructions({ instructions, recipeId }) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [editedInstructions, setEditedInstructions] = useState([...instructions]);
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null);

  const handleEditInstructions = () => {
    setIsEditingInstructions(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Set the timeout to hide the notification after 3 seconds
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      // Check if any instruction is empty
      if (editedInstructions.some(instruction => !instruction.trim())) {
        showNotification('Instructions cannot be empty.', 'error');
        return; // Do not proceed with saving
      }
  
      const requestBody = JSON.stringify({
        recipeId: recipeId,
        instructions: editedInstructions,
      });
  
      const response = await fetch('/api/updateInstructions/updateInstructions', {
        method: 'POST',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        showNotification('Instructions saved successfully.', 'success');
        setIsEditingInstructions(false);
      } else {
        showNotification('Failed to save instructions. ', 'error');
      }
    } catch (error) {
      showNotification('An error occurred while saving instructions.', 'error');
    }
  };
  

  const handleInstructionChange = (index, newValue) => {
    const updatedInstructions = [...editedInstructions];
    updatedInstructions[index] = newValue;
    setEditedInstructions(updatedInstructions);
  };

  const handleCancel = () => {
    setEditedInstructions([...instructions]);
    setIsEditingInstructions(false);
  };

  return (
    <div>
      {isEditingInstructions ? (
        <div>
          <ol>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>
                <div className={styles.container1}>
                  <textarea className={styles.inputField}
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                  />
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.btn}>
            <button onClick={handleSave} className={styles.saveButton}>
              {loading ? 'Loading...' : 'Save'}
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <ol>
            {editedInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button
            style={{
              background: 'red',
              borderRadius: '20px',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#972f2f')}
            onMouseLeave={(e) => (e.target.style.background = 'red')}
            onClick={handleEditInstructions}
          >
            Edit Instructions
          </button>
        </div>
      )}
      {notification && (
        <div
          className={
            notification.type === 'success'
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default RecipeInstructions;
