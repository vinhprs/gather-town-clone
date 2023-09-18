// Function to set a value in localStorage
export function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true; // Success
  } catch (error) {
    console.error("Error setting localStorage item:", error);
    return false; // Error
  }
}

// Function to get a value from localStorage
export function getLocalStorageItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
}
