import React, { useEffect, useState } from 'react'
import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";

import app from "../firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";


const contractAddress = "0xcfF2104AE02C4B4BcF5FbaA0393FCa04861fD185";

export default function DriverBidRides() {

    const [bid, setBid] = useState(0);
    const [rides, setRides] = useState([]);
    const [ids, setIds] = useState([]);

    
    //contract read
    const { contract } = useContract(contractAddress);
    // const { data, isLoading, error } = useMetadata(contract);
    
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    console.log("address", address);

    useEffect(() => {
        const db = getDatabase();
        const passengerRideRef = ref(db, '/passengerRide/');
        onValue(passengerRideRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);

          console.log(Object.values(data));
          // console.log()
          setRides(Object.values(data));
          setIds(Object.keys(data));
        });
      }, [])

    const handleBid = (id, ride) => {
        if(address == undefined){
            alert("Please connect your wallet");
            return;
          }
          
          const db = getDatabase();
          ride.ride["bid"] = bid;
          ride.ride["driverName"] = "Anupam";
          console.log(ride.ride);
          
          set(ref(db, 'passengerRide/' + id ), {ride : ride.ride}).then(() => {
            console.log("Data saved successfully!");
            publishCampaign();
          }).catch((error) => { 
            console.error("Error writing document: ", error);
          });
    }
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
            ]).then((data) => {
              alert("Your Bid updated successfully, passenger approval is remaining");
            })
    
            console.log("contract call success", data);
        } catch(error) {
            console.log("contract call failure", error);
        }
    
    }
    return (
        <div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                PickUp Location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Destination
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Seats Required
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount Expected
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Bidding Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rides && rides.map((ride, index) => (

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {ride.ride.startLocation}
                                </th>
                                <td class="px-6 py-4">
                                    {ride.ride.destination}
                                </td>
                                <td class="px-6 py-4">
                                    {ride.ride.seatsRequired}
                                </td>
                                <td class="px-6 py-4">
                                    {ride.ride.date}
                                </td>
                                <td class="px-6 py-4">
                                    {ride.ride.amount}
                                </td>
                                <td class="px-6 py-4 text-right">
                                {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label> */}
                                {ride.ride.bid !== undefined && 
                                    <h4 className='bg-green-200'><strong>Rs {ride.ride.bid}</strong></h4>
                                }
                                {ride.ride.bid === undefined && 
                                    <>
                                        <input type="number" name="name" onChange={e=>setBid(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$" required="" />
                                        <button onClick={() => handleBid(ids[index], ride)} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Bid</button>
                                    </>       
                                }
                                </td>
                            </tr>
                        )
                            
                        
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
