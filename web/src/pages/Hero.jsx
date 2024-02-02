import '../index.css'
import {useNavigate} from "react-router-dom";
export const Hero = () => {

    const navigate = useNavigate()
        const goToGithub = () => {
            window.location.href = 'https://github.com/iminoaru/Dhani'; // Replace with your GitHub URL
        };

        const redirectLogin = () => navigate('/login')
        const redirectSignup = () => navigate('/signup')


        return (
            <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '20px' }}>Dhani</h1>
                <p style={{ fontSize: '24px', marginBottom: '100px' }}>Blazing Fast Transaction App</p>
                <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={goToGithub}>
                    <svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }} aria-hidden="true">
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
                        <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
                    </svg>
                </div>
                <div style={{ display: 'flex', marginBottom: '40px' }}>
                    <button onClick={redirectLogin} style={{ backgroundColor: '#fff', border: '3px solid #000', borderRadius: '20px', padding: '15px 30px', marginRight: '30px', fontSize: '24px', fontWeight: 'bold' }}>Login</button>
                    <button onClick={redirectSignup} style={{ backgroundColor: '#fff', border: '3px solid #000', borderRadius: '20px', padding: '15px 30px', fontSize: '24px', fontWeight: 'bold' }}>Signup</button>
                </div>
            </div>
        );
    };

