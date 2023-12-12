import { Grid } from '@mui/material'

const FloorPlans = () => {
  return (
    <div className="fplan">
      <h1>Wolverine Dwell Floor Plans</h1>
      <p style={{ padding: '0px 400px' }}>
        Wolverine Dwell provides fully-furnished student housing, catering to
        diverse needs. Say goodbye to the hassle of searching for off-campus
        apartments. Our student apartments prioritize privacy, security, and
        convenience. Specifically crafted for students, our properties excel in
        service, affordability, and comfort. Explore our floor plans to see how
        Wolverine Dwell can assist you in finding your ideal home at UM
        Dearborn.
      </p>
      <Grid container spacing={0} columns={12}>
        <Grid item xs={6}>
          <img
            src="src\assets\PremierSuite.webp"
            alt="CH_PremierSuite.webp"
            className="fpimg"
          ></img>
        </Grid>
        <Grid item xs={6}>
          <h2 className="styleh2">Suite Style Premier</h2>
          <p>4 bedroom apartment with 4 full private bathrooms.</p>
          <Grid container spacing={0} columns={12}>
            <Grid item xs={3}>
              <h3>Rent Per Term</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Size of Apartment</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Residents Allowed</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Security Deposit</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>10 Installments</h3>
              <p>$1025</p>
            </Grid>
            <Grid item xs={3}>
              <h3>One Floor</h3> <p>1225 Square Feet</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Four</h3>
              <p> Per Unit</p>
            </Grid>
            <Grid item xs={3}>
              <h3>$0</h3>
              <p> That's Right</p>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  background: '#FFCB05',
                  margin: '20px 200px',
                  padding: '10px 0',
                  color: 'black',
                }}
              >
                <i>
                  <p>Available </p>
                  <p>January 8th, 2024</p>
                </i>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="amenities">
        Fully Furnished: Leather couches, coffee table, entertainment stand, 55”
        HDTV, kitchen table with 4 chairs, full sized bed, hypoallergenic
        mattress, dresser, desk, desk chair, study carrel with light. Free
        Laundry: Laundry facility located in every building. Off-Street Parking:
        Private, onsite, off-street parking is provided at no extra cost to
        residents. Utilities: All utilities included in rent - ask for details
        by contacting the leasing office. Password Protected Wifi: Protected
        network wifi included. Appliances: All units are supplied with
        full-sized appliances including a refrigerator, range/stove and garbage
        disposal.
      </div>
      <Grid container spacing={0} columns={12}>
        <Grid item xs={6}>
          <img
            src="src\assets\SuiteStyle.webp"
            alt="SuiteStyle.webp"
            style={{
              width: '516px',
              height: '391px',
              objectFit: 'cover',
              objectPosition: '50% 50%',
            }}
          ></img>
        </Grid>
        <Grid item xs={6}>
          <h2 className="styleh2">Suite Style Apartment</h2>
          <p>4 bedroom apartment with 2 full bathrooms.</p>
          <Grid container spacing={0} columns={12}>
            <Grid item xs={3}>
              <h3>Rent Per Term</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Size of Apartment</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Residents Allowed</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Security Deposit</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>12 Installments</h3>
              <p>$795</p>
            </Grid>
            <Grid item xs={3}>
              <h3>One Floor</h3> <p>1130 Square Feet</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Four</h3>
              <p> Per Unit</p>
            </Grid>
            <Grid item xs={3}>
              <h3>$0</h3>
              <p> That's Right</p>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  background: '#FFCB05',
                  margin: '20px 200px',
                  padding: '10px 0',
                  color: 'black',
                }}
              >
                <i>
                  <p>Available </p>
                  <p>January 8th, 2024</p>
                </i>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="amenities">
        Fully Furnished: Leather couches, coffee table, entertainment stand, 55”
        HDTV, kitchen table with 4 chairs, full sized bed, hypoallergenic
        mattress, dresser, desk, desk chair, study carrel with light. Free
        Laundry: Laundry facility located in every building. Off-Street Parking:
        Private, onsite, off-street parking is provided at no extra cost to
        residents. Utilities: All utilities included in rent - ask for details
        by contacting the leasing office. Password Protected Wifi: Protected
        network wifi included. Appliances: All units are supplied with
        full-sized appliances including a refrigerator, range/stove and garbage
        disposal.
      </div>
      <Grid container spacing={0} columns={12}>
        <Grid item xs={6}>
          <img
            src="src\assets\RoofTopLoft.webp"
            alt="RoofTopLoft.webp"
            className="fpimg"
          ></img>
        </Grid>
        <Grid item xs={6}>
          <h2 className="styleh2">Rooftop Lofts</h2>
          <p>
            4 bedroom apartments with your own private living space, bedroom and
            bathroom.
          </p>
          <Grid container spacing={0} columns={12}>
            <Grid item xs={3}>
              <h3>Rent Per Term</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Size of Apartment</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Residents Allowed</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>Security Deposit</h3>
            </Grid>
            <Grid item xs={3}>
              <h3>10 Installments</h3>
              <p>$890</p>
            </Grid>
            <Grid item xs={3}>
              <h3>One Floor</h3> <p>1130 Square Feet</p>
            </Grid>
            <Grid item xs={3}>
              <h3>Four</h3>
              <p> Per Unit</p>
            </Grid>
            <Grid item xs={3}>
              <h3>$0</h3>
              <p> That's Right</p>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  background: '#FFCB05',
                  margin: '20px 200px',
                  padding: '10px 0',
                  color: 'black',
                }}
              >
                <i>
                  <p>Available </p>
                  <p>January 8th, 2024</p>
                </i>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className="amenities">
        Fully Furnished: Leather couches, coffee table, entertainment stand, 55”
        HDTV, kitchen table with 4 chairs, full sized bed, hypoallergenic
        mattress, dresser, desk, desk chair, study carrel with light. Free
        Laundry: Laundry facility located in every building. Off-Street Parking:
        Private, onsite, off-street parking is provided at no extra cost to
        residents. Utilities: All utilities included in rent - ask for details
        by contacting the leasing office. Password Protected Wifi: Protected
        network wifi included. Appliances: All units are supplied with
        full-sized appliances including a refrigerator, range/stove and garbage
        disposal.
      </div>
    </div>
  )
}
export default FloorPlans
