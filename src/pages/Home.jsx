import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button, Paper, useTheme, Box } from '@mui/material'
import image1 from '../assets/home/1.jpeg' // Replace with your image paths
import image2 from '../assets/home/2.jpeg'
import image3 from '../assets/home/3.jpeg'
import image4 from '../assets/home/4.jpeg' // Replace with your image paths
import image5 from '../assets/home/5.jpeg'
import image6 from '../assets/home/6.jpeg'

const Home = () => {
  const images = [image1, image2, image3, image4, image5, image6]
  const theme = useTheme()

  return (
    <Carousel autoPlay={true} indicators={true}>
      {images.map((image, index) => (
        <Item key={index}>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
          <Paper
            sx={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '10px',
              color: theme.palette.primary.contrastText,
            }}
          >
            <h2>Wolverine Dwell</h2>
            <p>
              Welcome to WolverineDwell, where student living meets comfort and
              convenience. We take pride in offering fully-furnished student
              housing options designed to cater to every need. Say farewell to
              the complexities of off-campus apartment searches and embrace a
              living experience focused on privacy, security, and ease. Tailored
              exclusively for students, our properties stand out with
              exceptional service, affordability, and unmatched comfort. Explore
              our diverse floor plans, and let WolverineDwell be your guide to
              finding the perfect home at UM Dearborn.
            </p>
          </Paper>
        </Item>
      ))}
    </Carousel>
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

export default Home
