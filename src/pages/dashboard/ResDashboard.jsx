import {
  Paper,
  Box,
  Stepper,
  Button,
  Divider,
  Grid,
  Card,
  StepLabel,
} from '@mui/material'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart'
import { useEffect } from 'react'
import { getDoc, doc, setDoc } from '@firebase/firestore'
import { db } from '../../utils/firebase'
import { useState } from 'react'
const ResDashboard = () => {
  const [info, setInfo] = useState([])
  const [messages, setMessages] = useState([])
  const data = [
    { label: 'Elecrtic', value: 140.7, color: '#FFBC00' },
    { label: 'Gas', value: 55.81, color: '#9CDDF1' },
  ]

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  }
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0)

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL
    return `${(percent * 100).toFixed(0)}% `
  }

  useEffect(() => {
    const getUserInfo = async () => {
      // Create a reference to the users collection
      const docRef = doc(db, 'users', localStorage.getItem('uid'))
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setInfo(docSnap.data())
        localStorage.setItem('aptId', docSnap.data()['aptId'])
      } else {
        console.log('No such document!')
      }
    }
    getUserInfo()
  }, [])

  return (
    <Paper elevation={5}>
      <Box sx={{ width: '100%', padding: '10px 20px' }}>
        <h2>Welcome, {info?.fname}</h2>
        <Divider />
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <Card
              elevation={2}
              style={{ background: '#FFFFFB', paddingLeft: '20px' }}
            >
              <h4>DTE Usage</h4>
              <PieChart
                series={[
                  {
                    data: data,
                    innerRadius: 40,
                    outerRadius: 80,
                    arcLabel: getArcLabel,
                  },
                ]}
                height={300}
                slotProps={{
                  legend: { hidden: true },
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              elevation={2}
              style={{
                marginRight: '40px',
                background: '#FFFFFB',
                height: '325px',
                padding: '20px',
                overflowY: 'scroll',
              }}
            >
              <h4>Messages</h4>
              <Card
                style={{
                  background: '#fafafa',
                  padding: '5px 20px',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
              >
                <b>Subject:</b> Welcome Letter!
              </Card>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              elevation={2}
              style={{
                background: '#FFFFFB',
                paddingLeft: '20px',
                marginRight: '40px',
              }}
            >
              <h3>General Information on Apt No: {info?.aptNo}</h3>
              <Grid container spacing={3} columns={12}>
                <Grid item xs={6}>
                  {info && info.roommates ? (
                    <p>Residents Living: {info.roommates.join(', ')}</p>
                  ) : (
                    <p>Loading residents list...</p>
                  )}
                  <p>
                    Lease Begin Date:{' '}
                    {info?.term ==
                    'School Year Term Only (01/01/2024 - 12/30/2025)'
                      ? '01/01/2024'
                      : '01/01/2024'}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p>Withstanding amount: $1,852.00</p>
                  <p>
                    Lease End Date:{' '}
                    {info?.term ==
                    'School Year Term Only (01/01/2024 - 12/30/2025)'
                      ? '12/30/2025'
                      : '12/30/2025'}
                  </p>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
export default ResDashboard
