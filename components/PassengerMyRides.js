import React, { useState, useEffect } from 'react'
import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";

import app from "../firebaseConfig";
import { getDatabase, ref, set, onValue } from "firebase/database";


const contractAddress = "0xcfF2104AE02C4B4BcF5FbaA0393FCa04861fD185";

function PassengerMyRides() {

  const [startLocation, setStartLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [seatsRequired, setSeatsRequired] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')

  const [rides, setRides] = useState([])

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
    } catch (error) {
      console.log("contract call failure", error);
    }

  }


  const handleUpload = async (e) => {
    if (address == undefined) {
      alert("Please connect your wallet");
      return;
    }
    const ride = {
      startLocation,
      destination,
      seatsRequired,
      date,
      amount
    }
    // upload data to firebase
    console.log(ride);
    const db = getDatabase();
    const id = new Date().getTime();
    set(ref(db, 'passengerRide/' + id), { ride }).then(() => {
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
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Request a Ride for bidding
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 ">
              <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Ride Details
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pickup Location</label>
                  <input type="text" onChange={e => setStartLocation(e.target.value)} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination</label>
                  <input type="text" onChange={e => setDestination(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seats Required</label>
                  <input type="text" onChange={e => setSeatsRequired(e.target.value)} name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Ride</label>
                  <input type="date" onChange={e => setDate(e.target.value)} name="date" id="date" placeholder="dd/mm/yyyy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div>
                  <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected Amount</label>
                  <input type="number" onChange={e => setAmount(e.target.value)} name="date" id="amount" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>

              </form>
              <button onClick={handleUpload} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Create Ride</button>
            </div>
          </div>
        </div>
      </section>


      <div className='m-4'>
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Rides Requested</h1>
        {rides && rides.map((ride, id) => (

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Pick up
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Drop
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Seats
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date of Ride
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ride.ride.startLocation}
                  </th>
                  <td className="px-6 py-4">
                    {ride.ride.destination}
                  </td>
                  <td className="px-6 py-4">
                    {ride.ride.seatsRequired}
                  </td>
                  <td className="px-6 py-4">
                    {ride.ride.date}
                  </td>
                  <td className="px-6 py-4">
                    {ride.ride.amount}
                  </td>
                </tr>

              </tbody>
            </table>

            {id == 0 &&
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                  </a>
                </div>
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="w-8 h-8 rounded-full" src="/profile-picture-1.jpg" alt="Neil image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Neil Sims
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          250
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Accept Offer</button>
                        </div>
                      </div>
                    </li>
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img className="w-8 h-8 rounded-full" src="/profile-picture-3.jpg" alt="Bonnie image" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Bonnie Green
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            email@windster.com
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          300
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Accept Offer</button>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>
              </div>
            }

          </div>

        ))
        }
      </div>



    </div>
  )
}

export default PassengerMyRides