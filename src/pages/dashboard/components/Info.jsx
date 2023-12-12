import {
  Box,
  Divider,
  Grid,
  FormControl,
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
export function Info({ onLocInfoSubmit, data }) {
  const [formData, setFormData] = useState({
    fname: data?.fname,
    mname: data?.mname,
    lname: data?.lname,
    number: data?.number,
    email: data?.email,
    bdate: data?.bdate,
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
      <h2>Basic Information</h2>
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
      <Divider>Personal Information</Divider>
      <br />
      <form>
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="fname"
              label="Legal First Name"
              name="fname"
              type="text"
              required
              defaultValue={formData.fname}
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
              id="mname"
              label="Middle Name"
              name="mname"
              type="text"
              required
              defaultValue={formData.mname}
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
              id="lname"
              label="Last Name"
              name="lname"
              type="text"
              required
              defaultValue={formData.lname}
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
              id="number"
              label="Phone Number"
              name="number"
              type="tel"
              required
              defaultValue={formData.number}
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
              id="email"
              label="Email Address"
              name="email"
              type="email"
              required
              defaultValue={formData.email}
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
              id="bdate"
              label="Birth Date"
              name="bdate"
              type="date"
              required
              defaultValue={formData.bdate}
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
