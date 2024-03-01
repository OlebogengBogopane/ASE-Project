import React, { useEffect } from 'react';
import styles from '@/stylespages/RecipeDetails.module.css';

/**
 * Notification Component
 * This component is used to display notification messages with a specific type (e.g., success, error).
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The message to be displayed in the notification.
 * @param {string} props.type - The type of the notification (e.g., 'success', 'error').
 * @param {Function} props.onClose - A function to be called when the notification is closed.
 * @returns {JSX.Element} - The rendered Notification component.
 */

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Close the notification after 3 seconds

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
