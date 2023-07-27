import React, { useEffect, useState } from "react";

export default function ModelsList() {
  const [models, setModels] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/"

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log({ "data": data })
      setModels(data.models);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="my-5 container">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
          <tbody>
            {models.map(model => {
              return (
                <tr key={model.name}>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img src={model.picture_url} alt="car" style={{ width:'200px', height: '200px'}} />
                    </td>
                </tr>
              )
            })}
          </tbody>
        </thead>
      </table>
    </div>
  )

}
