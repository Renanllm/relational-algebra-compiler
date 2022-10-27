import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FieldArray, FormikProvider, getIn, useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useEntities } from "../../hooks/useEntities";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minHeight: "50%",
  maxHeight: "90%",
  bgcolor: "background.main",
  borderRadius: 1,
  p: 4,
  overflow: "auto",
};

const validationSchema = yup.object({
  name: yup
    .string("Adicione o nome da entidade")
    .trim()
    .min(3, "Mínimo de 3 caracteres")
    .max(150, "Máximo de 150 caracteres")
    .required("Esse campo é obrigatório"),
  columns: yup.array().of(
    yup.object().shape({
      columnName: yup
        .string("Adicione o nome da coluna")
        .trim()
        .min(2, "Mínimo de 2 caracteres")
        .max(150, "Máximo de 150 caracteres")
        .required("Esse campo é obrigatório"),
      columnType: yup.string().required("Esse campo é obrigatório"),
      isRequiredColumn: yup.boolean().required("Esse campo é obrigatório"),
      isPrimaryKey: yup.boolean().required("Esse campo é obrigatório"),
      isForeignKey: yup.boolean().required("Esse campo é obrigatório"),
      relationshipEntity: yup.string().when("isForeignKey", {
        is: true,
        then: yup.string().required("Esse campo é obrigatório"),
        otherwise: yup.string(),
      }),
    })
  ),
});

const messages = {
  primaryKeyError: `É necessário ao menos uma coluna como chave primária para criar uma
  entidade!`,
};

