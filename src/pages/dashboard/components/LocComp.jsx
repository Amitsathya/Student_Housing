import {
  Box,
  Divider,
  Grid,
  FormControl,
  RadioGroup,
  Button,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { useState } from 'react'
export function LocComp({ onLocInfoSubmit, data }) {
  const [term, setTerm] = useState(data?.term)
  const [fPlan, setFPlan] = useState(data?.fPlan)
  const handleLocInfoSubmit = () => {
    onLocInfoSubmit({ term, fPlan })
  }
  return (
    <Box
      style={{
        padding: '0px 50px',
      }}
    >
      <h2>Location</h2>
      <p>
        On this step you will select a term, a floor plan, a unit space type,
        and your desired optional amenities.
      </p>
      <Divider>1. Select your lease term</Divider>
      <FormControl>
        <RadioGroup
          aria-labelledby="term"
          defaultValue="null"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="Full Year Term Only (01/01/2024 - 12/30/2025)"
            control={
              <Radio
                checked={
                  term === 'Full Year Term Only (01/01/2024 - 12/30/2025)'
                }
              />
            }
            onChange={(event) => setTerm(event.target.value)}
            label="Wolverine Dwell: Full Year Term Only (01/01/2024 - 12/30/2025)"
          />
          <FormControlLabel
            value="School Year Term Only (01/01/2024 - 12/30/2025)"
            control={
              <Radio
                checked={
                  term === 'School Year Term Only (01/01/2024 - 12/30/2025)'
                }
              />
            }
            onChange={(event) => setTerm(event.target.value)}
            label="Wolverine Dwell: School Year Term Only (01/01/2024 - 12/30/2025)"
          />
        </RadioGroup>
      </FormControl>
      {(term === 'Full Year Term Only (01/01/2024 - 12/30/2025)' ||
        term === 'School Year Term Only (01/01/2024 - 12/30/2025)') && (
        <Divider>2. Select your floor plan</Divider>
      )}
      {term === 'Full Year Term Only (01/01/2024 - 12/30/2025)' && (
        <Grid container spacing={0} columns={12} alignItems="center">
          <Grid item xs={6}>
            <img
              src="src\assets\4b2b1130sqft.jpg"
              alt="4b2b1130sqft.jpg"
              style={{ width: '500px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  name="floorplanSelection"
                  value="Premier Suite (4 Berdoom, 2 Bath)"
                  checked={fPlan === 'Premier Suite (4 Berdoom, 2 Bath)'} // This line checks if the button is currently selected
                  onChange={() => setFPlan('Premier Suite (4 Berdoom, 2 Bath)')}
                />
              }
            />
          </Grid>
          <Grid item xs={1}>
            <h3>Rent</h3>
            <p>$795</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Premier Suite (4 Berdoom, 2 Bath)</h3>
            <p>4 Bedroom / 2 Bathroom 1130 Sq. Ft.</p>
          </Grid>

          <Grid item xs={6}>
            <img
              src="src\assets\4b4b1225sqft.png"
              alt="4b4b1225sqft.jpg"
              style={{ height: '500px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Radio
                  name="floorplanSelection"
                  value="Apartment Suite (4 Berdoom, 4 Bath)"
                  checked={fPlan === 'Apartment Suite (4 Berdoom, 4 Bath)'}
                  onChange={() =>
                    setFPlan('Apartment Suite (4 Berdoom, 4 Bath)')
                  }
                />
              }
            />
          </Grid>
          <Grid item xs={1}>
            <h3>Rent</h3>
            <p>$795</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Apartment Suite (4 Berdoom, 4 Bath)</h3>
            <p>4 Bedroom / 4 Bathroom 1225 Sq. Ft.</p>
          </Grid>
        </Grid>
      )}
      {term === 'School Year Term Only (01/01/2024 - 12/30/2025)' && (
        <Grid container spacing={0} columns={12} alignItems="center">
          <Grid item xs={6}>
            <img
              src="src\assets\4b4b1219sqft.jpg"
              alt="4b4b1219sqft.jpg"
              style={{ width: '500px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  name="floorplanSelection"
                  value="Rooftop Loft (4 Berdoom, 4 Bath)"
                  checked={fPlan === 'Rooftop Loft (4 Berdoom, 4 Bath)'}
                  onChange={() => setFPlan('Rooftop Loft (4 Berdoom, 4 Bath)')}
                />
              }
            />
          </Grid>
          <Grid item xs={1}>
            <h3>Rent</h3>
            <p>$795</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Rooftop Loft (4 Berdoom, 4 Bath)</h3>
            <p>4 Bedroom / 4 Bathroom 1219 Sq. Ft.</p>
          </Grid>

          <Grid item xs={6}>
            <img
              src="src\assets\4b2b1140sqft.jpg"
              alt="4b2b1140sqft.jpg"
              style={{ width: '500px' }}
            />
          </Grid>
          <Grid item xs={1}>
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  name="floorplanSelection"
                  value="Apartment Suite (4 Berdoom, 2 Bath)"
                  checked={fPlan === 'Apartment Suite (4 Berdoom, 2 Bath)'}
                  onChange={() =>
                    setFPlan('Apartment Suite (4 Berdoom, 2 Bath)')
                  }
                />
              }
            />
          </Grid>
          <Grid item xs={1}>
            <h3>Rent</h3>
            <p>$795</p>
          </Grid>
          <Grid item xs={4}>
            <h3>Apartment Suite (4 Berdoom, 2 Bath)</h3>
            <p>4 Bedroom / 2 Bathroom 1140 Sq. Ft.</p>
          </Grid>
        </Grid>
      )}
      <br />
      <Button variant="contained" disabled={true}>
        Previous
      </Button>
      <Button
        className="rightBtn"
        variant="contained"
        disabled={false}
        onClick={() => handleLocInfoSubmit()}
      >
        Next
      </Button>
    </Box>
  )
}
