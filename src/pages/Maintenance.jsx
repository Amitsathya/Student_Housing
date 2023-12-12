import {
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Grid,
  Card,
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Select,
  Modal,
} from '@mui/material'
import { db } from '../utils/firebase'
import { collection, getDocs, setDoc, addDoc } from '@firebase/firestore'
import { DataGrid } from '@mui/x-data-grid'
import { useContext, useEffect, useState } from 'react'
import { priority_list, category_list } from '../assets/data'
import { AuthContext } from '../App.jsx'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  color: 'black',
  boxShadow: 24,
  p: 4,
}

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([])
  const { authenticated } = useContext(AuthContext)
  const priorities = priority_list
  const categories = category_list
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const getMaintenanceInfo = async () => {
      const unitsRef = authenticated
        ? collection(db, `users/WIsCx78r3MR2X7ExVFphgoGFDRm1/maintenance`)
        : collection(db, `units/${localStorage.getItem('aptId')}/maintenance`)
      const querySnapshot = await getDocs(unitsRef)

      const unitsData = []
      querySnapshot.forEach((doc) => {
        unitsData.push({ id: doc.id, ...doc.data() })
      })
      setMaintenance(unitsData)
    }
    getMaintenanceInfo()
  }, [open])

  const [formData, setFormData] = useState({
    priority: '',
    desc: '',
    category: '',
    permission: '',
    status: 'Yet to be assigned',
  })
  // const data = [
  //   { id: 1, description: 'December Rent', status: 'Completed' },
  //   { id: 2, description: 'Parking Fee', status: 'Completed' },
  //   { id: 3, description: 'Late Payment Fee', status: 'Work in Progress' },
  // ]

  const columns =
    authenticated == 0
      ? [
          { field: 'id', headerName: 'Apt ID', flex: 1 },
          { field: 'desc', headerName: 'Description', flex: 1 },
          { field: 'status', headerName: 'Status', flex: 1 },
          { field: 'category', headerName: 'Category', flex: 1 },
          { field: 'priority', headerName: 'Priority', flex: 1 },
        ]
      : [
          { field: 'desc', headerName: 'Description', flex: 1 },
          { field: 'status', headerName: 'Status', flex: 1 },
          { field: 'category', headerName: 'Category', flex: 1 },
          { field: 'priority', headerName: 'Priority', flex: 1 },
        ]

  const handleButtonClock = async () => {
    try {
      await addDoc(
        collection(db, `units/${localStorage.getItem('aptId')}/maintenance`),
        formData
      )
      await addDoc(
        collection(db, `users/WIsCx78r3MR2X7ExVFphgoGFDRm1/maintenance`),
        { ...formData, id: localStorage.getItem('aptId') }
      )
      setOpen(false)
    } catch (error) {
      console.error('Error adding document:', error)
    }
  }
  return (
    <Paper elevation={5}>
      <Box sx={{ width: '100%', padding: '10px 20px' }}>
        <h2>Maintenance</h2>
        <Divider />
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={9}>
            Maintenance History
          </Grid>
          <Grid item xs={3}>
            {authenticated == 2 ? (
              <Button
                variant="contained"
                style={{ float: 'right', marginRight: '30px' }}
                onClick={() => setOpen(true)}
              >
                Request Maintenance
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={maintenance}
              columns={columns}
              style={{ width: '98%' }}
              // pageSizeOptions={[5, 10, 25]}
            />
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Enter Maintenance Issue</h3>
          <form>
            <Grid container spacing={3} columns={12}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label" required>
                    Priority
                  </InputLabel>
                  <Select
                    labelId="priority-label"
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    label="priority"
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
                    {priorities.map((priority) => {
                      return (
                        <MenuItem key={priority} value={priority}>
                          {priority}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label" required>
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    fullWidth
                    name="category"
                    value={formData.category}
                    label="category"
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
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="desc"
                  label="Full Description"
                  name="desc"
                  type="text"
                  required
                  defaultValue={formData.desc}
                  helperText=""
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormLabel id="permission-group-label" required>
                  Permission to Enter
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="permission-group-label"
                  name="permission"
                  value={formData.permission}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      [e.target.name]: e.target.value,
                    }))
                  }
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </form>
          <br />
          <Button variant="contained" onClick={handleButtonClock}>
            Submit Request
          </Button>
        </Box>
      </Modal>
    </Paper>
  )
}
export default Maintenance
