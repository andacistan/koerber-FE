import React, { useState, useContext } from 'react'
import DeviceContext from '../context/DeviceContext';


function DeviceModal() {

    const [form, setForm] = useState({ deviceName: '', deviceType: '', ownerName: '', batteryStatus: 0 })
    const { selectedDeviceDetail, setSelectedDeviceDetail, isUpdate, setIsUpdate } = useContext(DeviceContext)

    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if (!isUpdate) {
            setForm({ ...form, [name]: value })
        } else {
            setSelectedDeviceDetail({ ...selectedDeviceDetail, [name]: value })
        }
    }
    const handleSubmit = async () => {
        await fetch("http://localhost:8080/device", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(form),
        })
    }

    const updateDevice = async () => {
        await fetch("http://localhost:8080/update", {
            method: "PUT",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(selectedDeviceDetail),
        })
    }


    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setIsUpdate(false)}>
                Add New Device
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Device Manager App</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedDeviceDetail({})}></button>
                        </div>
                        <div className="modal-body">
                            <h4>{!isUpdate ? 'Add New Device' : 'Edit Device'}</h4>

                            <div className="card p-3 mt-3">
                                {!isUpdate ?
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label className="form-label">Device Name</label>
                                            <input name="deviceName" type="text" className="form-control" onChange={handleChange} required />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Device Type</label>
                                            <select name="deviceType" className="form-select " aria-label="Default select example" onChange={handleChange} required >
                                                <option selected disabled value="">Open this select menu</option>
                                                <option value="Smartphone">Smartphone</option>
                                                <option value="Tablet">Tablet</option>
                                                <option value="Camera">Camera</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Owner Name</label>
                                            <input name="ownerName" type="text" className="form-control" onChange={handleChange} required />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Battery Status <h2 className='text-danger'>{form.batteryStatus}</h2></label>
                                            <input name="batteryStatus" type="range" className="form-range" min="0" max="100" onChange={handleChange} />
                                        </div>
                                        <button type="submit" className='btn btn-primary mx-auto d-block'>Save</button>
                                    </form> :
                                    <form onSubmit={updateDevice}>

                                        <div>
                                            <label className="form-label">Device Name</label>
                                            <input name="deviceName" type="text" className="form-control" onChange={handleChange} defaultValue={selectedDeviceDetail.deviceName} required />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Device Type</label>
                                            <select name="deviceType" className="form-select" aria-label="Default select example" value={selectedDeviceDetail.deviceType} onChange={handleChange} required >
                                                <option disabled value="">Open this select menu</option>
                                                <option value="Smartphone">Smartphone</option>
                                                <option value="Tablet">Tablet</option>
                                                <option value="Camera">Camera</option>
                                            </select>
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Owner Name</label>
                                            <input name="ownerName" type="text" className="form-control" defaultValue={selectedDeviceDetail.ownerName} onChange={handleChange} required />
                                        </div>
                                        <br />
                                        <div>
                                            <label className="form-label">Battery Status <h2 className='text-danger'>{selectedDeviceDetail.batteryStatus}</h2></label>
                                            <input name="batteryStatus" type="range" className="form-range" min="0" max="100" onChange={handleChange} />
                                        </div>
                                        <button type="submit" className='btn btn-success mx-auto d-block'>Update Device</button>
                                    </form>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setSelectedDeviceDetail({})}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceModal