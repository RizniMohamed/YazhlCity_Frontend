import { Box, Button, Card, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

const BoardingManagement = () => {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 5,
          ml: 1,
          mr: 1
        }}
      >
        <Grid item xs={8}>
          <Box
            component="span"
            sx={{
              textAlign: "left"
            }}
          >
            <Typography
              sx={{
                color: "Black",
                fontSize: 45,
                fontWeight: 1000,
                textAlign: 'left',
                mb: 2

              }}> Building Name </Typography>

            <table>
              <tr>
                <th>Owner Name</th>
                <td>:</td>
                <td>Sarujan</td>
              </tr>

              <tr>
                <th>Address</th>
                <td>:</td>
                <td>No.14,Jaffna mainroad,Jaffna</td>
              </tr>

              <tr>
                <th>Room Types</th>
                <td>:</td>
                <td>Single/Share</td>
              </tr>

              <tr>
                <th>Washrooms</th>
                <td>:</td>
                <td>2</td>
              </tr>

              <tr>
                <th>Bathrooms</th>
                <td>:</td>
                <td>3</td>
              </tr>

              <tr>
                <th>Rooms</th>
                <td>:</td>
                <td>10</td>
              </tr>
            </table>
            <strong>Description</strong>
            <div>
              a great rental listing includes an informative title and stellar description that properly describes your
              rental property. while it's easy to assume that tenants care more about the rental price, the photos, and
              location of an apartment, they also pay attention to the description. the rental listing description should
              complement the photos and other features of your listing while demonstrating you're a sophisticated landlord.
            </div>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            component="span"
            sx={{
              textAlign: "left",
            }}
          >
            <Card
              variant='outline'
              sx={{
                minHeight: 200,
                minWidth: 250,
                maxHeight: 250,
                maxWidth: 300,
                p: 2,
                mb: 2
              }}
            >
              Image
            </Card>
            <Card
              variant='outline'
              sx={{
                minHeight: 200,
                minWidth: 250,
                maxHeight: 250,
                maxWidth: 300,
                p: 2
              }}
            >
              <Typography
                sx={{
                  verticalAlign: 'middle'
                }}
              >

              </Typography>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        sx={{
          mt: 2
        }}
      >
        <Button
          variant="contained"
          size='small'
          sx={{
            color: "white",
            backgroundColor: 'black',
            fontSize: 16,
            fontWeight: 500,
            width: 150,
            ml: 2
          }}
        >Update </Button>
        <Button
          variant="contained"
          size='small'
          cols={2}
          sx={{
            color: "white",
            backgroundColor: 'black',
            fontSize: 16,
            fontWeight: 500,
            width: 150,
            ml: 2
          }}
        >Delete </Button>
      </Grid>
    </Container>
  )
}

export default BoardingManagement