import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from '../api/axios';

export default function AddItem() {
    const [item, setItem] = useState({
        itemId: 0,
        product: '',
        description: '',
        brand: '',
        qty: 0
    });

    const ITEM_URL = '/items';
    const { id } = useParams();
    const location = useLocation();
    const data = location.state?.item;

    console.log(data);
    console.log(item.itemId);
    async function saveOrUpdate(e) {
        e.preventDefault();

        if (id) {
            const res = await axios.put(ITEM_URL,
                {
                    itemId: item.itemId,
                    product: item.product,
                    description: item.description,
                    brand: item.brand,
                    qty: item.qty
                });
            console.log(res + "id is there");
        } else {
            const res = await axios.post(ITEM_URL,
                {
                    product: item.product,
                    description: item.description,
                    brand: item.brand,
                    qty: item.qty
                });
            console.log(res + "id empty");
        }
    }

    useEffect(() => {
        if (id) {
            setItem({
                itemId: data.itemId,
                product: data.product,
                description: data.description,
                brand: data.brand,
                qty: data.qty
            });
        }
    }, []);

    return (
        <div>
            <form>
                {id ? <h1>Update Item</h1> : <h1>Add Item</h1>}
                <label>Product</label>
                <input type="text" value={item.product} onChange={(e) => setItem({ ...item, product: e.target.value })} />
                <label>Description</label>
                <input type="text" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
                <label>Brand</label>
                <input type="text" value={item.brand} onChange={(e) => setItem({ ...item, brand: e.target.value })} />
                <label>Qty</label>
                <input type="text" value={item.qty} onChange={(e) => setItem({ ...item, qty: e.target.value })} />

                <div className='d-flex justify-content-evenly mt-3'>
                    <button className='btn btn-outline-dark w-25' onClick={saveOrUpdate}>Submit</button>
                    <Link to='/' className='btn btn-outline-dark w-25'>Back</Link>
                </div>
            </form>
        </div>
    );
};