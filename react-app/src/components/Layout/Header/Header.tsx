import './HeaderStyles.css';
import { Button } from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
return (
    <div className='navbar'>
        <div className="navbar-header">
            <div>CDA Document Viewer</div>
        </div>
        <div className="nav-bar">
            <ul>
                <li><Button onClick={() => navigate("/")}>{t("Search") + ""}</Button></li>
                <li>{t("Upload") + ""}</li>
                <li><Button onClick={() => navigate("/about")}>{t("About") + ""}</Button></li>
            </ul>
        </div>


    </div>



)
}

export default Header