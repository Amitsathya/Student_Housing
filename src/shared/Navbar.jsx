import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../App.jsx'
import { Grid, Menu, MenuItem, Button, Avatar, IconButton } from '@mui/material'

export default function VariableWidthGrid() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { setAuthenticated } = useContext(AuthContext)
  const open = Boolean(anchorEl)
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    navigate('/')
    localStorage.clear()
    localStorage.setItem('userType', 1)
    setAuthenticated('1')
  }
  const { authenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = (path) => {
    navigate(path)
  }

  const buttons = {
    1: [
      { path: '/', label: 'Dearborn' },
      // { path: '/amenities', label: 'Amenities' },
      { path: '/floorplans', label: 'Floor Plans' },
      { path: '/register', label: 'applynow' },
      { path: '/login', label: 'Resident Portal' },
    ],
    2: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/payment', label: 'Payment' },
      { path: '/maintenance', label: 'Maintenance' },
    ],
    0: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/maintenance', label: 'Maintenance' },
    ],
  }

  return (
    <Grid
      className="navbar"
      container
      spacing={2}
      columns={16}
      style={{ height: '60px', paddingTop: '15px', paddingLeft: '20px' }}
    >
      <Grid xs={3}>
        <img
          alt="Remy Sharp"
          src="./src/assets/UM_Logo.png"
          style={{ width: '50px' }}
        />
      </Grid>
      <Grid xs={11}>
        <Grid container spacing={1} style={{ justifyContent: 'center' }}>
          {Object.entries(buttons).map(([key, buttons]) => {
            if (key === authenticated) {
              return buttons.map((button) => (
                <Button
                  key={button.path}
                  type="button"
                  onClick={() => handleClick(button.path)}
                >
                  {button.label}
                </Button>
              ))
            }
          })}
        </Grid>
      </Grid>
      <Grid xs={2}>
        {authenticated == '2' || authenticated == '0' ? (
          <IconButton
            onClick={handleMenuClick}
            id="basic-button"
            size="small"
            style={{ top: '0', float: 'right' }}
            sx={{ ml: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        ) : null}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )
}
