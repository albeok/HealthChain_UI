import React, { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const GetPatientsDoctorId = (props) => {
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");

    const handleChange = (event) => {
        setPatientId(event.target.value);
    };

    const getPatientsDoctorId = async (event) => {
        event.preventDefault();

        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const chainId = "11155111";
                const healthChainAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
                const healthChain = new ethers.Contract(healthChainAddress, abi, signer);

                const id = await healthChain.getPatientsDoctorAddress(patientId);
                setDoctorId(id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form
                onSubmit={getPatientsDoctorId}
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
                >Get Patient's Doctor ID
                </button>
            </form>

            {doctorId && (
                <div className="my-3">
                    <p className={`${props.darkMode
                        ? "text-slate-400"
                        : "text-zinc-800"}`}
                    >Doctor ID:
                    </p>
                    <p className={`break-words
                                ${props.darkMode
                            ? "text-slate-200"
                            : "text-zinc-950"}`}>
                        {doctorId}
                    </p>

                </div>
            )}
        </div>
    );
};

export default GetPatientsDoctorId;
