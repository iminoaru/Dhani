import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
                            email,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", response.data.token)
                        navigate("/dashboard")
                    }} label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/login"} />
            </div>
        </div>
    </div>
}