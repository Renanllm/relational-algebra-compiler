import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NewEntityModal } from "../NewEntityModal";

export const Header = () => {
  const [openNewEntityModal, setOpenNewEntityModal] = useState(false);

  return (
    <>
      <Box
        sx={{
          height: "315px",
          width: "100%",
          position: "absolute",
          backgroundColor: "primary.main",
          zIndex: "-1",
        }}
      >
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ boxShadow: 0 }}>
          <Container>
            <Toolbar disableGutters={true}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Compilador de Álgebra Relacional
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => setOpenNewEntityModal(true)}
              >
                Nova Entidade
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <NewEntityModal
        open={openNewEntityModal}
        handleClose={() => setOpenNewEntityModal(false)}
      />
    </>
  );
};
