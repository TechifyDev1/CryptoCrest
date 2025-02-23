import logo from "/public/crypto-dark.png";
import "./loading.css"
const Loading: React.FC = () => {
    return(
        <div className="loading-page">
            <div className="loading-container">
                <img src={logo} alt="" style={{width: "500px"}} />
                <div className="loader">
                    <div className="bar"></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;