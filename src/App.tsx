import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import Login from './components/Login';
const queryClient=new QueryClient();
function App() {

  return (
   <Container maxWidth="xl">
    <CssBaseline/>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          car shop
        </Typography>
      </Toolbar>
    </AppBar> 
    <QueryClientProvider client={queryClient}>
      <Login/>
    </QueryClientProvider>
   </Container>
  );
}

export default App
