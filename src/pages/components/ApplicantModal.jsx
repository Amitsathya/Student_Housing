import React from 'react'
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
import { setDoc, doc } from '@firebase/firestore'
import { db } from '../../utils/firebase'

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

export function ApplicantModal({ open, setOpen, data }) {
  const handleLocInfoSubmit = async () => {
    try {
      await setDoc(doc(db, 'users', data?.id), {
        ...data,
        type: 3,
      })
      setOpen(false)
    } catch (error) {
      console.error(error.code, error.message)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h3>Applicant Details</h3>
        <p></p>
        <Divider>Location</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <b>Term</b>
            <p>{data?.term || '-'}</p>
          </Grid>
          <Grid item xs={6}>
            <b>Floor Plan</b>
            <p>{data?.fPlan || '-'}</p>
          </Grid>
        </Grid>
        <Divider>Basic Information</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <b>Legal First Name</b>
            <p>{data?.fname || '-'}</p>
            <b>Middle Name</b>
            <p>{data?.mname || '-'}</p>
            <b>Last Name</b>
            <p>{data?.lname || '-'}</p>
          </Grid>
          <Grid item xs={6}>
            <b>Phone Number</b>
            <p>{data?.number || '-'}</p>
            <b>Email Address</b>
            <p>{data?.email || '-'}</p>
            <b>Birth Data</b>
            <p>{data?.bdate || '-'}</p>
          </Grid>
        </Grid>
        <Divider>Additional Information</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <b>Country</b>
            <p>{data?.country || '-'}</p>
            <b>State</b>
            <p>{data?.state || '-'}</p>
            <b>Address 1</b>
            <p>{data?.add1 || '-'}</p>
            <b>Address 2</b>
            <p>{data?.add2 || '-'}</p>
          </Grid>
          <Grid item xs={6}>
            <b>Address 3</b>
            <p>{data?.add3 || '-'}</p>
            <b>City</b>
            <p>{data?.city || '-'}</p>
            <b>Do you have a vehicle? </b>
            <p>{data?.vehicle || '-'}</p>
            <b>Vehicle Number</b>
            <p>{data?.vehicle_no || '-'}</p>
          </Grid>
        </Grid>
        <Divider>Roommates</Divider>
        <br />
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <b>What school/university do you currently attend?</b>
            <p>{data?.school || '-'}</p>
            <b>Legal Gender</b>
            <p>{data?.gender || '-'}</p>
            <b>
              What year in college will you be entering when the lease term
              begins?
            </b>
            <p>{data?.school_year || '-'}</p>
            <b>When do you expect to graduate from college?</b>
            <p>{data?.grad_date || '-'}</p>
          </Grid>
          <Grid item xs={6}>
            <b>Sociability</b>
            <p>{data?.sociability || '-'}</p>
            <b>Neatness</b>
            <p>{data?.neat || '-'}</p>
            <b>Hours of Activity </b>
            <p>{data?.hours_act || '-'}</p>
            <b>Interests </b>
            <p>{data?.interests || '-'}</p>
            <b>Are you an international student?</b>
            <p>{data?.international || '-'}</p>
          </Grid>
        </Grid>
        <Button
          className="rightBtn"
          variant="contained"
          disabled={false}
          onClick={() => handleLocInfoSubmit()}
        >
          Approve
        </Button>
      </Box>
    </Modal>
  )
}
