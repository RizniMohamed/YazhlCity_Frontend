import { Paper, Typography } from "@mui/material";
import HelloRizni from "../Components/HelloRizni";
import Hi from "../Components/Hi" 

function App() {
  return (
   <Paper elevation={3} bgvolor="background.asd">
     <Typography variant="h1" color="initial">YAZHL CITY</Typography>
     <Hi/>
     <HelloRizni/>
   </Paper>
  );
}

export default App;
