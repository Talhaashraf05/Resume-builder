import { useEffect, useState } from 'react';
import '././css/components.scss';
import { useDispatch, useSelector } from 'react-redux';
import Intro from './Information/intro.jsx';
import Social from './Information/social.jsx';
import Education from './Information/education.jsx';
import Experience from './Information/experience.jsx';
import Skill from './Information/Skill.jsx';
import Language from './Information/language.jsx';
import Achievements from './Information/achievements.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { updateAllInfoValidate } from '../redux/cvInfoSlice.js';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cvInfo = useSelector((state) => state.cvInfo.cvInfo[0]);
  const cvValidation = useSelector((state) => state.cvInfo.allInfoValidate);
  const [formValues, setFormValues] = useState(cvInfo);
  const handleFormValuesChange = (newValues) => {
    setFormValues(newValues);
  };

  // const [validationStatus, setValidationStatus] = useState(cvValidation);
  const handleValidationChange = (section, isValid) => {
    // setValidationStatus((prevStatus) => ({
    //   ...prevStatus,
    //   [section]: isValid,
    // }));
    dispatch(updateAllInfoValidate({ section, isValid }));
  };

  useEffect(() => {
    setFormValues(cvInfo);
  }, [cvInfo]);

  return (
    <div className="tw-mt-3 tw-flex tw-justify-center tw-flex-col tw-items-center">
      <div className="tw-w-[90%] sm:!tw-w-[60%]">
        {/*Intro*/}
        <Intro
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('intro', isValid)
          }
        />

        {/*Social*/}
        <Social
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('social', isValid)
          }
        />

        {/*Education*/}
        <Education
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('education', isValid)
          }
        />

        {/*Experience*/}
        <Experience
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('experience', isValid)
          }
        />

        {/*Skills*/}
        <Skill
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('skill', isValid)
          }
        />

        {/*Language*/}
        <Language
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
          reportValidation={(isValid) =>
            handleValidationChange('language', isValid)
          }
        />

        {/*Achievements*/}
        <Achievements
          formValues={formValues}
          onFormValuesChange={handleFormValuesChange}
        />
      </div>

      <div className="tw-mt-6 tw-mb-3">
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => navigate('/cv')}
          disabled={!Object.values(cvValidation).every((isValid) => isValid)}
        >
          ENJOY YOUR CV
        </Button>
      </div>
    </div>
  );
};

export default Home;
