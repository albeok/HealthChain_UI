import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const GetMedicalRecords = (props) => {
    const [patientId, setPatientId] = useState("");
    const [medicalRecords, setMedicalRecords] = useState([]);

    const handleChange = (event) => {
        setPatientId(event.target.value);
    };

    const getMedicalRecords = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const signer = provider.getSigner();
                const chainId = "11155111";
                const healthChainAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
                const healthChain = new ethers.Contract(
                    healthChainAddress,
                    abi,
                    signer
                );
                const arrayOfMedicalRecords = await healthChain.getMedicalRecords(patientId);
                setMedicalRecords(arrayOfMedicalRecords);
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await getMedicalRecords();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center my-4 gap-2">
                <input
                    type="text"
                    placeholder="Patient ID"
                    value={patientId}
                    name="patientId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Get Medical Records
                </button>
            </form>
            {medicalRecords.length > 0 ? (
                <div className="overflow-y-auto max-h-[400px]">
                    {medicalRecords.map((medicalRecord) => (
                        <div
                            key={medicalRecord.id}
                            className="flex flex-col gap-7 p-5">
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
                                    Hospital:
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

                    ))}
                </div>
            ) : (
                null
            )}


        </div>
    );
}
export default GetMedicalRecords;