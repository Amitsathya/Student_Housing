import { Summary } from './components/Summary'
import { Roommates } from './components/Roommates'
import { AddInfo } from './components//AddInfo'
import { Info } from './components/Info'
import { LocComp } from './components/LocComp'
import { db } from '../../utils/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import {
  Paper,
  Box,
  Stepper,
  Button,
  Divider,
  Step,
  StepLabel,
} from '@mui/material'
import { useEffect, useState } from 'react'

const NewDashboard = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [data, setData] = useState({
    term: '',
    fPlan: '',
    fname: '',
    mname: '',
    lname: '',
    number: '',
    email: '',
    bdate: '',
    country: '',
    add1: '',
    add2: '',
    add3: '',
    city: '',
    state: '',
    zip: '',
    vehicle: '',
    vehicle_no: '',
    school: '',
    gender: '',
    school_year: '',
    grad_date: '',
    sociability: '',
    neat: '',
    hours_act: [],
    interests: [],
    international: '',
  })

  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, 'users', localStorage.getItem('uid'))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const test = docSnap.data()
        setData((prevData) => ({
          ...prevData,
          fname: test.fname,
          lname: test.lname,
          email: test.email,
          number: test.number,
          term: 'School Year Term Only (01/01/2024 - 12/30/2025)',
          fPlan: 'Apartment Suite (4 Berdoom, 2 Bath)',
          mname: 'L',
          bdate: '1998-04-04',
          country: 'United States',
          add1: '4941 Heather Dr, Apt XYZ',
          add2: '',
          add3: '',
          city: 'Dearborn',
          state: 'MI - Michigan',
          zip: '',
          vehicle: 'Yes',
          vehicle_no: '8426',
          school: 'University of Michigan, Dearborn',
          gender: 'Male',
          school_year: 'Senior',
          grad_date: '2026-05-05',
          sociability: 'Somewhat Sociable',
          neat: 'Somewhat Neat',
          hours_act: ['Early riser'],
          interests: ['Outdoor Activities'],
          international: 'Yes',
        }))
      } else {
        console.log('No such document!')
      }
    }

    getUserInfo()
  }, [])

  const handleLocInfoSubmit = (info) => {
    const updatedData = {}
    for (const key in info) {
      if (info.hasOwnProperty(key)) {
        updatedData[key] = info[key]
      }
    }
    setData((prevData) => ({
      ...prevData,
      ...updatedData,
    }))
    setActiveStep(activeStep + 1)
  }

  const submit = async () => {
    setActiveStep(activeStep + 1)
    const taskDocRef = doc(db, 'users', localStorage.getItem('uid'))
    try {
      await updateDoc(taskDocRef, data)
    } catch (err) {
      alert(err)
    }
  }

  // const isStepFailed = (step) => {
  //   return step === 1
  // }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <LocComp onLocInfoSubmit={handleLocInfoSubmit} data={data} />
      case 1:
        return <Info onLocInfoSubmit={handleLocInfoSubmit} data={data} />
      case 2:
        return <AddInfo onLocInfoSubmit={handleLocInfoSubmit} data={data} />
      case 3:
        return <Roommates onLocInfoSubmit={handleLocInfoSubmit} data={data} />
      case 4:
        return <Summary onSubmit={submit} data={data} />
      default:
        return (
          <Box
            style={{
              padding: '0px 50px',
              textAlign: 'center',
            }}
          >
            <h3>Please wait until we approve your application!</h3>
          </Box>
        )
    }
  }

  return (
    <Paper elevation={5}>
      <Box sx={{ width: '100%', padding: '10px 0px' }}>
        {activeStep != 5 ? (
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step key={0} onClick={() => setActiveStep(0)}>
              <StepLabel>Location</StepLabel>
            </Step>
            <Step key={1} onClick={() => setActiveStep(1)}>
              <StepLabel>
                {/* <Typography variant="caption" color="error"> */}
                Basic Info
                {/* </Typography> */}
              </StepLabel>
            </Step>
            <Step key={2} onClick={() => setActiveStep(2)}>
              <StepLabel>Addl. Info</StepLabel>
            </Step>
            <Step key={3} onClick={() => setActiveStep(3)}>
              <StepLabel>Roommates</StepLabel>
            </Step>
            <Step key={4} onClick={() => setActiveStep(4)}>
              <StepLabel>Summary</StepLabel>
            </Step>
          </Stepper>
        ) : null}
        {renderStepContent()}
      </Box>
    </Paper>
  )
}
export default NewDashboard