export const NewEntityModal = ({ open, handleClose, entity }) => {
  const { entities = [], addEntity, updateEntity } = useEntities();
  const [alert, setAlert] = useState({ open: false, message: "" });

  const handleSubmit = (values) => {
    const isPrimaryKeyOnColumns = values.columns.some(
      (column) => column.isPrimaryKey
    );

    if (formik.isValid && isPrimaryKeyOnColumns) {
      const entityToAdd = {
        name: values.name.toUpperCase(),
        columns: {},
        records: [],
      };

      values.columns.forEach((columnGroup) => {
        const column = {
          isRequired: columnGroup.isRequiredColumn,
          type: columnGroup.columnType,
        };

        if (columnGroup.isPrimaryKey) {
          column.primaryKey = true;
        }

        if (columnGroup.isForeignKey) {
          column.foreignKey = true;
          column.relationshipEntity = columnGroup.relationshipEntity;
        }

        entityToAdd.columns[columnGroup.columnName.toLowerCase()] = column;
      });

      try {
        if (entity) {
          updateEntity(entityToAdd, entity);
        } else {
          addEntity(entityToAdd);
        }

        closeModal();
      } catch (error) {
        setAlert({ open: true, message: error.message });
      }
    } else {
      setAlert({ open: true, message: messages.primaryKeyError });
    }
  };

  const getColumnFormDefaultValues = () => ({
    columnName: "",
    columnType: "text",
    isRequiredColumn: false,
    isPrimaryKey: false,
    isForeignKey: false,
    relationshipEntity: "",
  });

  const getInitialValues = () => {
    if (!entity) {
      return {
        name: "",
        columns: [{ ...getColumnFormDefaultValues() }],
      };
    }

    const formValues = {
      name: entity.name,
      columns: Object.keys(entity.columns).map((key) => {
        const column = entity.columns[key];

        return {
          columnName: key,
          columnType: column.type,
          isRequiredColumn: column.isRequired,
          isPrimaryKey: Boolean(column.primaryKey),
          isForeignKey: Boolean(column.foreignKey),
          relationshipEntity: column.relationshipEntity,
        };
      }),
    };

    return formValues;
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const closeModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FormikProvider value={formik}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={style}
          autoComplete="off"
        >
          {entity && (
            <Alert severity="warning" sx={{ marginBottom: 3 }}>
              Cuidado: Ao editar uma entidade todos os registros associados
              serão perdidos!
            </Alert>
          )}

          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            fontWeight={500}
            paddingBottom="16px"
          >
            Criação de nova entidade
          </Typography>

          <TextField
            label="Nome da entidade"
            name="name"
            sx={{
              width: "100%",
            }}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <FieldArray
            name="columns"
            render={({ remove, push }) => (
              <>
                {formik.values.columns.length > 0 &&
                  formik.values.columns.map((column, index) => (
                    <Grid
                      container
                      key={index}
                      spacing={3}
                      sx={{ paddingTop: "24px" }}
                    >
                      <Grid item xs={8}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 400 }}
                        >
                          {`Coluna ${index + 1}`}
                        </Typography>
                      </Grid>

                      {index > 0 && (
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              remove(index);
                            }}
                            sx={{
                              float: "right",
                              minWidth: 0,
                              padding: "6px 10px",
                            }}
                          >
                            <DeleteIcon
                              sx={{ width: "1.3em", height: "1.3em" }}
                              fontSize="40px"
                              color="background"
                            />
                          </Button>
                        </Grid>
                      )}

                      <Grid item xs={6}>
                        <TextField
                          label="Nome da coluna"
                          name={`columns.${index}.columnName`}
                          fullWidth
                          value={column.columnName}
                          onChange={formik.handleChange}
                          error={
                            getIn(
                              formik.touched,
                              `columns.${index}.columnName`
                            ) &&
                            Boolean(
                              getIn(
                                formik.errors,
                                `columns.${index}.columnName`
                              )
                            )
                          }
                          helperText={
                            getIn(
                              formik.touched,
                              `columns.${index}.columnName`
                            ) &&
                            getIn(formik.errors, `columns.${index}.columnName`)
                          }
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="column-type-select-label">
                            Tipo da coluna
                          </InputLabel>
                          <Select
                            labelId="column-type-select-label"
                            id="column-type-select"
                            label="Tipo da coluna"
                            name={`columns.${index}.columnType`}
                            value={column.columnType}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={"text"}>String</MenuItem>
                            <MenuItem value={"number"}>Number</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl>
                          <FormControlLabel
                            control={
                              <Switch
                                name={`columns.${index}.isRequiredColumn`}
                                checked={column.isRequiredColumn}
                                disabled={column.isPrimaryKey}
                                onChange={formik.handleChange}
                              />
                            }
                            label="Coluna obrigatória"
                          />
                        </FormControl>

                        <FormControl>
                          <FormControlLabel
                            control={
                              <Switch
                                name={`columns.${index}.isPrimaryKey`}
                                checked={column.isPrimaryKey}
                                onChange={(e) => {
                                  const futureValue = e.target.value != "true";
                                  if (futureValue) {
                                    formik.setFieldValue(
                                      `columns.${index}.isRequiredColumn`,
                                      true,
                                      false
                                    );
                                  }
                                  formik.handleChange(e);
                                }}
                              />
                            }
                            label="Chave primária"
                          />
                        </FormControl>

                        <FormControl>
                          <FormControlLabel
                            control={
                              <Switch
                                name={`columns.${index}.isForeignKey`}
                                checked={column.isForeignKey}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `columns.${index}.relationshipEntity`,
                                    ""
                                  );
                                  formik.handleChange(e);
                                }}
                              />
                            }
                            label="Chave estrangeira"
                          />
                        </FormControl>
                      </Grid>

                      {column.isForeignKey && (
                        <Grid item xs={12}>
                          <FormControl
                            fullWidth
                            error={
                              getIn(
                                formik.touched,
                                `columns.${index}.relationshipEntity`
                              ) &&
                              Boolean(
                                getIn(
                                  formik.errors,
                                  `columns.${index}.relationshipEntity`
                                )
                              )
                            }
                          >
                            <InputLabel id="column-relationship-select-label">
                              Entidade para relacionamento
                            </InputLabel>
                            <Select
                              labelId="column-relationship-select-label"
                              id="column-relationship-select"
                              name={`columns.${index}.relationshipEntity`}
                              label="Entidade para relacionamento"
                              value={column.relationshipEntity}
                              onChange={formik.handleChange}
                            >
                              <MenuItem value={""} defaultValue></MenuItem>
                              {entities.map((entity) => (
                                <MenuItem key={entity.name} value={entity.name}>
                                  {entity.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {getIn(
                              formik.touched,
                              `columns.${index}.relationshipEntity`
                            ) &&
                              Boolean(
                                getIn(
                                  formik.errors,
                                  `columns.${index}.relationshipEntity`
                                )
                              ) && (
                                <FormHelperText>
                                  {getIn(
                                    formik.errors,
                                    `columns.${index}.relationshipEntity`
                                  )}
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  ))}

                <Box sx={{ padding: "24px 0" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    sx={{ marginLeft: 2, float: "right" }}
                  >
                    {entity ? "Editar entidade" : "Criar entidade"}
                  </Button>

                  <Button
                    color="secondary"
                    variant="outlined"
                    type="button"
                    onClick={() => push(getColumnFormDefaultValues())}
                    sx={{ float: "right" }}
                  >
                    Adicionar nova coluna
                  </Button>
                </Box>
              </>
            )}
          />
        </Box>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert((state) => ({ ...state, open: false }))}
        >
          <Alert
            onClose={() => setAlert((state) => ({ ...state, open: false }))}
            severity="error"
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </FormikProvider>
    </Modal>
  );
};
