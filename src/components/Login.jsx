import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth, setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const login = (event) => {
        event.preventDefault()

        fetch(`https://api-shop.edu.alabuga.space/api-shop/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(data => data.json())
            .then(data => {
                if (data.data) {
                    setToken(data.data.user_token)
                    setIsAuth(true)
                    navigate('/')
                } else {
                    setError(data.error.message)
                }
            })

    }

    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center loadPage">
            <div>
                <form>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={error ? "form-control is-invalid" : 'form-control'} 
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={error ? "form-control is-invalid" : 'form-control'} 
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <button
                        className="w-100 btn btn-lg btn-success mb-3"
                        type="submit"
                        onClick={login}
                    >
                        Войти
                    </button>
                    <p className="text-danger">{error}</p>
                </form>
                <button
                    className="w-100 btn btn-lg btn-outline-secondary"
                    type="submit"
                    onClick={() => navigate('/')}
                >
                    Назад
                </button>
            </div>
        </div>
    );
}

export default Login