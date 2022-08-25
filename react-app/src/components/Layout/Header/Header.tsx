import { t } from 'i18next';

function Header() {
return (
    <div>
        <div className="navbar-header">
            <div>CDA Document Viewer</div>
        </div>
        <div className="nav nav-bar">
            <ul>
                <li>{t("Search") + ""}</li>
                <li>{t("Upload") + ""}</li>
                <li>{t("About") + ""}</li>
            </ul>
        </div>


    </div>



)
}

export default Header