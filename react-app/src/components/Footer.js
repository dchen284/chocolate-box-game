import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <span>Built by Danny Chen</span>
                <a href="https://github.com/dchen284/chocolate-box-game">
                    <i className="fab fa-github-square" />
                </a>
                <a href="https://www.linkedin.com/in/danny-chen-b2963110b">
                    <i className="fab fa-linkedin" />
                </a>
                <a href="mailto:dchen284@gmail.com">
                    <i className="fas fa-envelope-square" />
                </a>
            </div>
        </div>
    )
}

export default Footer;