import React, { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const GetDoctorData = (props) => {
    const [doctorId, setDoctorId] = useState("");
    const [doctorData, setDoctorData] = useState(null);

    const handleChange = (event) => {
        setDoctorId(event.target.value);
    };

    const handleGetData = async (event) => {
        event.preventDefault();

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const chainId = "11155111";
                const healthChainAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
                const healthChain = new ethers.Contract(healthChainAddress, abi, signer);

                const doctor = await healthChain.getDoctorData(doctorId);
                setDoctorData(doctor);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleGetData}
                className="flex flex-col items-center my-4 gap-2">
                <input
                    type="text"
                    placeholder="Doctor ID"
                    value={doctorId}
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Get Doctor Data
                </button>
            </form>

            {doctorData && (
                <div className="my-5">
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            ID:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.id}
                        </p>

                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Name:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.name}
                        </p>

                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Surname:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.surname}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Birth:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.dateOfBirth}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Email:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.email}
                        </p>

                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Telephone:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.telephone}
                        </p>

                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Zip Code:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.zipCode}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            City:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.city}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Country:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {doctorData.country}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetDoctorData;
