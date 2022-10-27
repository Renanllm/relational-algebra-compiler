import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useEntities } from "../../hooks/useEntities";
import { AddNewRecordsModal } from "../AddNewRecordsModal";
import { DropMenu } from "../DropMenu";
import { NewEntityModal } from "../NewEntityModal";
import { ViewEntityRecordsModal } from "../ViewEntityRecordsModal";

const TabPanel = (props) => {
  const { children, value, index, entities, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`entity-columns-tabpanel-${index}`}
      aria-labelledby={`entity-columns-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export const EntityColumnsView = () => {
  const { entities, deleteEntity } = useEntities();

  const [value, setValue] = useState(
    entities.some((entity) => !entity.example) ? 0 : 1
  );
  const [openAddNewRecordsModal, setOpenAddNewRecordsModal] = useState(false);
  const [openViewEntityRecordsModal, setOpenViewEntityRecordsModal] =
    useState(false);
  const [openNewEntityModal, setOpenNewEntityModal] = useState(false);
  const [entityChoosed, setEntityChoosed] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const renderColumns = (entities, canEdit) =>
    entities.map((entity) => {
      return (
        <Box sx={{ margin: "16px 0" }} key={entity.name}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 400 }} variant="h6">
              {entity.name}
            </Typography>

            {canEdit ? (
              <DropMenu
                handleAddRecords={() => {
                  setEntityChoosed(entity);
                  setOpenAddNewRecordsModal(true);
                }}
                handleEditEntity={() => {
                  setEntityChoosed(entity);
                  setOpenNewEntityModal(true);
                }}
                handleViewRecords={() => {
                  setEntityChoosed(entity);
                  setOpenViewEntityRecordsModal(true);
                }}
                handleDeleteEntity={() => deleteEntity(entity)}
              />
            ) : (
              <DropMenu
                handleViewRecords={() => {
                  setEntityChoosed(entity);
                  setOpenViewEntityRecordsModal(true);
                }}
              />
            )}
          </Box>
          {Object.keys(entity.columns).map((column, index) => (
            <Typography sx={{ padding: "0 16px" }} key={`${column}-${index}`}>
              {column} -{" "}
              <span style={{ fontSize: "13px" }}>
                {entity.columns[column].type === "text"
                  ? "string"
                  : entity.columns[column].type}
                {entity.columns[column]?.primaryKey && " - pk"}
                {entity.columns[column]?.foreignKey && " - fk"}
              </span>
            </Typography>
          ))}
        </Box>
      );
    });

  return (
    <>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#FFF",
          borderRadius: "5px",
          minHeight: "100%",
          maxHeight: "620px",
          overflow: "auto",
        }}
      >
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
            >
              <Tab wrapped label="Cadastradas" {...a11yProps(0)} />
              <Tab wrapped label="Temporárias" {...a11yProps(1)} />
              <Tab wrapped label="Exemplos" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Box sx={{ overflow: "auto" }}>
            <TabPanel value={value} index={0}>
              {renderColumns(
                entities.filter((entity) => !entity.example & !entity.variable),
                true
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {renderColumns(
                entities.filter((entity) => entity.variable),
                false
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {renderColumns(
                entities.filter((entity) => entity.example),
                false
              )}
            </TabPanel>
          </Box>
        </>
      </Box>

      {openAddNewRecordsModal && (
        <AddNewRecordsModal
          open={openAddNewRecordsModal}
          entity={entityChoosed}
          handleClose={() => {
            setEntityChoosed(null);
            setOpenAddNewRecordsModal(false);
          }}
        />
      )}

      {openViewEntityRecordsModal && (
        <ViewEntityRecordsModal
          open={openViewEntityRecordsModal}
          entity={entityChoosed}
          handleClose={() => {
            setEntityChoosed(null);
            setOpenViewEntityRecordsModal(false);
          }}
        />
      )}

      {openNewEntityModal && (
        <NewEntityModal
          open={openNewEntityModal}
          entity={entityChoosed}
          handleClose={() => {
            setEntityChoosed(null);
            setOpenNewEntityModal(false);
          }}
        />
      )}
    </>
  );
};
