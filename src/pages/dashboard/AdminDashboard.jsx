import {
  Paper,
  Box,
  Stepper,
  Button,
  Divider,
  Step,
  StepLabel,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { getDocs, collection, query, where } from '@firebase/firestore'
import { db } from '../../utils/firebase'
import { ApplicantModal } from '../components/ApplicantModal'
import { AssignApt } from '../components/AssignApt'

const AdminDashboard = () => {
  // Store units retrieved from Firestore
  const [units, setUnits] = useState([])
  const [users, setUsers] = useState([])
  const [openUser, setOpenUser] = useState(false)
  const [openApt, setOpenApt] = useState(false)
  const [rowData, setRowData] = useState(false)

  // Fetch units on component mount
  useEffect(() => {
    const getAllUsersByType = async () => {
      // Create a reference to the users collection
      const usersRef = collection(db, 'users')

      // Create a query to filter by type
      const q = query(usersRef, where('type', '==', 1))

      // Get the documents
      const querySnapshot = await getDocs(q)

      // Return the documents
      const users = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setUsers(users)
    }
    getAllUsersByType()
  }, [openUser])

  useEffect(() => {
    const getAllUnits = async () => {
      const unitsRef = collection(db, 'units')
      const querySnapshot = await getDocs(unitsRef)

      const unitsData = []
      querySnapshot.forEach((doc) => {
        unitsData.push({ id: doc.id, ...doc.data() })
      })
      setUnits(unitsData)
    }
    getAllUnits()
  }, [openApt])

  const unitColumns = [
    { field: 'aptNo', headerName: 'Apt No', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'occupied', headerName: 'Occupied', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const test = params.row // Access current row data
        if (test.occupied === 'No') {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setRowData(test)
                  setOpenApt(true)
                }} // Pass row data
              >
                Assign
              </Button>
            </Box>
          )
        } else {
          return null
        }
      },
    },
  ] // Add additional columns based on your unit data

  const userColumns = [
    { field: 'fname', headerName: 'First Name', flex: 1 },
    { field: 'fPlan', headerName: 'Floor Plan Interested', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'vehicle', headerName: 'Vehicle', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const test = params.row // Access current row data
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setRowData(test)
                setOpenUser(true)
              }} // Pass row data
            >
              Approve
            </Button>
          </Box>
        )
      },
    },
  ] // Add additional columns based on your unit data

  return (
    <Paper elevation={5}>
      <Box sx={{ width: '100%', padding: '10px 20px' }}>
        <h2>Appartments</h2>
        <Divider />
        <DataGrid
          rows={units}
          columns={unitColumns}
          style={{ width: '98%' }}
          initialState={{}}
          pageSizeOptions={[5, 10, 25]}
        />
        <br />
        <Divider>New Applicants</Divider>
        <br />
        <DataGrid
          rows={users}
          columns={userColumns}
          style={{ width: '98%' }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
      <ApplicantModal open={openUser} setOpen={setOpenUser} data={rowData} />
      <AssignApt open={openApt} setOpen={setOpenApt} data={rowData} />
      {/* open={open} setOpen={setOpen}  */}
    </Paper>
  )
}

export default AdminDashboard
