import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Popup} from "../components/Popup.jsx";

export const Login = () => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [emptyPopup , setEmptyPopup] = useState(false)
    const [invalidPopup , setInvalidPopup] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!email || !password){
            setEmptyPopup(true)
            return
        }
        try {
            const response = await axios.post("https://dhani.vercel.app/api/v1/user/login", {
                email,
                password
            })
            localStorage.setItem("token", response.data.token)
            console.log(response.data.msg)
            navigate("/dashboard")
        } catch(error) {
            setInvalidPopup(true);
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Login"} />
                <SubHeading label={"Welcome back!"} />
                <InputBox onChange={(e) => {
                    setEmail(e.target.value)
                }} placeholder="example@domain" label={"Email"} type={'text'}/>
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder="" label={"Password"} type={'password'}/>
                <div className="pt-4">
                    <Button onClick={handleLogin} label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
            {emptyPopup && <Popup title = {'empty fields'}
                                  content = {'please fill up all the fields'}
                />}
            {invalidPopup && <Popup title = {'wrong credentials'}
                                  content = {'your email or password looks incorrect'}
            />}
        </div>
    </div>
}