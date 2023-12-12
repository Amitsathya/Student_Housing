import React, { useEffect, useState } from 'react'
import {
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Grid,
  Card,
  FormControl,
  Checkbox,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Select,
  Modal,
} from '@mui/material'
import {
  setDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from '@firebase/firestore'
import { DataGrid } from '@mui/x-data-grid'
import { db } from '../../utils/firebase'
import { neatnessLabels, sociabilityLabels } from '../../assets/data'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  overflow: 'auto',
  borderRadius: '8px',
  color: 'black',
  boxShadow: 24,
  p: 4,
}
export function AssignApt({ open, setOpen, data }) {
  const sociabilities = sociabilityLabels
  const neatness = neatnessLabels
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [formData, setFormData] = useState({
    gender: '',
    school_year: '',
    sociability: '',
    neat: '',
    hours_act: '',
    interests: '',
  })
  const userColumns = [
    { field: 'fname', headerName: 'Name', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'school_year', headerName: 'School Year', flex: 1 },
    { field: 'sociability', headerName: 'Sociability', flex: 1 },
    { field: 'neat', headerName: 'Neatness', flex: 1 },
    { field: 'hours_act', headerName: 'Hours of Activity', flex: 1 },
    { field: 'interests', headerName: 'Interests', flex: 1 },
    {
      field: 'select',
      headerName: 'Select',
      flex: 1,
      renderCell: (params) => (
        <Checkbox
          value={params.id}
          // checked={selectedUsers.has(params.row)}
          onClick={() => {
            setSelectedUsers([...selectedUsers, params.row])
          }}
        />
      ),
    },
  ]

  const selectedUserColumns = [
    { field: 'fname', headerName: 'Name', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'school_year', headerName: 'School Year', flex: 1 },
    { field: 'sociability', headerName: 'Sociability', flex: 1 },
    { field: 'neat', headerName: 'Neatness', flex: 1 },
    { field: 'hours_act', headerName: 'Hours of Activity', flex: 1 },
    { field: 'interests', headerName: 'Interests', flex: 1 },
  ]
  const handleAssignSubmit = async () => {
    try {
      const selectedUserIds = selectedUsers.map((user) => user.id)
      const selectedUserNames = selectedUsers.map((user) => user.fname)

      // Update the data object with the selected user IDs
      const updatedData = {
        ...data,
        assigned_id: selectedUserIds,
        assigned_name: selectedUserNames,
        occupied: 'Yes',
      }
      await setDoc(doc(db, 'units', data?.id), updatedData)
      selectedUsers.map(async (user) => {
        const aptData = {
          aptNo: data.aptNo,
          aptId: data.id,
          type: 2,
          roommates: selectedUserNames,
        }
        await setDoc(doc(db, 'users', user?.id), aptData, { merge: true })
      })
      setOpen(false)
    } catch (error) {
      console.error(error.code, error.message)
    }
  }

  useEffect(() => {
    const getAllUsersByType = async () => {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('type', '==', 3))
      const querySnapshot = await getDocs(q)
      const users = []
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      setUsers(users)
    }
    getAllUsersByType()
  }, [data])

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      // Check if all conditions are met
      return (
        (!formData.gender || user.gender === formData.gender) &&
        (!formData.school_year || user.school_year === formData.school_year) &&
        (!formData.sociability || user.sociability === formData.sociability) &&
        (!formData.neat || user.neat === formData.neat) &&
        (!formData.hours_act || user.hours_act === formData.hours_act) &&
        (!formData.interests || user.interests === formData.interests)
      )
    })
    setFilteredUsers(filteredUsers)
  }, [formData, users])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h3>Assign Appartment</h3>
        <p></p>
        <Divider>Location</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="gender-label" required>
                Legal Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                fullWidth
                name="gender"
                value={formData.gender}
                label="gender"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="school_year-label" required>
                College Year
              </InputLabel>
              <Select
                labelId="school_year-label"
                fullWidth
                name="school_year"
                value={formData.school_year}
                label="school_year"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                <MenuItem value={'Sophomore'}>Sophomore</MenuItem>
                <MenuItem value={'Junior'}>Junior</MenuItem>
                <MenuItem value={'Senior'}>Senior</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="sociability-label" required>
                Sociability
              </InputLabel>
              <Select
                labelId="sociability-label"
                fullWidth
                name="sociability"
                value={formData.sociability}
                label="sociability"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                {sociabilities.map((sociability) => {
                  return (
                    <MenuItem key={sociability} value={sociability}>
                      {sociability}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="neat-label" required>
                Neatness
              </InputLabel>
              <Select
                labelId="neat-label"
                fullWidth
                name="neat"
                value={formData.neat}
                label="neat"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                {neatness.map((neat) => {
                  return (
                    <MenuItem key={neat} value={neat}>
                      {neat}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="hours_act-label" required>
                Hours of Activity
              </InputLabel>
              <Select
                labelId="hours_act-label"
                fullWidth
                name="hours_act"
                value={formData.hours_act}
                label="hours_act"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                <MenuItem value={'Early riser'}>Early riser</MenuItem>
                <MenuItem value={'Morning person'}>Morning person</MenuItem>
                <MenuItem value={'Afternoon person'}>Junior</MenuItem>
                <MenuItem value={'Night owl'}>Night owl</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="interests-label" required>
                Interests
              </InputLabel>
              <Select
                labelId="interests-label"
                fullWidth
                name="interests"
                value={formData.interests}
                label="interests"
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                <MenuItem disabled value="">
                  <em>Select One</em>
                </MenuItem>
                <MenuItem value={'Creative'}>Creative</MenuItem>
                <MenuItem value={'Outdoor Activities'}>
                  Outdoor Activities
                </MenuItem>
                <MenuItem value={'Technology'}>Technology</MenuItem>
                <MenuItem value={'Reading'}>Reading</MenuItem>
                <MenuItem value={'Learning'}>Learning</MenuItem>
                <MenuItem value={'Socializing'}>Socializing</MenuItem>
                <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                <MenuItem value={'Sports'}>Sports</MenuItem>
                <MenuItem value={'Health and Fitness'}>
                  Health and Fitness
                </MenuItem>
                <MenuItem value={'Sustainability'}>Sustainability</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {selectedUsers.length == 4 ? (
            <Grid item xs={6}>
              <Button
                variant="contained"
                style={{ float: 'right' }}
                onClick={handleAssignSubmit}
              >
                Assign Unit
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Divider>Selected</Divider>
            <DataGrid
              rows={selectedUsers}
              columns={selectedUserColumns}
              style={{ width: '98%', height: 'auto' }}
              initialState={{}}
              pageSizeOptions={[5, 10, 25]}
            />
            <Divider> Applicants </Divider>
            <DataGrid
              rows={filteredUsers}
              columns={userColumns}
              style={{ width: '98%', height: 'auto' }}
              initialState={{}}
              pageSizeOptions={[5, 10, 25]}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
