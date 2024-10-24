import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fio, setFio] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const createUser = (event) => {
        event.preventDefault()
        fetch(`https://api-shop.edu.alabuga.space/api-shop/signup`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({fio, email, password })
        })
        .then(data => data.json())
        .then(data => {
            if (data.data) {
                navigate('/login')
            } else {
                setError(data.error.message)
            }
        })

    }

    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center  justify-content-center loadPage">
            <div className="row">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Нужно заполнить все поля!</h1>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className={error ? "form-control is-invalid" : 'form-control'} 
                            id="floatingFio" 
                            placeholder="ФИО"
                            value={fio}
                            onChange={(event) => setFio(event.target.value)} 
                        />
                        <label htmlFor="floatingFio">Ваше ФИО</label>
                    </div>
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
                        onClick={createUser}
                        >
                        Зарегистрироваться
                        </button>
                    <p className="text-danger">{error}</p>

                </form>
                <button
                    className="w-100 btn btn-lg btn-outline-secondary"
                    onClick={() => navigate('/')}
                >
                    Назад
                </button>
            </div>
        </div>
    );
}