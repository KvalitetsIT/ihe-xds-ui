
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { StrictMode, useEffect, useMemo, useState } from 'react';
import Loading from './components/loading';
import UploadCertificateForm from './feature/CredentialAPI/UploadForm/UploadCertificateForm';
import { handleSession, getSession } from './components/Utility/sessionHandling';
import About from './pages/About/About';
import Document from './pages/Document/Document';
import { Upload } from './pages/Upload/Upload/Upload';
import { iti41PreviewResponse } from './models/UploadModels/PreUploadRequest';
import { UploadPreview } from './pages/Upload/Preview/UploadPreview';
import { SuccessPage } from './pages/Upload/Success/SuccessPage';

function App() {
    const [session, setSession] = useState("");
    const [isSuccess, setIsSuccess] = useState<(string|number)[]>([]);
    const [uploadData, setUploadData] = useState<iti41PreviewResponse | null>(null);

    useEffect(() => {

        if (window.sessionStorage.getItem("session") == null) {
            handleSession()
            setSession(getSession())
        }
        else {
            setSession(getSession())
        }


    }, [])



    return (
        <Router>
            <Layout>
                <>
                    <Routes>
                        <Route path="/" element={<HomePage session={session} />} />
                        <Route path="*" element={<HomePage session={session} />} />
                        <Route path="/upload-certifacte" element={<UploadCertificateForm />} />
                        <Route path="/about" element={<About />} />
                        <Route path='/document/:id' element={<Document />} />
                        <Route path='/upload' element={<Upload setUploadData={setUploadData} />} />
                        <Route path='/upload/preview' element={<UploadPreview getUploadData={uploadData} setIsSuccess={setIsSuccess}/>} />
                        <Route path='/uploadDocument' element={<SuccessPage getIsSuccess={isSuccess} setIsSuccess={setIsSuccess} />} /> 


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
