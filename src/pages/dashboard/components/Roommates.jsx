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
import { useState } from 'react'
import { sociabilityLabels, neatnessLabels } from '../../../assets/data'

export function Roommates({ onLocInfoSubmit, data }) {
  const sociabilities = sociabilityLabels
  const neatness = neatnessLabels
  const [formData, setFormData] = useState({
    school: data?.school,
    gender: data?.gender,
    school_year: data?.school_year,
    grad_date: data?.grad_date,
    sociability: data?.sociability,
    neat: data?.neat,
    hours_act: data?.hours_act,
    interests: data?.interests,
    international: data?.international,
  })

  const handleSubmit = (e) => {
    onLocInfoSubmit(formData)
  }

  const handleCheckboxChange = (event) => {
    if (event.target.name == 'interests') {
      const interest = event.target.value
      const updatedInterests = [...formData.interests]
      if (event.target.checked) {
        updatedInterests.push(interest)
      } else {
        const index = updatedInterests.indexOf(interest)
        updatedInterests.splice(index, 1)
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        interests: updatedInterests,
      }))
    } else {
      const hours_act = event.target.value
      const updatedhours_act = [...formData.hours_act]
      if (event.target.checked) {
        updatedhours_act.push(hours_act)
      } else {
        const index = updatedhours_act.indexOf(hours_act)
        updatedhours_act.splice(index, 1)
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        hours_act: updatedhours_act,
      }))
    }
  }

  return (
    <Box
      style={{
        padding: '0px 50px',
      }}
    >
      <h2>Roommates</h2>
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
      <Divider>INTERESTS</Divider>
      <p>
        The following questions will help us find your ideal room placement.
      </p>
      <Divider>General</Divider>
      <br />
      <form>
        <Grid container spacing={3} columns={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="school"
              label="What school/university do you currently attend?"
              name="school"
              type="text"
              required
              defaultValue={formData.school}
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
            <FormControl fullWidth>
              <InputLabel id="gender-label" required>
                Legal Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                fullWidth
                name="gender"
                value={formData.gender}
                label="gender"
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
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="school_year-label" required>
                What year in college will you be entering when the lease term
                begins?
              </InputLabel>
              <Select
                labelId="school_year-label"
                fullWidth
                name="school_year"
                value={formData.school_year}
                label="school_year"
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
                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                <MenuItem value={'Sophomore'}>Sophomore</MenuItem>
                <MenuItem value={'Junior'}>Junior</MenuItem>
                <MenuItem value={'Senior'}>Senior</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="grad_date"
              label="When do you expect to graduate from college?"
              name="grad_date"
              type="date"
              required
              defaultValue={formData.grad_date}
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
            <FormControl fullWidth>
              <InputLabel id="sociability-label" required>
                Sociability
              </InputLabel>
              <Select
                labelId="sociability-label"
                fullWidth
                name="sociability"
                value={formData.sociability}
                label="sociability"
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
                {sociabilities.map((sociability) => {
                  return (
                    <MenuItem key={sociability} value={sociability}>
                      {sociability}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="neat-label" required>
                Neatness
              </InputLabel>
              <Select
                labelId="neat-label"
                fullWidth
                name="neat"
                value={formData.neat}
                label="neat"
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
                {neatness.map((neat) => {
                  return (
                    <MenuItem key={neat} value={neat}>
                      {neat}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="hours_act-label" required>
              Hours of Activity
            </InputLabel>
            <FormControlLabel
              control={
                <Checkbox
                  name={'hours_act'}
                  checked={formData.hours_act.includes('Early riser')}
                  value={'Early riser'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Early riser"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'hours_act'}
                  checked={formData.hours_act.includes('Morning person')}
                  value={'Morning person'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Morning person"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'hours_act'}
                  checked={formData.hours_act.includes('Afternoon person')}
                  value={'Afternoon person'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Afternoon person"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'hours_act'}
                  checked={formData.hours_act.includes('Night owl')}
                  value={'Night owl'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Night owl"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="interest-label" required>
              Interests
            </InputLabel>
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Creative')}
                  value={'Creative'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Creative"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Outdoor Activities')}
                  value={'Outdoor Activities'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Outdoor Activities"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Technology')}
                  value={'Technology'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Technology"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Reading')}
                  value={'Reading'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Reading"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Learning')}
                  value={'Learning'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Learning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Socializing')}
                  value={'Socializing'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Socializing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Entertainment')}
                  value={'Entertainment'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Entertainment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Sports')}
                  value={'Sports'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Sports"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Health and Fitness')}
                  value={'Health and Fitness'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Health and Fitness"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name={'interests'}
                  checked={formData.interests.includes('Sustainability')}
                  value={'Sustainability'}
                  onChange={handleCheckboxChange}
                />
              }
              label="Sustainability"
            />
          </Grid>
          <Grid item xs={6}>
            <FormLabel id="international-label">
              Are you an international student?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="international-label"
              name="international"
              value={formData.international}
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
        </Grid>
      </form>
      <br />
      <Button variant="contained">Previous</Button>
      <Button
        className="rightBtn"
        variant="contained"
        disabled={false}
        onClick={() => handleSubmit()}
      >
        Next
      </Button>
    </Box>
  )
}
