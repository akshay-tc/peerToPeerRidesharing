import React, { useEffect } from 'react'
import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";

import app from "../firebaseConfig";
import { getDatabase ,ref, set, onValue} from "firebase/database";


const contractAddress = "0xcfF2104AE02C4B4BcF5FbaA0393FCa04861fD185";


export default function DriverRideRequests() {
  const [startLocation, setStartLocation] = React.useState('')
  const [destination, setDestination] = React.useState('')
  const [seatsAvailable, setSeatsAvailable] = React.useState('')
  const [date, setDate] = React.useState('')
  const [amount, setAmount] = React.useState('');
  const [rides, setRides] = React.useState([]);

  const { contract } = useContract(contractAddress);
    // const { data, isLoading, error } = useMetadata(contract);
    
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    console.log("address", address);
    
    useEffect(() => {
      const db = getDatabase();
      const passengerRideRef = ref(db, '/ride/');
      onValue(passengerRideRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log(Object.values(data));
        // console.log()
        setRides(Object.values(data));
      });
    }, [])

      const publish = async (form) => {
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
            alert("Ride organized Successfully");
        } catch(error) {
            console.log("contract call failure", error);
        }

    }


  const handleUpload = async () => {
    // if(address == undefined){
    //   alert("Please connect your wallet");
    //   return;
    // }
    const ride = {
      startLocation,
      destination,
      seatsAvailable,
      date,
      amount,
      createdBy:"Adnan",
      claimStatus:"Claim This Ride",
      claimedBy:""
    }
    // upload data to firebase
    console.log(ride);
    const db = getDatabase();
    const id = new Date().getTime();
    set(ref(db, 'ride/' + id), {ride}).then(() => {
      console.log("Data saved successfully!");
      publish();
      
    }).catch((error) => { 
      console.error("Error writing document: ", error);
    });
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Organise a Ride
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 ">
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Ride Details
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ride Start Location</label>
                    <input type="text" onChange={e=>setStartLocation(e.target.value)} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ride Destination</label>
                    <input type="email" onChange={e=>setDestination(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seats Available</label>
                    <input type="text" onChange={e=>setSeatsAvailable(e.target.value)} name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Ride</label>
                    <input type="date" onChange={e=>setDate(e.target.value)} name="date" id="date" placeholder="dd/mm/yyyy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount per seat</label>
                    <input type="number" onChange={e=>setAmount(e.target.value)} name="date" id="amount" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>

                </form>
                  <button onClick={handleUpload} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Create Ride</button>
              </div>
            </div>
          </div>
        </section>

       

    </div>
  )
}
