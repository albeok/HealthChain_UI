import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const UpdateMedicalRecord = (props) => {
    const [medicalRecordUpdated, setMedicalRecordUpdated] = useState({
        id: "",
        patientId: "",
        requestId: "",
        fileName: "",
        hospital: "",
        details: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMedicalRecordUpdated((prevMedicalRecord) => ({
            ...prevMedicalRecord,
            [name]: value,
        }));
    };

    const updateMedicalRecord = async () => {
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
                const tx = await healthChain.updateMedicalRecord(
                    medicalRecordUpdated.patientId,
                    medicalRecordUpdated.id,
                    medicalRecordUpdated.requestId,
                    medicalRecordUpdated.fileName,
                    medicalRecordUpdated.hospital,
                    medicalRecordUpdated.details
                );
                await tx.wait();
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await updateMedicalRecord();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center text-center my-4 gap-2"
            >
                <input
                    type="text"
                    placeholder="ID"
                    value={medicalRecordUpdated.id}
                    name="id"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Request ID"
                    value={medicalRecordUpdated.requestId}
                    name="requestId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Patient ID"
                    value={medicalRecordUpdated.patientId}
                    name="patientId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="File Name"
                    value={medicalRecordUpdated.fileName}
                    name="fileName"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Hospital"
                    value={medicalRecordUpdated.hospital}
                    name="hospital"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Details"
                    value={medicalRecordUpdated.details}
                    name="details"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />

                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >
                    Update Medical Record
                </button>
            </form>
        </div>
    );
}
export default UpdateMedicalRecord;