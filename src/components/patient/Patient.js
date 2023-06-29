import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const Patient = (props) => {
    const [patient, setPatient] = useState({
        id: "",
        doctorId: "",
        name: "",
        surname: "",
        dateOfBirth: "",
        email: "",
        telephone: "",
        telephone2: "",
        zipCode: "",
        city: "",
        country: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPatient((prevPatientData) => ({
            ...prevPatientData,
            [name]: value,
        }));
    };

    const createPatient = async () => {
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
                const tx = await healthChain.createPatient(
                    patient.doctorId,
                    patient.name,
                    patient.surname,
                    patient.dateOfBirth,
                    patient.email,
                    patient.telephone,
                    patient.telephone2,
                    patient.zipCode,
                    patient.city,
                    patient.country
                );
                await tx.wait();
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await createPatient();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center text-center my-4 gap-2">
                <input
                    type="text"
                    placeholder="Doctor ID"
                    value={patient.doctorId}
                    name="doctorId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={patient.name}
                    name="name"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={patient.surname}
                    name="surname"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Birth"
                    value={patient.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={patient.email}
                    name="email"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Primary Phone Number"
                    value={patient.telephone}
                    name="telephone"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Secondary Phone Number"
                    value={patient.telephone2}
                    name="telephone2"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={patient.zipCode}
                    name="zipCode"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={patient.city}
                    name="city"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={patient.country}
                    name="country"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Register as a Patient
                </button>
            </form>
        </div>
    );
};

export default Patient;