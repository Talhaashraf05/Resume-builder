import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './index.css'
import {ThemeContextProvider} from "../themeContext.jsx";
import {Provider} from "react-redux";
import store from "./redux/store.js";


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </ThemeContextProvider>
)
