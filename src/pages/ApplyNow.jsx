import {
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  InputLabel,
  Grid,
  useTheme,
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../utils/firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image1 from '../assets/4b2b1130sqft.jpg' // Replace with your image paths
import image2 from '../assets/4b4b1219sqft.jpg'

const ApplyNow = () => {
  const images = [image1, image2]
  const navigate = useNavigate()
  const [message, setMessage] = useState({
    status: false,
    severity: 'error',
    text: 'Error Displayed',
  })

  const [formData, setFormData] = useState({
    fname: 'Teste',
    lname: 'R',
    number: '123-123-1234',
    email: 'teste@gmail.com',
    pw: 'teste123',
    cpw: 'teste123',
    source: '1',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  const onLogin = async () => {
    if (formData.cpw !== formData.pw) {
      return setMessage((prevData) => ({
        ...prevData,
        status: true,
        text: 'Password Incorrect',
      }))
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.pw
      )
      const user = userCredential.user
      const uid = user.uid

      await setDoc(doc(db, 'users', uid), {
        ...formData,
        type: 1,
      })
      localStorage.setItem('userType', 1)
      navigate('/dashboard')
      localStorage.setItem('uid', uid)
    } catch (error) {
      const errorMessage = error.message
      return setMessage((prevData) => ({
        ...prevData,
        status: true,
        text: errorMessage,
      }))
    }
  }

  return (
    <Card sx={{ minWidth: 275 }} className="card">
      <CardContent>
        <h1>Apply Online</h1>
        <Divider variant="middle" />

        <Grid container spacing={2} columns={12}>
          <Grid item xs={7}>
            <h2>Create an Account to Begin</h2>
            <p>
              To start your application, create an account. We will be able to
              save your progress and enable you to come back anytime to check on
              the status of your application.
            </p>
            <p>
              For any questions, please call <a href="tel:+">(123) 123-1234</a>.
            </p>

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
                    id="lname"
                    label="Legal Last Name"
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
                    id="pw"
                    label="Password"
                    name="pw"
                    type="password"
                    required
                    defaultValue={formData.pw}
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
                    id="cpw"
                    label="Confirm Password"
                    name="cpw"
                    type="password"
                    required
                    defaultValue={formData.cpw}
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
                  <InputLabel id="source-label" required>
                    Source
                  </InputLabel>
                  <Select
                    labelId="source-label"
                    fullWidth
                    id="source"
                    name="source"
                    value={formData.source}
                    label="Source"
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
                    <MenuItem value={1}>
                      Wolverine Dwell Communities Website
                    </MenuItem>
                    <MenuItem value={2}>Google Search</MenuItem>
                    <MenuItem value={3}>Housing Fair</MenuItem>
                    <MenuItem value={4}>Instagram</MenuItem>
                    <MenuItem value={5}>Resident Referral</MenuItem>
                    <MenuItem value={6}>University Website</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={5}>
            <Carousel autoPlay={true} indicators={true}>
              {images.map((image, index) => (
                <Item key={index}>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </Item>
              ))}
            </Carousel>
          </Grid>
        </Grid>
      </CardContent>
      <Snackbar
        open={message.status}
        autoHideDuration={3000}
        onClose={() =>
          setMessage((prevData) => ({
            ...prevData,
            status: false,
          }))
        }
      >
        <Alert
          onClose={() =>
            setMessage((prevData) => ({
              ...prevData,
              status: false,
            }))
          }
          severity={message.severity}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Card>
  )
}

function Item({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}
export default ApplyNow
