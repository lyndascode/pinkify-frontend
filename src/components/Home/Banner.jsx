import { Link } from "react-router-dom";
import heroImage from "../../assets/kpopbanner.jpg"; // put the image here


function Banner() {
    return (
        <div className="banner-container">
            <img src={heroImage} alt="K-pop Banner" className="banner-image" />
            <div className="banner-text">
                <h1>Welcome to Pinkify  </h1>
                <p>Discover upcoming K-pop concerts and your favorite artists</p>
                <Link className="banner-button" to="/concerts">
                    See All Concerts
                </Link>
            </div>
        </div>
    );
}

export default Banner;
