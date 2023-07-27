import React, { useEffect, useState } from "react";

export default function AutomobileForm({getAutomobiles}) {
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVIN] = useState('');
    const [model, setModel] = useState('');
    const [models, setModels] = useState([]);

    async function fetchModels() {
        const model_url = 'http://localhost:8100/api/models/'
        const response = await fetch(model_url)

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)

        }

    }

    useEffect(() => {
        fetchModels();
      }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const data  = {
            color: color,
            year:year,
            vin: vin,
            model_id: model,
        };

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        };
        const response = await fetch(automobileUrl, fetchConfig)
        if (response.ok) {
            setColor('');
            setYear('');
            setVIN('');
            setModel('');

            // Refreshes automobile list and redirects
            getAutomobiles();
            window.location.href = 'http://localhost:3000/automobiles/';
        }
    }

    function handleChangeColor(event) {
        const { value } = event.target;
        setColor(value);
      }

    function handleChangeYear(event) {
        const {value} = event.target;
        setYear(value);
    }
    function handleChangeVIN(event) {
        const {value} = event.target;
        setVIN(value);
    }

    function handleChangeModel(event) {
        const {value} = event.target;
        setModel(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create an automobile </h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                    <div className="form-floating mb-3">
                        <input value={color} onChange={handleChangeColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={year} onChange={handleChangeYear} placeholder="year" required type="text" name="year" id="year" className="form-control" />
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={vin} onChange={handleChangeVIN} placeholder="vin" required type="text" name="vin" id="vin" className="form-control" />
                        <label htmlFor="vin">VIN</label>
                    </div>
                        <div className="mb-3">
                        <select value={model} onChange={handleChangeModel} required name="manufacture" id="model" className="form-select">
                            <option value="">Choose a model</option>
                            {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>{model.name}</option>
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
