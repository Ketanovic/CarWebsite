export default function AutomobilesList({automobiles}) {
    return (
      <div className="my-5 container">
        <h1>Automobiles</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Sold</th>
            </tr>
          </thead>
            <tbody>
              {automobiles.map(automobile => {
                return (
                  <tr key={automobile.vin}>
                    <td>{automobile.vin}</td>
                    <td>{automobile.color}</td>
                    <td>{automobile.year}</td>
                    <td>{automobile.model.manufacturer.name}</td>
                    <td>{automobile.model.name}</td>
                    <td>{automobile.sold ? "Yes" : "No"}</td>
                  </tr>
                )
              })}
            </tbody>
        </table>
      </div>
    )
  }
