import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ token }) {
    const [carts, setCarts] = useState([])
    const [sortedCarts, setSortedCarts] = useState([])
    const  [change, setChange] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://api-shop.edu.alabuga.space/api-shop/cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(data => data.json())
            .then(data => {setCarts(data.data); setSortedCarts(sortCarts(data.data))})
    }, [change])

    const deleteFromCart = (id) => {
        for (let cart of carts) {
            if (cart.product_id === id) {
                fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${cart.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
            
        }
        setCarts(carts.filter(cart => cart.id !== id))
    }

    const makeOrder = () => {
        fetch(`https://api-shop.edu.alabuga.space/api-shop/order`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        navigate('/order')
    }

    const sortCarts = (carts) => {
        let sortedCarts = []
        carts?.forEach(cart => {
            if(sortedCarts.find(scart => cart.product_id === scart.product_id)) {
                sortedCarts.find(scart => cart.product_id === scart.product_id).count++
            } else {
                sortedCarts.push({...cart, count: 1})
            }
        })
        return sortedCarts
    }
    
    const increment = (index) => {
        const copy = [...sortedCarts]
        copy[index].count ++ 
        setSortedCarts(copy)
        let id = copy[index].product_id
        fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        setChange(change + 1)
    }
    
    const decrement = (index, id) => {
        const copy = [...sortedCarts]
        if (copy[index] > 1) {
            copy[index].count -- 
            setSortedCarts(copy)
        }
        for (let cart of carts) {
            console.log(cart.product_id, 'kdwdww22', id )
            if (cart.product_id === id) {
                fetch(`https://api-shop.edu.alabuga.space/api-shop/cart/${cart.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
            }
            break
        }
        setChange(change - 1)

    }
    
    const printCarts = sortedCarts?.map((cart, index) => {
        return (
            <div className="col" key={index}>
                <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{cart.name}</h4>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title pricing-card-title">{cart.price}.
                        <small className="text-muted fw-light"> &times; {cart.count} шт.</small></h1>
                        <p>{cart.description}</p>
                        <button     
                            type="button"   
                            className="btn btn-lg btn-info mb-3" 
                            onClick={() => increment(index)}
                        >+</button>
                        <button     
                            type="button"   
                            className="btn btn-lg btn-warning mb-3"
                            onClick={() => decrement(index, cart.product_id)}
                        >&minus;</button>
                        <button
                            type="button"
                            className="btn btn-lg btn-outline-danger mb-3"
                            onClick={() => deleteFromCart(cart.id)}
                        >Удалить из корзины</button>
                    </div>
                </div>
            </div>
        )
    })


    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            {printCarts}

            <button
                className="w-100 btn btn-lg btn-outline-secondary"
                type="submit"
                onClick={() => navigate('/')}
            >
                Назад
            </button>
            {carts?.length ? (
            <button
                type="button"
                className="col-6 btn btn-lg btn-success mb-3 loadPage"
                onClick={makeOrder}
            >
                Оформить заказ
            </button>)
            : ''}
        </div>
    );
}