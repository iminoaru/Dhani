import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate();

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
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3001/api/v1/user/login", {
                            email,
                            password
                        });
                        localStorage.setItem("token", response.data.token)

                        navigate("/dashboard")
                    }} label={"Sign in"} />
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}