import React, { useEffect, useState } from 'react'

import app from "../firebaseConfig";
import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";
import { getDatabase, ref, onValue} from "firebase/database";

export default function DriverDashboard() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  // const [vehicleType, setVehicleType] = useState("");
  // const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  // const [vehicleImage, setVehicleImage] = useState("");
  const [vehicleRC, setVehicleRC] = useState("");
  const [vehicleInsurance, setVehicleInsurance] = useState("");
  // const [vehiclePermit, setVehiclePermit] = useState("");
  // const [vehicleFitness, setVehicleFitness] = useState("");
  // const [vehiclePollution, setVehiclePollution] = useState("");
  const [vehiclePUC, setVehiclePUC] = useState("");
  // const [vehicleTax, setVehicleTax] = useState("");
  const [Aadhar, setAadhar] = useState("");
  const [rc, setRc] = useState("");
  const [drivingLicenseImage, setDrivingLicenseImage] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'driver/' + 1681776336328);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val().data;
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setDob(data.dob);
      setDrivingLicense(data.drivingLicense);
      setVehicleModel(data.vehicleModel);
      setVehicleNumber(data.vehicleNumber);
      // setVehicleType(data.vehicleType);
      // setVehicleColor(data.vehicleColor);

      setVehicleCapacity(data.vehicleCapacity);
      // setVehicleImage(data.vehicleImage);
      setVehicleRC(data.vehicleRC);
      setVehicleInsurance(data.vehicleInsurance);
      // setVehiclePermit(data.vehiclePermit);
      // setVehicleFitness(data.vehicleFitness);
      // setVehiclePollution(data.vehiclePollution);
      setVehiclePUC(data.vehiclePUC);
      // setVehicleTax(data.vehicleTax);
      setAadhar(data.Aadhar);
      setRc(data.rc);
      setDrivingLicenseImage(data.drivingLicenseImage);
    });
  }, []);

  return (
    <div>
              <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Driver Profile
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 ">
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Personal Details
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                    <input value={name} type="text" name="name" onChange={e=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={email} type="email" name="email" onChange={e=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                    <input value={phoneNumber} type="text" name="phoneNumber" onChange={e=>setPhoneNumber(e.target.value)} id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91" required="" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                    <input value={dob} type="date" name="date" onChange={e=>setDob(e.target.value)} id="date" placeholder="dd/mm/yyyy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="drivingLicense" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driving License Number</label>
                    <input value={drivingLicense} type="text" name="drivingLicense" onChange={e=>setDrivingLicense(e.target.value)} id="drivingLicense" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>


                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 ">
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Vehicle Details
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="Model" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model of Vehicle</label>
                    <input value={vehicleModel} type="text" name="Model" id="Model" onChange={e=>setVehicleModel(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Toyota Carolla" required="" />
                  </div>
                  <div>
                    <label htmlFor="manufactureYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Capacity</label>
                    <input value={vehicleCapacity} type="number" name="manufactureYear" onChange={e=>setVehicleCapacity(e.target.value)} id="manufactureYear" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3-12" required="" />
                  </div>
                  <div>
                    <label htmlFor="vin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Identification Number</label>
                    <input value={vehicleNumber} type="text" name="vin" id="vin" onChange={e=>setVehicleNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Insurance Number</label>
                    <input value={vehicleInsurance} type="text" name="licensePlateNumber" onChange={e=>setVehicleInsurance(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle PUC Number</label>
                    <input value={vehiclePUC} type="text" name="licensePlateNumber" onChange={e=>setVehiclePUC(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle RC Number</label>
                    <input value={vehicleRC} type="text" name="licensePlateNumber" onChange={e=>setVehicleRC(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 ">
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Upload Documents
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="drivingLicense" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Driving License</label>
                    <div className="flex items-center justify-center w-full">

                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <img src="/dl-fr-500x500.webp" alt="" />
                          {/* <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                        </div>
                        {/* <input id="dropzone-file" onChange={e=>setDrivingLicenseImage(e.target.value)} type="file" className="hidden" /> */}
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="aadharCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Aadhar Card</label>
                    <div className="flex items-center justify-center w-full">

                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <img src="/aadhar.png" alt="" />
                          {/* <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> */}
                        </div>
                        {/* <input id="dropzone-file" type="file" className="hidden" onChange={e=>setAadhar(e.target.value)}/> */}
                      </label>
                    </div>
                  </div>

                  <div>

                    <label htmlFor="vehicleRegistration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Registration Document</label>
                    <div className="flex items-center justify-center w-full">

                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          {/* <img src="/car.webp" alt="" /> */}
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        {/* <input id="dropzone-file" type="file" className="hidden" onChange={e=>setRc(e.target.value)}/> */}
                      </label>
                    </div>
                  </div>


                </form>
                  <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Upload</button>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
