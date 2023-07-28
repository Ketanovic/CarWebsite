import React, { useEffect, useState } from "react";

export default function ModelForm({ getModels}) {
    const [name, setName] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);

    async function fetchManufacturers() {
        const manufacturer_url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(manufacturer_url)

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)

        }

    }

    useEffect(() => {
        fetchManufacturers();
      }, [])

    async function handleSubmit(event) {
        event.preventDefault();
        const data  = {
            name:name,
            picture_url:picture_url,
            manufacturer_id: manufacturer,
        };
        console.log("data", data)

        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
        };
        const response = await fetch(modelUrl, fetchConfig)
        if (response.ok) {
            const newModel = await response.json()
            console.log(newModel, "NEW MODEL");
            setName('');
            setPictureUrl('');
            setManufacturer('');

            getModels('');
        }
    }

    function handleChangeName(event) {
        const { value } = event.target;
        setName(value);
      }

    function handleChangePictureUrl(event) {
        const {value} = event.target;
        setPictureUrl(value);
    }

    function handleChangeManufacturer(event) {
        const {value} = event.target;
        setManufacturer(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Create a new vehicle model</h1>
                <form onSubmit={handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                        <input value={name} onChange={handleChangeName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={picture_url} onChange={handleChangePictureUrl} placeholder="Picture url" required type="url" name="picture_url" id="picture_url" className="form-control" />
                        <label htmlFor="picture_url">Picture url</label>
                    </div>
                        <div className="mb-3">
                        <select value={manufacturer} onChange={handleChangeManufacturer} required name="manufacture" id="manufacturer" className="form-select">
                            <option value="">Choose a manufacturer</option>
                            {manufacturers.map(manufacturer => {
                            return (
                                <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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
