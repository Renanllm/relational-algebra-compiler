import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export const DropMenu = ({
  handleViewRecords,
  handleAddRecords,
  handleEditEntity,
  handleDeleteEntity,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="medium" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {handleAddRecords && (
          <MenuItem
            onClick={() => {
              handleAddRecords();
              setAnchorEl(null);
            }}
          >
            <AddIcon fontSize="small" sx={{ marginRight: 1 }} />
            Adicionar registros
          </MenuItem>
        )}

        {handleViewRecords && (
          <MenuItem
            onClick={() => {
              handleViewRecords();
              setAnchorEl(null);
            }}
          >
            <SearchIcon fontSize="small" sx={{ marginRight: 1 }} />
            Visualizar registros
          </MenuItem>
        )}

        {handleEditEntity && (
          <MenuItem
            onClick={() => {
              handleEditEntity();
              setAnchorEl(null);
            }}
          >
            <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
            Editar entidade
          </MenuItem>
        )}

        {handleDeleteEntity && (
          <MenuItem
            onClick={() => {
              handleDeleteEntity();
              setAnchorEl(null);
            }}
          >
            <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
            Deletar entidade
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
