import React, { Component, useState, useEffect } from 'react'

import app from "../firebaseConfig";
import { getDatabase ,ref, set} from "firebase/database";

import { useMetadata, useAddress, useContractRead, useContractWrite, useContract, Web3Button, ConnectWallet } from "@thirdweb-dev/react";

const contractAddress = "0xcfF2104AE02C4B4BcF5FbaA0393FCa04861fD185";

export default function DriverRegistration () {
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

  //contract read
  const { contract } = useContract(contractAddress);
  // const { data, isLoading, error } = useMetadata(contract);
  
  const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

  const address = useAddress();
  console.log("address", address);


  function handleUpload() {
    if(address == undefined){
      alert("Please connect your wallet");
      return;
    }
    const data = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      dob: dob,
      drivingLicense: drivingLicense,
      vehicleModel: vehicleModel,
      vehicleNumber: vehicleNumber,
      vehicleCapacity: vehicleCapacity,
      vehicleInsurance: vehicleInsurance,
      vehicleRC: vehicleRC,
      vehiclePUC: vehiclePUC,
      Aadhar: Aadhar,
      rc: rc,
      drivingLicenseImage: drivingLicenseImage,
    }
    // upload data to firebase
    console.log(data);
    const db = getDatabase();
    const userId = new Date().getTime();
    set(ref(db, 'driver/' + userId), {data}).then(() => {
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
          alert("Data Uploaded Successfully, Now wait for admin approval");
        })

        console.log("contract call success", data);
    } catch(error) {
        console.log("contract call failure", error);
    }

}
  
    return (
      <>
        <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">BlockShare</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a href="/DriverRegistration" className="mr-5 hover:text-white">Driver</a>
            <a href="/PassengerRegistration" className="mr-5 hover:text-white">Rider</a>
            <a href="/Login" className="mr-5 hover:text-white">Login</a>
            <a className="mr-5 hover:text-white">Contact</a>
          </nav>
          <ConnectWallet
                theme="dark"
                btnTitle="Connect Wallet"
            />
          {/* <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Dashboard
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button> */}
        </div>
      </header>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Driver Registration
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 ">
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Personal Details
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Full Name</label>
                    <input type="text" name="name" onChange={e=>setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" onChange={e=>setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone Number</label>
                    <input type="text" name="phoneNumber" onChange={e=>setPhoneNumber(e.target.value)} id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91" required="" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                    <input type="date" name="date" onChange={e=>setDob(e.target.value)} id="date" placeholder="dd/mm/yyyy" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="drivingLicense" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Driving License Number</label>
                    <input type="text" name="drivingLicense" onChange={e=>setDrivingLicense(e.target.value)} id="drivingLicense" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
                    <input type="text" name="Model" id="Model" onChange={e=>setVehicleModel(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Toyota Carolla" required="" />
                  </div>
                  <div>
                    <label htmlFor="manufactureYear" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Capacity</label>
                    <input type="number" name="manufactureYear" onChange={e=>setVehicleCapacity(e.target.value)} id="manufactureYear" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="3-12" required="" />
                  </div>
                  <div>
                    <label htmlFor="vin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Identification Number</label>
                    <input type="text" name="vin" id="vin" onChange={e=>setVehicleNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Insurance Number</label>
                    <input type="text" name="licensePlateNumber" onChange={e=>setVehicleInsurance(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle PUC Number</label>
                    <input type="text" name="licensePlateNumber" onChange={e=>setVehiclePUC(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div>
                    <label htmlFor="licensePlateNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle RC Number</label>
                    <input type="text" name="licensePlateNumber" onChange={e=>setVehicleRC(e.target.value)} id="licensePlateNumber" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
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
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" onChange={e=>setDrivingLicenseImage(e.target.value)} type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="aadharCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Aadhar Card</label>
                    <div className="flex items-center justify-center w-full">

                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={e=>setAadhar(e.target.value)}/>
                      </label>
                    </div>
                  </div>

                  <div>

                    <label htmlFor="vehicleRegistration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle Registration Document</label>
                    <div className="flex items-center justify-center w-full">

                      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={e=>setRc(e.target.value)}/>
                      </label>
                    </div>
                  </div>

                  <button onClick={handleUpload} className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">Upload</button>

                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">BlockShare</span>
          </a>
          <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2020 BlockShare —
            <a href="https://twitter.com/knyttneve" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@UITRGPV</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-400">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
      </>
    )
  
}
