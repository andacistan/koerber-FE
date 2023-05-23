import { useEffect, useState, useContext } from 'react';
import DeviceContext from '../context/DeviceContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan, faSpinner,faSort } from '@fortawesome/free-solid-svg-icons'


function DeviceList() {
  const [data, setDevice] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setSelectedDeviceDetail, setIsUpdate } = useContext(DeviceContext)


  const updateDevice = (device) => {
    setSelectedDeviceDetail(device)
    setIsUpdate(true)
  }

  const deleteDevice = async (device) => {
    await fetch("http://localhost:8080/delete", {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(device),
    })
    window.location.reload(false);
  }


useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () =>{
    fetch('http://localhost:8080/api', {
      method: "GET"
    }).then(res => res.json()).
      then((data) => {
        setDevice(data);
        setIsLoading(false)
      })
  }

  const sortDevice = (e) => {
    let name = e.target.name
    let temp = [...data]
    temp.sort((a, b) => typeof a[name]=='string' ?  a[name].localeCompare(b[name]) : (a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0))
    JSON.stringify(temp) === JSON.stringify(data) && temp.reverse()
    setDevice(temp)
  }

  return (
    <div className='mt-3'>
      {isLoading && <div><FontAwesomeIcon className='mx-auto d-block' icon={faSpinner} spin size="2xl" /> <h2 className='text-center'>Loading</h2></div>}
      {!isLoading &&
        <table className="table table-striped" data-toggle="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"><a name="deviceName" onClick={(e) => sortDevice(e)}><FontAwesomeIcon icon={faSort} />  Device Name </a></th>
              <th scope="col"><a name="deviceType" onClick={(e) => sortDevice(e)}><FontAwesomeIcon icon={faSort} />  Device Type</a></th>
              <th scope="col"><a name="ownerName" onClick={(e) => sortDevice(e)}><FontAwesomeIcon icon={faSort} />  Owner Name</a></th>
              <th scope="col"><a name="batteryStatus" onClick={(e) => sortDevice(e)}><FontAwesomeIcon icon={faSort} />  Battery Status</a></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((device, index) =>
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{device.deviceName}</td>
                  <td>{device.deviceType}</td>
                  <td>{device.ownerName}</td>
                  <td>{device.batteryStatus}</td>
                  <td><button type="button" className='btn btn-sm btn-success' onClick={() => updateDevice(device)} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FontAwesomeIcon icon={faPen} /> </button></td>
                  <td><button type="button" className='btn btn-sm btn-danger' onClick={() => deleteDevice(device)}><FontAwesomeIcon icon={faTrashCan} /></button></td>
                </tr>
              )
            }

          </tbody>
        </table>
      }
    </div>
  )
}

export default DeviceList