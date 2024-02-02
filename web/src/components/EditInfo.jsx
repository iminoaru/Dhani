import {useState} from "react";
import {Heading} from "./Heading.jsx";
import {SubHeading} from "./SubHeading.jsx";
import {InputBox} from "./InputBox.jsx";
import {Button} from "./Button.jsx";
import axios from "axios";
import {Popup} from "./Popup.jsx";

export const EditInfo = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [password, setPassword] = useState('')
    const [rendered , setRendered] = useState(true);
    const [errorPopup , setErrorPopup] = useState(false);
    const [emptyPopup , setEmptyPopup] = useState(false);
    const handleEdit = () => {

        if(!firstname || !lastname || !password){
            setEmptyPopup(true);
            return;
        }
        try{
            const response = axios.put('http://localhost:3001/api/v1/user/update' ,
                {
                    firstname,
                    lastname,
                    password
                },
            {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
        } catch (error) {
            setErrorPopup(true);

        }
    }

    const submit = () => {
        handleEdit()
        setRendered(false)
    }
    return (
        <>
        {rendered && (
            <div className="flex justify-center items-center h-screen">
        < div
    className = "flex flex-col justify-center" >
        < div
    className = "rounded-lg bg-white w-80 text-center p-2 h-max px-4" >

    <InputBox onChange={e => {
        setFirstname(e.target.value);
    }} placeholder="name" label={"First Name"} type={'text'}/>

    <InputBox onChange={(e) => {
        setLastname(e.target.value);
    }} placeholder="surname" label={"Last Name"} type={'text'}/>

    <InputBox onChange={(e) => {
        setPassword(e.target.value)
    }} placeholder="" label={"Password"} type={'password'}/>

    <div className="pt-4">
        <Button onClick={submit} label={"Update"}/>
    </div>
            {emptyPopup && <Popup title = {'empty fields'}
                                  content = {'please fill up all the fields'}
            />}

            {errorPopup && <Popup title = {'wrong credentials'}
                                    content = {
                                        <>
                                            Make sure you are entering correct inputs <br/>
                                            Firstname minimum length: 3 <br/>
                                            Lastname minimum length: 3 <br/>
                                            Password minimum length: 6 <br/>
                                        </>
                                    }
            />}
        </div>
        </div>
            </div>
    )}
</>
)
}