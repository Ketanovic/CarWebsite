export default function SalesList({sales}) {

    return (
      <div className="my-5 container">
        <h1>Sales</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
            <tbody>
              {sales.map(sale => {
                return (
                  <tr key={sale.automobile.vin}>
                    <td>{sale.salesperson.employee_id}</td>
                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
                  </tr>
                )
              })}
            </tbody>
        </table>
      </div>
    )
  }
