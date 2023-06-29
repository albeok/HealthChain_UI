import React, { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const GetPatientData = (props) => {
    const [patientId, setPatientId] = useState("");
    const [patientData, setPatientData] = useState(null);

    const handleChange = (event) => {
        setPatientId(event.target.value);
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

                const patient = await healthChain.getPatientData(patientId);
                setPatientData(patient);
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
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Get Data
                </button>
                {patientData && (
                    <div className="my-5">
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>ID:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.id}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Name:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.name}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Surname:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.surname}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Birth:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.dateOfBirth}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Email:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.email}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Primary Telephone Number:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.telephone}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Secondary Telephone Number:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.telephone2}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Zip Code:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.zipCode}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>City:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.city}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Country:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.country}
                            </p>
                        </div>
                        <div className="my-3">
                            <p className={`${props.darkMode
                                ? "text-slate-400"
                                : "text-zinc-800"}`}>Doctor ID:</p>
                            <p className={`break-words
                                ${props.darkMode
                                    ? "text-slate-200"
                                    : "text-zinc-950"}`}>
                                {patientData.doctorId}
                            </p>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default GetPatientData;
