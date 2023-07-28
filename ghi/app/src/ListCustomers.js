export default function CustomerList({customers}) {

  return (
    <div className="my-5 container">
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
          <tbody>
            {customers.map(customer => {
              return (
                <tr key={customer.pk}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone_number}</td>
                </tr>
              )
            })}
          </tbody>
      </table>
    </div>
  )
}
