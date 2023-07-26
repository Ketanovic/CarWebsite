import { useState } from "react"

const handleDelete = async (item) => {

    const url = `http://localhost:8090${item}`

    const fetchConfig = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, fetchConfig)
    if (response.ok) {
        console.log("Deleted")
        window.location.reload()
    }
    }

function SalesList(props) {
    if (props === undefined) {
        return null
    }
    return (

        <div className = "col">


            {props.sales.map(
                sales=> {

                    return (

                        <div key = {sale.href}>
                            <div className = "car-body">
                                <h5 className = "car-title">{sale.automobile} </h5>
                                <h3>{sale.salesperson}</h3>
                                <h3>{sale.customer}</h3>
                                <h3>{sale.automobile.id}</h3>

                                <button onClick={() => handleDelete(sale.href)}>Delete </button>
                            </div>

                        </div>

                    )
                }
            )}
            </div>
    )
}

    export default SalesList
