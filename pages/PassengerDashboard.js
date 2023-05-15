import React, { useEffect } from 'react';
import Profile from '../components/PassengerDashboard';
import MyRides from '../components/PassengerMyRides';
import AllRides from '../components/PassengerAllRides';
import Wallet from '../components/PassengerWallet';
import CreateRide from '../components/PassengerCreateRide';

import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";

import app from "../firebaseConfig";
import { getDatabase ,ref, set} from "firebase/database";


const contractAddress = "0xcfF2104AE02C4B4BcF5FbaA0393FCa04861fD185";

export default function PassengerDashboard() {
    const [activeTab, setActiveTab] = React.useState({
        profile: true,
        myRides: false,
        allRides: false,
        wallet: false,
        createRide: false
    });
    const { contract } = useContract(contractAddress);
    // const { data, isLoading, error } = useMetadata(contract);
    
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    console.log("address", address);
    // const data = await createCampaign([
    //     address, //owner
    //     form.title, //title
    //     form.description,
    //     form.target,
    //     new Date(form.deadline).getTime(),
    //     form.image
    // ])

      const publishCampaign = async (form) => {
        let _owner = address;
        let _title = "Adnan";
        let _description = "First form";
        let _target = 1;
        let _deadline = new Date("2023/05/30").getTime();
        let _image = "https://en.bitcoin.it/w/images/en/d/df/Blockchain.png";
        try {
            
            const data = await createCampaign([
                _owner, //owner
                _title, //title
                _description,
                _target,
                _deadline,
                _image
            ])

            console.log("contract call success", data);
        } catch(error) {
            console.log("contract call failure", error);
        }

    }

    useEffect(() => {
        // const database = getDatabase();
        // publishCampaign();
        // writeUserData(1, "Adnan", "adnan@gmail.com", "https://en.bitcoin.it/w/images/en/d/df/Blockchain.png");
    }, [])

    function writeUserData(userId, name, email, imageUrl) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          profile_picture : imageUrl
        });
      }

    return (
        <>
            {/* <Web3Button
                contractAddress={contractAddress}
                // Calls the "setName" function on your smart contract with "My Name" as the first argument
                action={() => mutateAsync({ args: [address, "Adnan", "First form", 0.5, new Date("30/04/2023").getTime(), "https://en.bitcoin.it/w/images/en/d/df/Blockchain.png"] })}
            >
                Send Transaction
            </Web3Button> */}

            

            

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li onClick={() => {
                            setActiveTab({
                                profile: true,
                                myRides: false,
                                allRides: false,
                                wallet: false,
                                createRide: false
                            })
                        }}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3">Dashboard</span>
                            </a>
                        </li>
                        <li onClick={() => {
                            setActiveTab({
                                profile: false,
                                myRides: false,
                                allRides: true,
                                wallet: false,
                                createRide: false
                            })
                        }}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Rides Available</span>
                                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                            </a>
                        </li>
                        <li onClick={() => {
                            setActiveTab({
                                profile: false,
                                myRides: true,
                                allRides: false,
                                wallet: false,
                                createRide: false
                            })
                        }}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">My Rides</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                        <li onClick={() => {
                            setActiveTab({
                                profile: false,
                                myRides: false,
                                allRides: false,
                                wallet: false,
                                createRide: true
                            })
                        }}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Create Ride</span>
                            </a>
                        </li>
                        <li onClick={() => {
                            setActiveTab({
                                profile: false,
                                myRides: false,
                                allRides: false,
                                wallet: true,
                                createRide: false
                            })
                        }}>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Wallet</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">SignOut</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <ConnectWallet
                theme="dark"
                btnTitle="Connect Wallet"
            />
                    {
                        activeTab.profile && <Profile />
                    }
                    {
                        activeTab.myRides && <MyRides />
                    }
                    {
                        activeTab.createRide && <CreateRide />
                    }
                    {
                        activeTab.wallet && <Wallet />
                    }
                    {
                        activeTab.allRides && <AllRides />
                    }
                </div>
            </div>


        </>
    )
}
