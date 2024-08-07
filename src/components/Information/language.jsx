import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import { updateCvInfo } from '../../redux/cvInfoSlice.js';
import { useState } from 'react';
import { validateLanguageField } from '../../composables/constants/rules.js';

const Language = ({ formValues, onFormValuesChange, reportValidation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); // State to store validation errors

  const validateAllLanguageEntries = () => {
    const newErrors = {};
    formValues.languages.forEach((language, index) => {
      Object.keys(language).forEach((key) => {
        const error = validateLanguageField(key, language[key]);
        if (error) {
          newErrors[index] = newErrors[index] || {};
          newErrors[index][key] = error;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLanguageChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedLanguages = [...formValues.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [name]: type === 'checkbox' ? checked : value,
    };
    onFormValuesChange((prevValues) => ({
      ...prevValues,
      languages: updatedLanguages,
    }));
  };

  const addLanguage = () => {
    if (validateAllLanguageEntries()) {
      onFormValuesChange((prevValues) => ({
        ...prevValues,
        languages: [
          ...prevValues.languages,
          {
            language: '',
            proficiency: '',
            isEdit: true,
          },
        ],
      }));
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        const newIndex = formValues.languages.length; // index of the newly added entry
        delete newErrors[newIndex];
        return newErrors;
      });
    }
  };

  const handleDeleteLanguage = (index) => {
    onFormValuesChange((prevValues) => {
      const updatedLanguages = [...prevValues.languages];
      updatedLanguages.splice(index, 1);
      const updatedValues = {
        ...prevValues,
        languages: updatedLanguages,
      };
      dispatch(updateCvInfo(updatedValues));
      return updatedValues;
    });
  };

  const handleAddLanguage = (index) => {
    const newErrors = {};
    const language = formValues.languages[index];
    Object.keys(language).forEach((key) => {
      const error = validateLanguageField(key, language[key]);
      if (error) {
        newErrors[index] = newErrors[index] || {};
        newErrors[index][key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    } else {
      onFormValuesChange((prevValues) => {
        const updatedLanguages = [...prevValues.languages];
        updatedLanguages[index] = {
          ...updatedLanguages[index],
          isEdit: false,
        };
        const updatedValues = {
          ...prevValues,
          languages: updatedLanguages,
        };
        dispatch(updateCvInfo(updatedValues));
        const isValid = validateAllLanguageEntries(formValues);
        reportValidation(isValid);
        return updatedValues;
      });
    }
  };

  const handleEditLanguage = (index) => {
    onFormValuesChange((prevValues) => {
      const updatedLanguages = [...prevValues.languages];
      updatedLanguages[index] = {
        ...updatedLanguages[index],
        isEdit: true,
      };
      return { ...prevValues, languages: updatedLanguages };
    });
  };
  const handleLanguageClick = (index, language) => {
    if (language.isEdit && validateAllLanguageEntries()) {
      handleAddLanguage(index);
    } else {
      handleDeleteLanguage(index);
    }
  };

  return (
    <div>
      <Card
        variant="outlined"
        className="tw-flex tw-items-center tw-flex-col tw-w-[100%] tw-p-5 tw-mt-3"
      >
        <h3 className="tw-font-[600] tw-mb-3">STEP - 6</h3>
        <h1>Languages</h1>
        <p>Showcase your linguistic abilities!</p>
        {formValues.languages.map((language, index) =>
          language.isEdit ? (
            <Card
              key={index}
              variant="outlined"
              className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[90%] md:tw-w-[80%]"
            >
              <div className="tw-w-full tw-flex tw-justify-end">
                <Close
                  className="tw-font-black pointer"
                  onClick={() => handleLanguageClick(index, language)}
                />
              </div>
              <div className="tw-gap-5 tw-flex tw-flex-row">
                <div className=" tw-w-full">
                  <TextField
                    name="language"
                    label="Languages"
                    variant="standard"
                    value={language.language}
                    error={!!errors[index]?.language}
                    helperText={errors[index]?.language}
                    onChange={(e) => handleLanguageChange(index, e)}
                    fullWidth
                  />
                </div>

                <FormControl variant="standard" className="tw-w-full">
                  <InputLabel id="demo-simple-select-label">
                    Proficiency
                  </InputLabel>
                  <Select
                    name="proficiency"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    value={language.proficiency}
                    error={!!errors[index]?.proficiency}
                    onChange={(e) => handleLanguageChange(index, e)}
                  >
                    <MenuItem value={'Beginner'}>Beginner</MenuItem>
                    <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                    <MenuItem value={'Advanced'}>Advanced</MenuItem>
                    <MenuItem value={'Native'}>Native</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="tw-mt-5 tw-flex tw-justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddLanguage(index)}
                >
                  Add
                </Button>
              </div>
            </Card>
          ) : (
            <Card
              key={index}
              className="tw-w-[100%] tw-p-5 tw-m-1 sm:tw-w-[80%] "
            >
              <div className="tw-flex tw-justify-between">
                <h3 className="tw-font-[600]">{language.language}</h3>
                <div>
                  <Edit
                    className="pointer"
                    onClick={() => handleEditLanguage(index)}
                  />
                  <Delete
                    className="pointer tw-text-[#FF0000]"
                    onClick={() => handleDeleteLanguage(index)}
                  />
                </div>
              </div>
              <p className="tw-text-[13px] tw-inline">{language.proficiency}</p>
            </Card>
          ),
        )}
        <div className="tw-mt-[20px]">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addLanguage}
          >
            Add Language
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Language;
