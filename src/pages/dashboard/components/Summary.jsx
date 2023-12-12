import {
  Box,
  Divider,
  Grid,
  Checkbox,
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
export function Summary({ onSubmit, data }) {
  const handleLocInfoSubmit = () => {
    onSubmit()
  }
  return (
    <Box
      style={{
        padding: '0px 50px',
      }}
    >
      <h2>Summary</h2>
      <p>Please verify the information filled.</p>
      <br />
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
          <b>Sociability</b>
          <p>{data?.sociability || '-'}</p>
        </Grid>
        <Grid item xs={6}>
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
      <Button variant="contained">Previous</Button>
      <Button
        className="rightBtn"
        variant="contained"
        disabled={false}
        onClick={() => handleLocInfoSubmit()}
      >
        Submit
      </Button>
    </Box>
  )
}
