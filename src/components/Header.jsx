import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Header({ token, setIsAuth, isAuth }) {
    const navigate = useNavigate()

    function logout() {
        fetch('https://api-shop.edu.alabuga.space/api-shop/logout', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setIsAuth(false)
        navigate('/')
    }
    return (
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
                <span className="fs-4">My Shop</span>
            </Link>
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                {isAuth ? <>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to={'/cart'}>Cart</Link><br />
                    <Link className="me-3 py-2 text-dark text-decoration-none" to={'/order'}>Order</Link><br />
                    <button to='/' onClick={logout}>logout</button>
                </> : <>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to={'/login'}>Signup</Link><br />
                    <Link className="me-3 py-2 text-dark text-decoration-none" to={'/register'}>Register</Link><br />
                </>
                }
            </nav>
        </div>
    );
}