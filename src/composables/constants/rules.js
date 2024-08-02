
export  const introValidation = (name, value, isNumberNeeded) => {
  let error = '';
  switch (name) {
    case 'firstName':
    case 'lastName':
      if (value.trim() === '') error = 'This field is required.';
      break;
    case 'email':
      if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format.';
      break;
    case 'website':
      if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value)) error = 'Invalid URL.';
      break;
    case 'number':
      if (isNumberNeeded && !/^\d+$/.test(value)) error = 'Number must be digits only.';
      break;
    case 'aboutMe':
      if (value.trim().length <= 10) error = 'Must be more than 10 characters.';
      break;
    default:
      break;
  }
  return error;
};
