import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const GetMedicalRecordById = (props) => {
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [medicalRecordId, setMedicalRecordId] = useState("");
    const [patientId, setPatientId] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "medicalRecordId") {
            setMedicalRecordId(value);
        } else if (name === "patientId") {
            setPatientId(value);
        }
    };

    const getMedicalRecordById = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const signer = provider.getSigner();
                const chainId = "11155111";
                const healthChainAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
                const healthChain = new ethers.Contract(
                    healthChainAddress,
                    abi,
                    signer
                );

                const medicalRecord = await healthChain.getMedicalRecordById(medicalRecordId, patientId);
                setMedicalRecord(medicalRecord);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await getMedicalRecordById();
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center my-4 gap-2">
                <input
                    type="text"
                    placeholder="Medical Record ID"
                    name="medicalRecordId"
                    value={medicalRecordId}
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Patient ID"
                    name="patientId"
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
                >Get Medical Record
                </button>
            </form>

            {medicalRecord && (
                <div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Medical Record ID:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.id.toString()}
                        </p>

                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Date:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {new Date(medicalRecord.timeAdded * 1000).toLocaleString()}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Patient ID:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.patientId}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Doctor ID:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.doctorId}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            File Name:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.fileName}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Hospital
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.hospital}
                        </p>
                    </div>
                    <div className="my-3">
                        <p className={`${props.darkMode
                            ? "text-slate-400"
                            : "text-zinc-800"}`}>
                            Details:
                        </p>
                        <p className={`break-words
                                ${props.darkMode
                                ? "text-slate-200"
                                : "text-zinc-950"}`}>
                            {medicalRecord.details}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetMedicalRecordById;
