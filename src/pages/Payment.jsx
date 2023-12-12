import {
  Paper,
  Box,
  TextField,
  Button,
  Divider,
  Grid,
  Card,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Modal,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { country_list, state_list } from '../assets/data'
import { db } from '../utils/firebase'
import { collection, getDocs, deleteDoc } from '@firebase/firestore'

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

const Payment = () => {
  const [payments, setPayments] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const getPaymentInfo = async () => {
      const unitsRef = collection(
        db,
        `units/${localStorage.getItem('aptId')}/payments`
      )
      const querySnapshot = await getDocs(unitsRef)

      const unitsData = []
      querySnapshot.forEach((doc) => {
        unitsData.push({ id: doc.id, ...doc.data() })
      })
      setPayments(unitsData)
    }
    getPaymentInfo()
  }, [open])

  const [formData, setFormData] = useState({
    cardno: '1234-1234-1234-1234',
    staddr: '4941 Heather Dr, Apt 208',
    apt: '',
    country: 'United States',
    city: 'Dearborn',
    state: 'MI - Michigan',
    zip: '48126',
  })
  const countries = country_list
  const states = state_list
  const columns = [
    { field: 'desc', headerName: 'Description', flex: 1 },
    { field: 'amt', headerName: 'Amount', type: 'number', flex: 1 },
  ]

  const makePayment = async () => {
    const collectionRef = collection(
      db,
      `units/${localStorage.getItem('aptId')}/payments`
    )

    try {
      const snapshot = await getDocs(collectionRef)
      const promises = []

      snapshot.forEach((doc) => {
        promises.push(deleteDoc(doc.ref))
      })

      await Promise.all(promises)
    } catch (error) {
      console.error('Error deleting documents:', error)
    }
    setOpen(false)
  }
  return (
    <Paper elevation={5}>
      <Box sx={{ width: '100%', padding: '10px 20px' }}>
        <h2>Payment</h2>
        <Divider />
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={10}>
            Outstanding Charges
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              style={{ float: 'right', marginRight: '40px' }}
              onClick={() => setOpen(true)}
            >
              Make Payment
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={payments}
              columns={columns}
              style={{ width: '98%' }}
              initialState={{}}
              pageSizeOptions={[5, 10, 25]}
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
          <Grid container spacing={2} columns={12}>
            <Grid item xs={8}>
              <h3>Enter Card Details</h3>
              <form>
                <Grid container spacing={3} columns={12}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="cardno"
                      label="Card Number"
                      name="cardno"
                      type="text"
                      required
                      defaultValue={formData.cardno}
                      helperText=""
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="staddr"
                      label="Street Address"
                      name="staddr"
                      type="text"
                      required
                      defaultValue={formData.staddr}
                      helperText=""
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="apt"
                      label="Apt, unit, suite, etc. (optional)"
                      name="apt"
                      type="text"
                      required
                      defaultValue={formData.apt}
                      helperText=""
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="country-label" required>
                        Country
                      </InputLabel>
                      <Select
                        labelId="country-label"
                        name="country"
                        id="country"
                        value={formData.country}
                        label="country"
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
                        {countries.map((country) => {
                          return (
                            <MenuItem key={country} value={country}>
                              {country}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      type="text"
                      required
                      defaultValue={formData.city}
                      helperText=""
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="state-label" required>
                        State
                      </InputLabel>
                      <Select
                        labelId="state-label"
                        fullWidth
                        name="state"
                        value={formData.state}
                        label="state"
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
                        {states.map((state) => {
                          return (
                            <MenuItem key={state} value={state}>
                              {state}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id="zip"
                      label="Zip Code"
                      name="zip"
                      type="text"
                      required
                      defaultValue={formData.zip}
                      helperText=""
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={4}>
              <br />
              <br />
              <Card style={{ background: '#e2e2e2', paddingLeft: '10px' }}>
                <h3>Total</h3>
                <p>
                  Amount: <b>{payments[-1]?.amt}</b>
                </p>
              </Card>
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" onClick={makePayment}>
            Submit Payment
          </Button>
        </Box>
      </Modal>
    </Paper>
  )
}
export default Payment
