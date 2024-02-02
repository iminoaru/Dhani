import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import {Popup} from "../components/Popup.jsx";

export const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emptyPopup , setEmptyPopup] = useState(false)
    const [invalidPopup , setInvalidPopup] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async () => {
        if(!firstname || !lastname || !email || !password){
            setEmptyPopup(true)
            return
        }
        try {
            const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
                email,
                firstname,
                lastname,
                password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        } catch(error) {
            setInvalidPopup(true)
        }
    }


    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Welcome to our App!"} />
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} placeholder="name" label={"First Name"} type={'text'} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value);
                }} placeholder="surname" label={"Last Name"} type={'text'} />
                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} placeholder="example@domain" label={"Email"} type={'text'} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder="" label={"Password"} type={'password'} />
                <div className="pt-4">
                    <Button onClick={handleSignup} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/login"} />
            </div>
            {emptyPopup && <Popup title = {'empty fields'}
                                  content = {'please fill up all the fields'}
            />}

            {invalidPopup && <Popup title = {'wrong credentials'}
                                    content = {
                                        <>
                                            Make sure you are entering correct inputs <br/>
                                            Firstname minimum length: 3 <br/>
                                            Lastname minimum length: 3 <br/>
                                            Password minimum length: 6 <br/>
                                            A valid email address
                                        </>
                                    }
            />}
        </div>
    </div>
}