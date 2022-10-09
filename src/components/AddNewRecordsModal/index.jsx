import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Typography
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
  width: "60%",
  minHeight: "50%",
  maxHeight: "90%",
  bgcolor: "background.main",
  borderRadius: 1,
  p: 4,
  overflow: "auto",
};

const getYupTemplateByColumnConstraints = (type, isRequired = false) => {
  const templateByTypeOptional = {
    text: yup.string("deve ser uma string"),
    number: yup.number("deve ser um número").typeError("deve ser um número"),
  };
  const templateByTypeRequired = {
    text: yup.string("deve ser uma string").required("campo obrigatório"),
    number: yup
      .number()
      .typeError("deve ser um número")
      .required("campo obrigatório"),
  };

  return isRequired
    ? templateByTypeRequired[type]
    : templateByTypeOptional[type];
};

export const AddNewRecordsModal = ({ open, entity = {}, handleClose }) => {
  const { entities = [], addEntity } = useEntities();
  const [alert, setAlert] = useState({ shouldShow: false, message: "" });

  const getValidationSchemaByEntityColumns = () => {
    const fieldsBasedOnEntityColumns = {};

    Object.keys(entity.columns).forEach((key) => {
      const column = entity.columns[key];

      fieldsBasedOnEntityColumns[key] = getYupTemplateByColumnConstraints(
        column.type,
        column.isRequired
      );
    });

    return yup.object({
      records: yup.array().of(yup.object().shape(fieldsBasedOnEntityColumns)),
    });
  };

  const isPrimaryKeyDuplicated = (values = []) => {
    const primaryKeyColumnName = Object.keys(entity.columns).find((key) => {
      const column = entity.columns[key];
      return column.primaryKey;
    });

    return [...entity.records, ...values].some((form, index, array) => {
      const primaryKeyValue = form[primaryKeyColumnName];
      let isPrimaryKeyDuplicated = false;

      array.forEach((field, i) => {
        if (index != i && field[primaryKeyColumnName] == primaryKeyValue) {
          isPrimaryKeyDuplicated = true;
        }
      });

      return isPrimaryKeyDuplicated;
    });
  };

  const isAllForeignKeyValuesInformedValid = (values) => {
    const foreignKeyColumnName = Object.keys(entity.columns).find((key) => {
      const column = entity.columns[key];
      return column.foreignKey;
    });

    if (!foreignKeyColumnName) {
      return true;
    }

    const foreignEntityName = entity.columns[foreignKeyColumnName].relationshipEntity;

    const foreignEntity = entities.find(ent => ent.name === foreignEntityName);
    const foreignEntityPrimaryKeyName = Object.keys(foreignEntity.columns).find(key => foreignEntity.columns[key].primaryKey);

    return values.every(form => {
      let isThereForeignKeyWithValueInformed = false;

      foreignEntity.records.forEach(record => {
        if (form[foreignKeyColumnName] == record[foreignEntityPrimaryKeyName]) {
          isThereForeignKeyWithValueInformed = true;
        }
      });

      return isThereForeignKeyWithValueInformed;
    });
  };

  const handleSubmit = (values) => {
    if (isPrimaryKeyDuplicated(values.records)) {
      setAlert({ shouldShow: true, message: 'Existem chaves primárias com valores duplicadas!' });
      return;
    }

    if (!isAllForeignKeyValuesInformedValid(values.records)) {
      setAlert({ shouldShow: true, message: 'Revise os valores da(s) chave(s) estrangeira(s)! Valor informado não encontrado!' });
      return;
    }

    entity.records = [...entity.records, ...values.records];

    addEntity(entity);
    closeModal();
  };

  const getColumnFormDefaultValues = () => {
    const formDefaultValues = {};

    Object.keys(entity?.columns).forEach((key) => {
      formDefaultValues[key] = "";
    });

    return formDefaultValues;
  };

  const formik = useFormik({
    initialValues: {
      records: [{ ...getColumnFormDefaultValues() }],
    },
    validationSchema: getValidationSchemaByEntityColumns(),
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
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            fontWeight={500}
            paddingBottom="16px"
          >
            Adicionar novos registros da entidade
          </Typography>

          <FieldArray
            name="records"
            render={({ remove, push }) => (
              <>
                {formik.values.records.length > 0 &&
                  formik.values.records.map((record, index) => (
                    <Grid
                      container
                      key={index}
                      spacing={2}
                      sx={{ paddingTop: "24px" }}
                    >
                      <Grid item xs={8}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 400 }}
                        >
                          {`Registro ${index + 1}`}
                        </Typography>
                      </Grid>

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

                      {Object.keys(entity?.columns).map((column, i) => (
                        <Grid key={`${column}-${i}`} item xs={4}>
                          <TextField
                            label={column}
                            name={`records.${index}.${column}`}
                            fullWidth
                            value={record[column]}
                            onChange={formik.handleChange}
                            error={
                              getIn(
                                formik.touched,
                                `records.${index}.${column}`
                              ) &&
                              Boolean(
                                getIn(
                                  formik.errors,
                                  `records.${index}.${column}`
                                )
                              )
                            }
                            helperText={
                              getIn(
                                formik.touched,
                                `records.${index}.${column}`
                              ) &&
                              getIn(formik.errors, `records.${index}.${column}`)
                            }
                          />
                        </Grid>
                      ))}

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
                    Salvar
                  </Button>

                  <Button
                    color="secondary"
                    variant="outlined"
                    type="button"
                    onClick={() => push(getColumnFormDefaultValues())}
                    sx={{ float: "right" }}
                  >
                    Adicionar novo registro
                  </Button>
                </Box>
              </>
            )}
          />
        </Box>

        <Snackbar
          open={alert.shouldShow}
          autoHideDuration={6000}
          onClose={() => setAlert((state) => ({ ...state, shouldShow: false }))}
        >
          <Alert
            onClose={() => setAlert((state) => ({ ...state, shouldShow: false }))}
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
