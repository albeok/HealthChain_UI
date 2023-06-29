import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const MedicalRecord = (props) => {
    const [medicalRecord, setMedicalRecord] = useState({
        requestId: "",
        patientId: "",
        fileName: "",
        hospital: "",
        fileDetails: null,
        hashIpfs: ""
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "fileDetails") {
            const selectedFile = files[0];
            setMedicalRecord((prevMedicalRecord) => ({
                ...prevMedicalRecord,
                fileDetails: selectedFile,
            }));
        } else {
            setMedicalRecord((prevMedicalRecord) => ({
                ...prevMedicalRecord,
                [name]: value,
            }));
        }
    };

    const uploadFileToIPFS = async () => {
        if (medicalRecord.fileDetails) {
            try {
                const apiKey = process.env.REACT_APP_PINATA_API_KEY;
                const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;

                const formData = new FormData();
                formData.append('file', medicalRecord.fileDetails);

                const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        pinata_api_key: apiKey,
                        pinata_secret_api_key: apiSecret,
                    },
                });
                const data = await response.json();
                const hashIpfs = `ipfs://${data.IpfsHash}`;
                console.log(hashIpfs);
                setMedicalRecord((prevMedicalRecord) => ({
                    ...prevMedicalRecord,
                    hashIpfs: hashIpfs,
                }));
                return hashIpfs;
            } catch (error) {
                console.log(`Error sending File to IPFS: ${error}`);
            }
        }
    };

    const createMedicalRecord = async () => {
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
                let hashIpfs = "";
                if (medicalRecord.fileDetails) {
                    hashIpfs = await uploadFileToIPFS();
                }
                const tx = await healthChain.createMedicalRecord(
                    medicalRecord.requestId,
                    medicalRecord.patientId,
                    medicalRecord.fileName,
                    medicalRecord.hospital,
                    hashIpfs
                );
                await tx.wait();
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await createMedicalRecord();
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
                    placeholder="Request ID"
                    value={medicalRecord.requestId}
                    name="requestId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Patient ID"
                    value={medicalRecord.patientId}
                    name="patientId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="File Name"
                    value={medicalRecord.fileName}
                    name="fileName"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Hospital"
                    value={medicalRecord.hospital}
                    name="hospital"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="file"
                    placeholder="fileDetails"
                    name="fileDetails"
                    onChange={handleChange}
                    className={`border-2 rounded-lg
                    ${props.darkMode ? "text-white" : ""}`}
                />

                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Create Medical Record
                </button>
            </form>
        </div>
    );
}
export default MedicalRecord;