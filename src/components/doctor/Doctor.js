import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const Doctor = (props) => {
    const [doctor, setDoctor] = useState({
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
        setDoctor((prevdoctorData) => ({
            ...prevdoctorData,
            [name]: value,
        }));
    };

    const createDoctor = async () => {
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
                const tx = await healthChain.createDoctor(
                    doctor.name,
                    doctor.surname,
                    doctor.dateOfBirth,
                    doctor.email,
                    doctor.telephone,
                    doctor.zipCode,
                    doctor.city,
                    doctor.country
                );
                await tx.wait();
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await createDoctor();
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
                    placeholder="Name"
                    value={doctor.name}
                    name="name"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Surname"
                    value={doctor.surname}
                    name="surname"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Birth"
                    value={doctor.dateOfBirth}
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={doctor.email}
                    name="email"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={doctor.telephone}
                    name="telephone"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Zip Code"
                    value={doctor.zipCode}
                    name="zipCode"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="City"
                    value={doctor.city}
                    name="city"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={doctor.country}
                    name="country"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}>
                    Register as a doctor
                </button>
            </form>
        </div>
    );
};

export default Doctor;