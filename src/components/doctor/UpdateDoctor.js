import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const UpdateDoctor = (props) => {
    const [doctorUpdated, setDoctorUpdated] = useState({
        id: "",
        name: "",
        surname: "",
        dateOfBirth: "",
        email: "",
        telephone: "",
        zipCode: "",
        city: "",
        country: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorUpdated((prevdoctorData) => ({
            ...prevdoctorData,
            [name]: value,
        }));
    };

    const updateDoctor = async () => {
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
                const tx = await healthChain.updateDoctor(
                    doctorUpdated.id,
                    doctorUpdated.name,
                    doctorUpdated.surname,
                    doctorUpdated.dateOfBirth,
                    doctorUpdated.email,
                    doctorUpdated.telephone,
                    doctorUpdated.zipCode,
                    doctorUpdated.city,
                    doctorUpdated.country
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
            await updateDoctor();
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
                    value={doctorUpdated.id}
                    name="id"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={doctorUpdated.name}
                    name="name"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={doctorUpdated.surname}
                    name="surname"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Birth"
                    value={doctorUpdated.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={doctorUpdated.email}
                    name="email"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={doctorUpdated.telephone}
                    name="telephone"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={doctorUpdated.zipCode}
                    name="zipCode"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={doctorUpdated.city}
                    name="city"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={doctorUpdated.country}
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
                >Update Doctor
                </button>
            </form>

        </div>
    );
}
export default UpdateDoctor;