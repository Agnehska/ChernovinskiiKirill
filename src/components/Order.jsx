import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Order = ({ token }) => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])


    useEffect(() => {
        fetch(`https://api-shop.edu.alabuga.space/api-shop/order`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(data => data.json())
            .then(data => setOrders(data.data))
    }, [])


    useEffect(() => {
        fetch(`https://api-shop.edu.alabuga.space/api-shop/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => setProducts(data.data))
    }, [])


    const printOrders = orders?.map(order => {
        return (
            <div class="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light" key={order.id}>
                <h2 class="w-100">Заказ №{order.id}</h2>

                {order.products.map(prod => {
                    for (let product of products) {
                        if (product.id === prod) {
                            return (
                                <div class="col" key={order.id + prod}>
                                    <div class="card mb-4 rounded-3 shadow-sm">
                                        <div class="card-header py-3">
                                            <h4 class="my-0 fw-normal">{product.name}</h4>
                                        </div>
                                        <div class="card-body">
                                            <h1 class="card-title pricing-card-title">{product.price}р.</h1>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                })}


                <h2 class="w-100">Итоговая стоимость: {order.order_price} руб.</h2>
            </div>
        )
    })
    return (
        <div>

            {printOrders}

            <button
                className="w-100 btn btn-lg btn-outline-secondary"
                type="submit"
                onClick={() => navigate('/')}
            >
                Back
            </button>
        </div>
    );
}

export default Order