import { useState } from "react";
import { abi, contractAddresses } from "../../constants";
import { ethers } from "ethers";

const RespondRequest = (props) => {
    const [response, setResponse] = useState({ requestId: "", approved: false });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setResponse((prevResponse) => {
            if (type === "radio") {
                return {
                    ...prevResponse,
                    [name]: name === "approved" ? !prevResponse[name] : checked,
                };
            } else {
                return {
                    ...prevResponse,
                    [name]: value,
                };
            }
        });
    };

    const respondToRequest = async () => {
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
                const tx = await healthChain.respondToRequest(response.requestId, response.approved);
                await tx.wait();
            }
        } catch (error) {

        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await respondToRequest();
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
                    placeholder="Request ID"
                    value={response.requestId}
                    name="requestId"
                    onChange={handleChange}
                    className="border-2 rounded-lg"
                />
                <label
                    htmlFor="approveInput"
                    className={`${props.darkMode
                        ? "text-slate-200"
                        : "text-zinc-950"}`}>
                    <input
                        id="approveInput"
                        type="radio"
                        value={true}
                        name="approved"
                        checked={response.approved === true}
                        onChange={handleChange}
                    />
                    Approve
                </label>
                <label
                    htmlFor="rejectInput"
                    className={`${props.darkMode
                        ? "text-slate-200"
                        : "text-zinc-950"}`}>
                    <input
                        id="rejectInput"
                        type="radio"
                        value={false}
                        name="approved"
                        checked={response.approved === false}
                        onChange={handleChange}
                    />
                    Reject
                </label>
                <button
                    type="submit"
                    className={`p-5 mt-2 border-2 rounded-lg border-white
                    ${props.darkMode
                            ? "bg-green-900 hover:bg-green-800 text-white"
                            : "bg-red-600 hover:bg-red-400"}`}
                >Respond
                </button>
            </form>
        </div>
    );
}

export default RespondRequest;
