import React, {useEffect, useState} from 'react';

import app from "../firebaseConfig";
import { getDatabase ,ref, set, onValue} from "firebase/database";

export default function DriverMyRides() {
  /**
   * Start Initials
   */

    const [rides, setRides] = React.useState([]);
    const [offerText,setOfferText] = useState("Accept Offer")
    const [offerTextOne,setOfferTextOne] = useState("Accept Offer")

  /**
   * End Initials
   */  

  /**
   * Start Lifecycle Methods
   */

    useEffect(() => {
        const db = getDatabase();
        const RideRef = ref(db, '/ride/');
        onValue(RideRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          console.log(Object.values(data));
          // console.log()
          setRides(Object.values(data));
        });
      }, [])

  /**
   * Start Lifecycle Methods
   */
  
  /**
   * Start Methods 
   */
    const offerSetMethod = ()=>{
      alert("Do you want to Accept the Offer")
      setOfferText("Accepted")
    }

    const offerSetMethodOne = ()=>{
      alert("Do you want to Accept the Offer")
      setOfferTextOne("Accepted")
    }
  /**
   * End Methods 
   */
  return (
    <div>
         <div className='m-4'>
        <h1 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Rides Requested</h1>
        {rides && rides.map((ride, id) =>
        (           
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
                    {ride.ride.seatsAvailable}
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
                        Seats: 2
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {/* @ts-ignore */}
                      <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={offerSetMethod}>{offerText}</button>
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
                        seats: 1
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg" onClick={offerSetMethodOne}>{offerTextOne}</button>
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
