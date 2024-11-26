import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from '../trash1.svg'


export default function Cart() {
    let data = useCart()
    //const { data, setText } = useCart()
    let dispatch = useDispatchCart()

    if (data.length == 0 || data === undefined) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>

            </div>
        )
    }

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail")
        let domain =  process.env.REACT_APP_DOMAINURL  +process.env.REACT_APP_PORT
        let response = await fetch(domain +"/api/orderdata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        const json = await response.json()
        console.log(json.status)
        if (json.success) {
            dispatch({ type: "DROP" })
        }
    }
    let totalprice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'># </th>
                            <th scope='col'>Name </th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option </th>
                            <th scope='col'>Amount </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td className='col-2'><button type='button' className='btn p-0 w-75'>
                                    <img className='w-25' src={trash} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></img>
                                </button></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div><h1 className='fs-2'> Total price: {totalprice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    )

}
