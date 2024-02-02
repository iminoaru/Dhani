import { useState } from "react";
import { Dropdown } from 'flowbite-react';
import {useNavigate} from "react-router-dom";
import {EditInfo} from "./EditInfo.jsx";

export const Appbar = () => {
    const [edit , setEdit] = useState(false)
    const navigate = useNavigate()

    const handleSignout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    const handleEdit = () => {
        setEdit(true);
    }

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                Dhani
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full mr-4">
                    Welcome
                </div>
                <div className="relative">
                        <Dropdown label={
                            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                            <div className="flex flex-col justify-center h-full text-xl">
                                u
                            </div>
                            </div>
                        } dismissOnClick={true}>
                            <Dropdown.Item onClick={handleEdit}>Edit Info</Dropdown.Item>
                            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                        </Dropdown>

                </div>
                {edit && <EditInfo />}
            </div>
        </div>
    );
};
