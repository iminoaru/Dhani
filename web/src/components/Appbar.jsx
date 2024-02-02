
import { Dropdown } from 'flowbite-react';
import {useEffect} from "react";

export const Appbar = () => {

    const handleSignout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }


    return (

        <div className="shadow h-14 flex justify-between bg-blue-100">
            <div className="flex flex-col justify-center h-full ml-8 font-extrabold text-2xl underline">
                Dhani
            </div>
            <div className="flex items-center">
                <div className="relative">
                        <Dropdown label={
                            <div className="rounded-full h-12 w-12 bg-blue-100 flex justify-center mt-1 mr-2">
                            <div className="flex flex-col justify-center h-full text-3xl text-blue-950">
                                ≡
                            </div>
                            </div>
                        } dismissOnClick={true}>
                            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>

                        </Dropdown>

                </div>

            </div>

        </div>

    );
};
