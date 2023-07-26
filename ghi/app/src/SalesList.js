import React from "react"

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

                        <div key = {sales.href}>
                            <div className = "car-body">
                                <h5 className = "car-title">{sales.automobile} </h5>
                                <h3>{sales.salesperson}</h3>
                                <h3>{sales.customer}</h3>
                                <h3>{sales.automobile.id}</h3>

                                <button onClick={() => handleDelete(sales.href)}>Delete </button>
                            </div>

                        </div>

                    )
                }
            )}
            </div>
    )
}

    export default SalesList
