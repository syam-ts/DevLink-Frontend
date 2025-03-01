import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from './assets/global/Theme-variable.tsx'
import Themeroutes from './routes/Router.tsx' 


function index() {

  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <div>
        <ThemeProvider theme={theme}> 
           {routing} 
        </ThemeProvider>

    </div>
  )
}

export default index