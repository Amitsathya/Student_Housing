import {
  Grid,
  Box,
  Card,
  CardContent,
  TextField,
  Snackbar,
  Alert,
  Button,
  useTheme,
} from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../utils/firebase'
import { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDoc, doc } from '@firebase/firestore'
import { AuthContext } from '../App.jsx'
import image1 from '../assets/home/1.jpeg' // Replace with your image paths
import image2 from '../assets/home/2.jpeg'
import image3 from '../assets/home/3.jpeg'
const Login = () => {
  const images = [image1, image2, image3]
  const theme = useTheme()
  const navigate = useNavigate()
  const [message, setMessage] = useState({
    status: false,
    severity: 'error',
    text: 'Error Displayed',
  })
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin123')
  const { setAuthenticated } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      localStorage.setItem('uid', user.uid)

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const userType = docSnap.data()['type']
        if (userType == 1) {
          setMessage((prevData) => ({
            ...prevData,
            status: true,
            text: 'Please wait until we approve your application',
          }))
        } else {
          localStorage.setItem('userType', userType)
          setAuthenticated(localStorage.getItem('userType'))
          navigate('/dashboard')
        }
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      setMessage((prevData) => ({
        ...prevData,
        status: true,
        text: error.message,
      }))
    }
  }

  return (
    <Grid container spacing={0}>
      {/* Left grid */}
      <Grid item xs={6}>
        <Box sx={{ height: '100%' }}>
          <Carousel autoPlay={true} indicators={true}>
            {images.map((image, index) => (
              <Item key={index}>
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: 'auto', height: '700px' }}
                />
              </Item>
            ))}
          </Carousel>
        </Box>
      </Grid>

      {/* Right grid */}
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Card
          className="card"
          sx={{ padding: '50px', width: '50%', minHeight: 0 }}
        >
          <CardContent>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2} columns={6}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="email-address"
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    defaultValue={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <p className="text-sm text-white text-center">
              Forgot Password? <a href="/">reset here</a>
            </p>
          </CardContent>
        </Card>
      </Grid>
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
    </Grid>
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
export default Login
