import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const UpdatePatient = (props) => {
    const [patientUpdated, setpatientUpdated] = useState({
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
        setpatientUpdated((prevdoctorData) => ({
            ...prevdoctorData,
            [name]: value,
        }));
    };

    const updatePatient = async () => {
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
                const tx = await healthChain.updatePatient(
                    patientUpdated.id,
                    patientUpdated.doctorId,
                    patientUpdated.name,
                    patientUpdated.surname,
                    patientUpdated.dateOfBirth,
                    patientUpdated.email,
                    patientUpdated.telephone,
                    patientUpdated.telephone2,
                    patientUpdated.zipCode,
                    patientUpdated.city,
                    patientUpdated.country
                );
                console.log(tx);
                await tx.wait();
            }
        } catch (error) {

        }
    };
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await updatePatient();
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
                    placeholder="ID"
                    value={patientUpdated.id}
                    name="id"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Doctor ID"
                    value={patientUpdated.doctorId}
                    name="doctorId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={patientUpdated.name}
                    name="name"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={patientUpdated.surname}
                    name="surname"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Birth"
                    value={patientUpdated.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={patientUpdated.email}
                    name="email"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Primary Phone Number"
                    value={patientUpdated.telephone}
                    name="telephone"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Secondary Phone Number"
                    value={patientUpdated.telephone2}
                    name="telephone2"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={patientUpdated.zipCode}
                    name="zipCode"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={patientUpdated.city}
                    name="city"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={patientUpdated.country}
                    name="country"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Update Data
                </button>
            </form>

        </div>
    );
}
export default UpdatePatient;