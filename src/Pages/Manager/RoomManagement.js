import { Breadcrumbs, Button, Card, Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


const RoomManagement = () => {
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Rooms</Typography>
        <Typography color="text.secondary">Details</Typography>
      </Breadcrumbs>
      <Typography
        variant='h3'
      >
        Room No
        <Typography
          component='span'
          sx={{
            color: 'green',
            ml: 1
          }}
        >Available</Typography>
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        textAlign="left"
        sx={{
          mt: 2
        }}
      >
        <Grid items xs={8}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 2,
              mr: 5,
              ml: 5,
              mb: 2
            }}
          >
            <Grid items xs={4} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: 'black',
                  width: '80%'
                }}
                disabled
              >Matters </Button>
            </Grid>
            <Grid items xs={4} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: 'black',
                  width: '80%'
                }}
                disabled
              >Bed </Button>
            </Grid>
            <Grid items xs={4} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: 'black',
                  width: '80%'
                }}
              >Fan </Button>
            </Grid>
            <Grid items xs={4} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: 'black',
                  width: '80%'
                }}
              >Table </Button>
            </Grid>
            <Grid items xs={4} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                size='small'
                sx={{
                  color: "white",
                  backgroundColor: 'black',
                  width: '80%'
                }}
              >Chair </Button>
            </Grid>
          </Grid>
          <table>
            <tr>
              <th>Room Types</th>
              <td>:</td>
              <td>Single/Share</td>
            </tr>

            <tr>
              <th>Max Persons</th>
              <td>:</td>
              <td>10</td>
            </tr>

            <tr>
              <th>Available Persons</th>
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
        </Grid>
        <Grid items xs={4} sx={{ mt: 15 }}>
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
                mb: 2,
                ml: 2
              }}
            >

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

export default RoomManagement