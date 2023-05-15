import React, {useContext, createContext} from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children}) => {
    const {contract} = useContract('0x7d4DdB011a18036DC1c1584507617400520782a0')
    const {mutateAsync : createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            
            const data = await createCampaign([
                address, //owner
                form.title, //title
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])

            console.log("contract call success", data);
        } catch(error) {
            console.log("contract call failure", error);
        }

    }

    return (
        <StateContextProvider
            value={{
                // address, 
                // contract, 
                createCampaign : publishCampaign,
            }}
        >
            {children}

        </StateContextProvider>
    )
}

export const useStateContext = () => useContext(StateContext);