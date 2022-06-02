import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography'

const BreadCrumbs = () => {
  const location = useLocation()
  const paths = location.pathname.split("/").filter(x => x)


  const hoverStyle = {
    "&:hover": {
      color: "primary.main"
    }
  }

  return (
    <Breadcrumbs color="initial">
      {paths.map((path, i) =>
        paths.length - 1 === i ? (
          <Typography key={i}
            variant="body1"
            color="text.secondary"
            fontWeight={700}
            fontSize={16}
            textTransform="capitalize"
            sx={{ cursor: "default" }} >
            {path}
          </Typography>
        ) : (
          <Link key={i} to={location.pathname.split(path,-1)[0] + path} >
            <Typography
              variant="body1"
              color="initial"
              fontWeight={700}
              fontSize={16}
              textTransform="capitalize"
              sx={hoverStyle} >
              {path}
            </Typography>
          </Link>
        )
      )}
    </Breadcrumbs >
  )
}

export default BreadCrumbs