import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

export default function Home() {
    const [inventory, setInventory] = useState([]);
    const [putItem, setPutItem] = useState([]);
    const [query, setQuery] = useState("");
    const ITEM_URL = '/items';

    async function deleteItem(id) {
        let removeItem = [...inventory].filter(item => item.itemId !== id);
        await axios.delete(`/items/${id}`);
        setInventory(removeItem);
    }

    async function updateItem(item) {
        console.log(item);

        const res = await axios.put(ITEM_URL,
            {
                id: item.itemId,
                product: putItem.product,
                description: putItem.description,
                brand: putItem.brand,
                qty: putItem.qty
            });
        console.log(res);
    }
    
    async function getInventory() {
        const response = await axios.get(ITEM_URL);
        setInventory(response.data);
        //console.log(response.data);
    }


    useEffect(() => {

        getInventory();
    }, []);

    return (
        <div className='container'>

            <h1>Inventory</h1>

            <form>
                <label>Search For:</label>
                <input className='input' type="text" placeholder="Type to search" onChange={(e) => setQuery(e.target.value)} />
            </form>

            <Link to='/item/add' className='align-self-center btn btn-outline-dark w-25'>Add Item</Link>

            <table className='table table-light mt-3'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Brand</th>
                        <th>Qty</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.filter(item => {
                        if (query === "") {
                            return item;
                        } else {
                            return item.product.toLowerCase().includes(query.toLowerCase());
                        }
                    }).map((item) => (
                        <tr key={item.itemId}>
                            <td>{item.itemId}</td>
                            <td>{item.product}</td>
                            <td>{item.description}</td>
                            <td>{item.brand}</td>
                            <td>{item.qty}</td>
                            <td>
                                <div className='d-flex justify-content-evenly'>
                                    <Link to={`/item/edit/${item.itemId}`} state={{ item }} ><i className="bi bi-pencil-square"></i></Link>
                                    <i className="bi bi-trash" onClick={(e) => deleteItem(item.itemId)}></i>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to update User */}
            <div className='modal fade' id='updateModal' tabIndex="-1" aria-labelledby='updateModalLabel' aria-hidden="true">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id="updateModalLabel">Update User</h5>

                        </div>
                        <div className='modal-body'>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-fname" className="col-form-label">First Name:</label>
                                    <input type="text" className="form-control" id="recipient-fname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-lname" className="col-form-label">Last Name:</label>
                                    <input type="text" className="form-control" id="recipient-lname" />
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


