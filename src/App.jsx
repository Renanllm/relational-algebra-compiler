import {
  Alert,
  Container,
  GlobalStyles,
  Grid,
  ThemeProvider,
} from "@mui/material";
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
      <GlobalStyles styles={{ body: { backgroundColor: "#E5E5E5" } }} />
      <EntitiesProvider>
        <Header />
        <Container maxWidth="lg" sx={{ padding: "0 48px" }}>
          <Grid container spacing={2} sx={{ marginTop: "50px" }}>
            <Grid item xs={3.7}>
              <EntityColumnsView />
            </Grid>
            <Grid item xs={8.3}>
              <Compiler />
            </Grid>
          </Grid>
          <Alert severity="warning" sx={{ marginTop: 5 }}>
            Estamos em beta :) por enquanto dê preferência as seguintes recomendações:
            <ul>
              <li>Nomes de entidades e colunas sem espaço e caractere especial;</li>
              <li>Criar tabelas temporárias para multiplas condicionais, como na operação de seleção, por exemplo;</li>
            </ul>
          </Alert>
        </Container>
      </EntitiesProvider>
    </ThemeProvider>
  );
}

export default App;
