import React, {useEffect, useState} from "react"

function SaleForm() {

    const [automobile, setAutomobile] =useState ([])

    const [formData, setFormData] =useState({
        automobile: '',
        salesperson: '',
        customer: '',
        price: '',

    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setAutomobile(data.automobile)
        }
    }

    useEffect ( () => {
        fetchData()

    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const url = "http://localhost:8090/api/sales/"

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(url,fetchConfig)

        if (response.ok) {
            setFormData({
                automobile: '',
                salesperson: '',
                customer: '',
                price: '',
            })
        window.location.reload(true)
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.inputName

        setFormData({
            ...formData,
            [inputName]:value
        })
    }

    return (
        <div className="Row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Create a New Sale</h1>
            <form onSubmit={handleSubmit} id='create-sales-form'>

                <div className="form-floating mb-3">

                    <input onChange={handleFormChange} placeholder="Automobile" required type="text" name="automobile" id="automobile" className="form-control" />
                    <label htmlFor="Automobile">Automobile</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} placeholder="Salesperson" required type="text" name="Salesperson" id="Salesperson" className="form-control" />
                    <label htmlFor="Salesperson">Salesperson</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} placeholder="Customer" required type="text" name="Customer" id="Customer" className="form-control" />
                    <label htmlFor="Customer">Customer</label>
                </div>

                <div className="mb-3">
              <select onChange={handleFormChange} required name="Automobile" id="Automobile" className="form-select">
                <option value="">Choose a Automobile</option>
                {automobile.map(Automobile => {
                  return (
                    <option key={Automobile.href} value={Automobile.href}>{Automobile.vin}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
    )

}

export default SaleForm
