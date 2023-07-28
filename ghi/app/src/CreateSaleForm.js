import React, { useEffect, useState } from "react";
import SalesList from "./ListSales";

export default function SaleForm({automobiles, salespeople, customers, getSales}) {
    const [price, setPrice] = useState('');
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const data  = {
            price:price,
            automobile: automobile,
            salesperson: salesperson,
            customer:customer,
        };


        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        };
        const response = await fetch(saleUrl, fetchConfig)
        if (response.ok) {
            setPrice('');
            setAutomobile('');
            setSalesperson('');
            setCustomer('');

            getSales();
            window.location.href = 'http://localhost:3000/sales';
        }
    }

    function handleChangePrice(event) {
        const { value } = event.target;
        setPrice(value);
      }

    function handleChangeAutomobile(event) {
        const {value} = event.target;
        setAutomobile(value);
    }
    function handleChangeSalesperson(event) {
        const {value} = event.target;
        setSalesperson(value);
    }
    function handleChangeCustomer(event) {
        const {value} = event.target;
        setCustomer(value);
    }



    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new sale</h1>
                <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handleChangePrice} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                        <div className="mb-3">
                            <select value={automobile} onChange={handleChangeAutomobile} required name="automobile" id="automobile" className="form-select">
                                <option value="">Choose a automobile</option>
                                {automobiles.map(automobile => {
                                    if (automobile.sold === false) {
                                return (
                                    <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                                )
                                    }
                                })}
                            </select>
                        </div>
                              <div className="mb-3">
                            <select value={salesperson} onChange={handleChangeSalesperson} required name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a salesperson</option>
                                {salespeople.map(salesperson => {
                                return (
                                    <option key={salesperson.pk} value={salesperson.pk}>{salesperson.first_name} {salesperson.last_name}</option>
                                )
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={customer} onChange={handleChangeCustomer} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {customers.map(customer => {
                                return (
                                    <option key={customer.pk} value={customer.pk}>{customer.first_name} {customer.last_name}</option>
                                )
                                })}
                            </select>
                        </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>

    );

    }
