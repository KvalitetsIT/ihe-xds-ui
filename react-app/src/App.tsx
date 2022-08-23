
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import Layout from './components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { StrictMode, useMemo, useState } from 'react';
import { AbilityContext } from './feature/User/logic/Can';
import Loading from './components/loading';

function App() {

    return (
        <Router>
                    <Layout>
                        <>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                            </Routes>

                            <ToastContainer closeButton={true} position="bottom-right" />
                        </>
                    </Layout>
          
          
        </Router >
    )
}

const AppWrapper = () => {
    return (
       
                <StrictMode>
                    <App />
                </StrictMode>
          
       
    )
}


export default AppWrapper;
