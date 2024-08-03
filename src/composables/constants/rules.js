
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


export const validateSocialField = (name, value) => {
  let error = '';
  switch (name) {
    case 'platform':
      if (value.trim() === '') error = 'Platform is required.';
      break;
    case 'link':
      if (!/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(value)) error = 'Invalid URL.';
      break;
    default:
      break;
  }
  return error;
};


export const validateEducationField = (name, value, isCurrent) => {
  switch (name) {
    case 'school':
    case 'major':
    case 'degreeType':
    case 'gpa':
   case 'location':
    case 'startDate':
      if (value.trim() === '') return 'This field is required.';
      break;
    case 'endDate':
      if (!isCurrent) {
      if (!value) return 'This field is required.';
      if (new Date(value) < new Date()) {
        return 'End date must be after the start date.';
      }
      }
      break;
    default:
      break;
  }
  return '';
};

export const validateExperienceField = (name, value, isCurrent, startDate) => {
  switch (name) {
    case 'company':
    case 'location':
    case 'position':
    case 'startDate':
      if (value.trim() === '') return 'This field is required.';
      break;
    case 'endDate':
      if(!isCurrent){
        if (!value) return 'This field is required.';
        if (name === 'endDate' && new Date(value) < new Date(startDate)) {
          return 'End date must be after the start date.';
        }
      }
      break;
    default:
      break;
  }
  return '';
};


export const validateSkillField = (name, value) => {
  switch (name) {
    case 'category':
      if (value.trim() === '') return 'Skill category is required.';
      break;
    case 'skill':
      if (value.trim() === '') return 'Skills list is required.';
      break;
    default:
      break;
  }
  return '';
};

export const validateLanguageField = (name, value) => {
  switch (name) {
    case 'language':
      if (value.trim() === '') return 'Language is required.';
      break;
    case 'proficiency':
      if (!value) return 'Proficiency level is required.';
      break;
    default:
      break;
  }
  return '';
};

export const validateAchievementField = (name, value) => {
  switch (name) {
    case 'title':
      if (value.trim() === '') return 'Title is required.';
      break;
    case 'date':
      if (!value) return 'Date is required.';
      break;
    case 'description':
      if (value.trim() === '') return 'Description is required.';
      break;
    default:
      break;
  }
  return '';
};

