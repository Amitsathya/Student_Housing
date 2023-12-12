import {
  Box,
  Divider,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Select,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { useState } from 'react'
import { country_list, state_list } from '../../../assets/data'

export function AddInfo({ onLocInfoSubmit, data }) {
  const countries = country_list
  const states = state_list
  const [formData, setFormData] = useState({
    country: data.country,
    add1: data?.add1,
    add2: data?.add2,
    add3: data?.add3,
    city: data?.city,
    state: data?.state,
    zip: data?.zip,
    vehicle: data?.vehicle,
    vehicle_no: data?.vehicle_no,
  })

  const handleInfoSubmit = () => {
    onLocInfoSubmit(formData)
  }

  return (
    <Box
      style={{
        padding: '0px 50px',
      }}
    >
      <h2>Additional Information</h2>
      <p>
        Please fill out all required information below. Required fields are
        marked with a red asterisk{' '}
        <span
          style={{
            color: 'red',
          }}
        >
          *
        </span>
        .
      </p>
      <Divider>Current Local Address</Divider>
      <br />
      <form>
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="add1"
              label="Address 1"
              name="add1"
              type="text"
              required
              defaultValue={formData.add1}
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
            <TextField
              fullWidth
              id="add2"
              label="Address 2"
              name="add2"
              type="text"
              defaultValue={formData.add2}
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
            <TextField
              fullWidth
              id="add3"
              label="Address 3"
              name="add3"
              type="text"
              defaultValue={formData.add3}
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
        </Grid>
        <br />
        <Divider>Vehicle Information</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <FormLabel id="vehicle-group-label" required>
              Do you have a vehicle?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="vehicle-group-label"
              name="vehicle"
              value={formData.vehicle}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="vehicle_no"
              label="Vehicle Number"
              name="vehicle_no"
              type="number"
              required
              defaultValue={formData.vehicle_no}
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
      <br />
      <Button variant="contained">Previous</Button>
      <Button
        className="rightBtn"
        variant="contained"
        disabled={false}
        onClick={() => handleInfoSubmit()}
      >
        Next
      </Button>
    </Box>
  )
}
