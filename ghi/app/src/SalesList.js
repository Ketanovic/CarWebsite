function SalesList(props) {
    if (props === undefined) {
        return null
    }
    return (

        <table>

        <tbody>
            {props.sales.map(
                sales=> {
                    return (

                        <tr key={sale.automobile} >
                        <td>{sale.salesperson}</td>
                        <td>{sale.customer}</td>
                        <td>{sale.price}</td>
                        </tr>

                    )
                }
            )}
            </tbody>
            </table>


    )
}

export default SalesList
