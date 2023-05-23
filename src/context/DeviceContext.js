import { createContext, useState } from "react";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [selectedDeviceDetail, setSelectedDeviceDetail] = useState({})
    const [isUpdate, setIsUpdate] = useState([true])
    const values = { selectedDeviceDetail, setSelectedDeviceDetail,isUpdate, setIsUpdate }

    return (
        <DeviceContext.Provider value={values}>{children}</DeviceContext.Provider>
    )
};

export default DeviceContext
