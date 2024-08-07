import CVFormat from '../components/CV-Format.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CVPage = () => {
  // onClick={() => navigate('/cv')}
  const navigate = useNavigate();
  const cvValidation = useSelector((state) => state.cvInfo.allInfoValidate);
  const isFormValid = Object.values(cvValidation).every(Boolean);

  useEffect(() => {
    if (!isFormValid) {
      navigate('/');
    }
  }, [isFormValid, navigate]);

  if (!isFormValid) {
    return null; // Optionally, you can return a loading spinner or a message here
  }

  return (
    <>
      <div className="tw-p-5 tw-m-5">
        <CVFormat />
      </div>
    </>
  );
};

export default CVPage;
