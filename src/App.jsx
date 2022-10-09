import { Container, GlobalStyles, Grid, ThemeProvider, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Compiler } from "./components/Compiler";
import { EntityColumnsView } from "./components/EntityColumnsView";
import { Header } from "./components/Header";
import { EntitiesProvider } from "./hooks/useEntities";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#E5E5E5' } }} />
      <EntitiesProvider>
        <Header />
        <Container sx={{ padding: '0 48px' }}>
          <Grid container spacing={2} sx={{ marginTop: '50px' }}>
            <Grid item xs={3}>
              <EntityColumnsView />
            </Grid>
            <Grid item xs={9}>
              <Compiler />
            </Grid>
          </Grid>
        </Container>
      </EntitiesProvider>
    </ThemeProvider>
  );
}

export default App;
