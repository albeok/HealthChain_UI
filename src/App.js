import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

import Header from "./components/00_header/Header";
import Patient from "./components/patient/Patient";
import Doctor from './components/doctor/Doctor';
import MedicalRecord from './components/medicalRecord/MedicalRecord';
import Request from './components/request/Request';
import RespondRequest from './components/request/RespondToRequest';
import GetRequests from './components/request/GetRequests';
import UpdateDoctor from './components/doctor/UpdateDoctor';
import UpdatePatient from './components/patient/UpdatePatient';
import GetPatientData from './components/patient/GetPatientData';
import GetPatientsDoctorId from './components/patient/GetPatientsDoctorId';
import GetDoctorData from './components/doctor/GetDoctorData';
import UpdateMedicalRecord from './components/medicalRecord/UpdateMedicalRecord';
import GetMedicalRecords from './components/medicalRecord/GetMedicalRecords';
import GetMedicalRecordById from './components/medicalRecord/GetMedicalRecordById';

const App = () => {
  const [patient, setPatient] = useState({
    showButton: false,
    showRegistration: false,
    showPatientData: false,
    showUpdate: false,
    showRespond: false,
    showRequests: false,
    showMedicalRecords: false,
    showMedicalRecordById: false,
    showDoctorData: false,
    showPatientsDoctor: false
  });
  const [doctor, setDoctor] = useState({
    showButton: false,
    showRegistration: false,
    showDoctorData: false,
    showUpdate: false,
    showRequest: false,
    showMedicalRecord: false,
    showUpdateMedicalRecord: false,
    showPatientsDoctor: false
  });
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState);
  };



  return (
    <div className={`min-h-screen overflow-x-hidden bg-gradient-to-b 
    ${darkMode
        ? 'from-gray-800 to-gray-900'
        : 'from-white to-indigo-500'} `}>
      <Header
        handleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <main>
        {/* homepage */}
        <div
          className={`flex flex-row justify-around py-7 my-7 md:flex-col gap-3${patient.showButton === true || doctor.showButton === true ? "hidden" : ""}`}>
          {!doctor.showButton &&
            <button
              onClick={() => { setPatient(prevState => ({ ...prevState, showButton: true })) }}
              className={`py-5 px-16 border rounded-lg
              ${darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-blue-300 hover:bg-slate-300"}   
              ${patient.showButton === true && "hidden"}`}
            >Patient
            </button>
          }
          {!patient.showButton &&
            <button
              onClick={() => { setDoctor(prevState => ({ ...prevState, showButton: true })) }}
              className={`py-5 px-16 border rounded-lg
              ${darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-blue-300 hover:bg-slate-300"}   
              ${doctor.showButton === true && "hidden"}`}
            >Doctor
            </button>
          }
        </div>
        {/* end homepage */}
        {/* Patient functionality */}
        {patient.showButton &&
          <div className='flex flex-col gap-7 items-center text-center mt-5 md:justify-center'>
            <div className='md:grid md:grid-cols-4 md:gap-4'>
              <div >
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showRegistration: !prevState.showRegistration })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Create Patient
                </button>
                {patient.showRegistration && <Patient darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showPatientData: !prevState.showPatientData })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Your Data
                </button>
                {patient.showPatientData && <GetPatientData darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showUpdate: !prevState.showUpdate })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Update Data
                </button>
                {patient.showUpdate && <UpdatePatient darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showRespond: !prevState.showRespond })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Respond Request
                </button>
                {patient.showRespond && <RespondRequest darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showRequests: !prevState.showRequests })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Get Requests
                </button>
                {patient.showRequests && <GetRequests darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showMedicalRecords: !prevState.showMedicalRecords })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Medical Records
                </button>
                {patient.showMedicalRecords && <GetMedicalRecords darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showMedicalRecordById: !prevState.showMedicalRecordById })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Medical Record by ID
                </button>
                {patient.showMedicalRecordById && <GetMedicalRecordById darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showDoctorData: !prevState.showDoctorData })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Doctor Data
                </button>
                {patient.showDoctorData && <GetDoctorData darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setPatient(prevState => ({ ...prevState, showPatientsDoctor: !prevState.showPatientsDoctor })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Patient's Doctor
                </button>
                {patient.showPatientsDoctor && <GetPatientsDoctorId darkMode={darkMode} />}
              </div>
            </div>
            <button
              onClick={() => { setPatient(prevState => ({ ...prevState, showButton: false })) }}
              className={`w-full py-10 bg-gradient-to-t
              ${darkMode
                  ? "from-gray-800 to-gray-700 text-white"
                  : "from-slate-500 to-slate-400"} `}
            >Esc
            </button>
          </div>
        }
        {/* End Patient Functionality */}
        {/* Doctor Functionality */}
        {doctor.showButton &&
          <div className='flex flex-col gap-7 items-center text-center mt-5 md:justify-center'>
            <div className='md:grid md:grid-cols-4 md:gap-4'>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showRegistration: !prevState.showRegistration })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Create Doctor
                </button>
                {doctor.showRegistration && <Doctor darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showDoctorData: !prevState.showDoctorData })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Your Data
                </button>
                {doctor.showDoctorData && <GetDoctorData darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showUpdate: !prevState.showUpdate })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Update Data
                </button>
                {doctor.showUpdate && <UpdateDoctor darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showRequest: !prevState.showRequest })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Create Request
                </button>
                {doctor.showRequest && <Request darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showMedicalRecord: !prevState.showMedicalRecord })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Create Medical Record
                </button>
                {doctor.showMedicalRecord && <MedicalRecord darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showUpdateMedicalRecord: !prevState.showUpdateMedicalRecord })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Update Medical Record
                </button>
                {doctor.showUpdateMedicalRecord && <UpdateMedicalRecord darkMode={darkMode} />}
              </div>
              <div>
                <button
                  onClick={() => { setDoctor(prevState => ({ ...prevState, showPatientsDoctor: !prevState.showPatientsDoctor })) }}
                  className={`w-32 h-32 border-2 rounded-lg border-white 
                  ${darkMode
                      ? "bg-indigo-900 hover:bg-indigo-800 text-white"
                      : "bg-cyan-600 hover:bg-cyan-300"}`}
                >Patient's Doctor
                </button>
                {doctor.showPatientsDoctor && <GetPatientsDoctorId darkMode={darkMode} />}
              </div>
            </div>
            <button
              onClick={() => { setDoctor(false) }}
              className={`w-full py-10 bg-gradient-to-t
              ${darkMode
                  ? "from-gray-800 to-gray-700 text-white"
                  : "from-slate-500 to-slate-400"} `}
            >Esc
            </button>
          </div>
        }
        {/* End Doctor Functionality */}
      </main>
    </div>
  )
}


export default App;