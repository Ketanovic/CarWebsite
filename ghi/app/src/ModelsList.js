export default function ModelsList({models}) {

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
        </thead>
          <tbody>
            {models.map(model => {
              return (
                <tr key={model.name}>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img src={model.picture_url} alt="car model" style={{ width:'100px', height: '100px'}} />
                    </td>
                </tr>
              )
            })}
          </tbody>
      </table>
    </div>
  )
}
