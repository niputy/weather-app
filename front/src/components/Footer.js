import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

export default function Footer(){
    return (
        <div className="footer container">
            <div className="footer-section">
                <p className="title">Weather App</p>
                <p>&copy; 2024 | All Rights Reserved</p>
            </div>
            <div className="footer-section">
                <p className="title">My Socials</p>
                <a href="https://www.linkedin.com/in/nikita-putyatin/"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a href="https://github.com/niputy"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="mailto:niputy@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
            </div>
        </div>
    )
}