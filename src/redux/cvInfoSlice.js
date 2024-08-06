import { createSlice } from '@reduxjs/toolkit';

export const cvInfoSlice = createSlice({
  name: 'cvInfo',
  initialState: {
    cvInfo: [
      // {
      //   id: 1,
      //   firstName: '',
      //   middleName: '',
      //   lastName: '',
      //   email: '',
      //   website: '',
      //   isNumberNeeded: false,
      //   number: 0,
      //   aboutMe: '',
      //   isInfoEdit: true,
      //   social: [
      //     {
      //       platform: '',
      //       link: '',
      //       isEdit: true,
      //     },
      //   ],
      //   education: [
      //     {
      //       school: '',
      //       major: '',
      //       degreeType: '',
      //       startDate: '',
      //       endDate: '',
      //       isEdit: true,
      //       isCurrent: false,
      //       gpa: '',
      //       location: '',
      //     },
      //   ],
      //   workExperience: [
      //     {
      //       company: '',
      //       location: '',
      //       position: '',
      //       startDate: '',
      //       endDate: '',
      //       isCurrent: false,
      //       isEdit: true,
      //       description: '',
      //     },
      //   ],
      //   skills: [
      //     {
      //       category: '',
      //       skill: '',
      //       isEdit: true,
      //     },
      //   ],
      //   languages: [
      //     {
      //       language: '',
      //       proficiency: '',
      //       isEdit: true,
      //     },
      //   ],
      //   achievements: [
      //     {
      //       title: '',
      //       date: '',
      //       description: '',
      //       isEdit: true,
      //     },
      //   ],
      // },
      {
        id: 1,
        firstName: 'Talha',
        middleName: 'A.',
        lastName: 'Ashraf',
        email: 'talha.ashraf@example.com',
        website: 'https://talhaashraf.dev',
        isNumberNeeded: true,
        number: 1234567890,
        aboutMe:
          'Full-stack web developer with 1 year of experience, specializing in Vue.js, Nuxt.js, and NestJS. Passionate about creating efficient and scalable web applications.',
        isInfoEdit: false,
        social: [
          {
            platform: 'YOUTUBE',
            link: 'https://linkedin.com/in/talhaashraf',
            isEdit: false,
          },
          {
            platform: 'GITHUB',
            link: 'https://github.com/talhaashraf',
            isEdit: false,
          },
        ],
        education: [
          {
            school: 'University of Example',
            major: 'Computer Science',
            degreeType: "Bachelor's",
            startDate: '2018-09-01',
            endDate: '2022-06-15',
            isEdit: false,
            isCurrent: false,
            gpa: '3.8',
            location: 'Example City, Country',
          },
          {
            school: 'Example Institute',
            major: 'Data Analytics',
            degreeType: "Master's",
            startDate: '2024-09-01',
            endDate: '2026-06-15',
            isEdit: false,
            isCurrent: true,
            gpa: '',
            location: 'Example City, Country',
          },
        ],
        workExperience: [
          {
            company: 'Tech Solutions',
            location: 'Example City, Country',
            position: 'Full-stack Developer',
            startDate: '2023-01-01',
            endDate: '',
            isCurrent: true,
            isEdit: false,
            description:
              'Developing and maintaining web applications using Vue.js, Nuxt.js, and NestJS. Collaborating with cross-functional teams to deliver high-quality software solutions.',
          },
          {
            company: 'Web Innovations',
            location: 'Example City, Country',
            position: 'Junior Developer',
            startDate: '2022-07-01',
            endDate: '2022-12-31',
            isCurrent: false,
            isEdit: false,
            description:
              'Assisted in developing web applications using JavaScript and React. Participated in code reviews and team meetings.',
          },
        ],
        skills: [
          {
            category: 'Programming Languages',
            skill: 'JavaScript',
            isEdit: false,
          },
          {
            category: 'Frameworks',
            skill: 'Vue.js',
            isEdit: false,
          },
          {
            category: 'Frameworks',
            skill: 'Nuxt.js',
            isEdit: false,
          },
          {
            category: 'Backend',
            skill: 'NestJS',
            isEdit: false,
          },
        ],
        languages: [
          {
            language: 'English',
            proficiency: 'Fluent',
            isEdit: false,
          },
          {
            language: 'Urdu',
            proficiency: 'Native',
            isEdit: false,
          },
        ],
        achievements: [
          {
            title: 'Best Developer Award',
            date: '2023-12-15',
            description:
              "Awarded for outstanding performance and contribution to the company's projects.",
            isEdit: false,
          },
          {
            title: "Dean's List",
            date: '2022-06-15',
            description:
              "Recognized for academic excellence during the bachelor's degree program.",
            isEdit: false,
          },
        ],
      },
    ],
    allInfoValidate: {
      intro: false,
      social: false,
      education: false,
      experience: false,
      skill: false,
      language: false,
    },
  },
  reducers: {
    addCvInfo: (state, action) => {
      state.cvInfo.push(action.payload);
    },
    deleteCvInfo: (state, action) => {
      state.cvInfo = state.cvInfo.filter(
        (cvInfo) => cvInfo.id !== action.payload.id,
      );
    },
    updateCvInfo(state, action) {
      const index = state.cvInfo.findIndex(
        (cvInfo) => cvInfo.id === action.payload.id,
      );
      if (index !== -1) {
        state.cvInfo[index] = action.payload;
      }
    },
    updateAllInfoValidate(state, action) {
      state.allInfoValidate = {
        ...state.allInfoValidate,
        [action.payload.section]: action.payload.isValid,
      };
    },
  },
});

export const { addCvInfo, deleteCvInfo, updateCvInfo, updateAllInfoValidate } =
  cvInfoSlice.actions;
export default cvInfoSlice.reducer;
