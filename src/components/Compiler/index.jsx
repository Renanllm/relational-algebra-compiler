import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Link,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { useRef, useState } from "react";
import { useEntities } from "../../hooks/useEntities";
import { compile } from "../../services/compiler";
import { EntityTableView } from "../EntityTableView";

const operationAvailableExamples = [
  {
    operation: "Seleção: ",
    symbol: "σ",
    example: "σ IdadeAluno > 28 (ALUNO)",
    tooltip: "σ condição (ENTIDADE)"
  },
  {
    operation: "Atribuição: ",
    icon: <ArrowBackIcon />,
    symbol: '<-',
    example: "RESULT <- σ NomeAluno = 'Fabiano' (ALUNO)",
    tooltip: "NOME_VARIAVEL <- expressão"
  },
  {
    operation: "Projeção: ",
    symbol: "π",
    example: "π NomeAluno, CursoVinculado (ALUNO)",
    tooltip: "π Coluna1, Coluna2... (ENTIDADE)"
  },
  {
    operation: "União: ",
    symbol: "∪",
    example: "CIDADE ∪ ESTADO",
    tooltip: "ENTIDADE1 ∪ ENTIDADE2"
  },
  {
    operation: "Intersecção: ",
    symbol: "∩",
    example: "CIDADE ∩ ESTADO",
    tooltip: "ENTIDADE1 ∩ ENTIDADE2",
  },
  {
    operation: "Diferença: ",
    symbol: "-",
    example: "CIDADE - ESTADO",
    tooltip: "ENTIDADE1 - ENTIDADE2",
  },
  {
    operation: "Junção: ",
    symbol: "⨝",
    example: "ALUNO ⨝ CursoVinculado = IdCurso CURSO",
    tooltip: "ENTIDADE1 ⨝ Chave_estrangeira = Chave_primaria ENTIDADE2",
  },
  {
    operation: "Produto cartesiano: ",
    symbol: "X",
    example: "ALUNO X CURSO",
    tooltip: "ENTIDADE1 X ENTIDADE2",
  },
];

export const Compiler = () => {
  const [entityResulted, setEntityResulted] = useState({});
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const { entities, addEntity } = useEntities();

  const saveEntityIfThereIsVariable = (result) => {
    if (result?.variable) {
      addEntity(result);
    }
  }

  const handleCompileAction = () => {
    try {
      const result = compile(inputValue, entities);
      saveEntityIfThereIsVariable(result);
      setEntityResulted({
        kind: "success",
        message: "Sucesso! :)",
        result,
      });
    } catch (error) {
      setEntityResulted({
        kind: "error",
        message: error.message,
        result: null,
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFF",
          borderRadius: 1,
          padding: 2,
          marginBottom: "60px",
        }}
      >
        <Box sx={{ p: 1, background: "#969CB2", borderRadius: 1 }}>
          <ButtonGroup
            sx={{ gap: "5px" }}
            variant="text"
            aria-label="operations group"
          >
            {operationAvailableExamples.map((operation) => (
              <Tooltip
                title={operation.tooltip}
                key={`${operation.symbol} button`}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="neutral"
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "100%",
                    fontFamily: "'Noto Sans Math', sans-serif",
                  }}
                  onClick={() => {
                    setInputValue((state) => state + operation.symbol);
                    inputRef.current.focus();
                  }}
                >
                  {operation.icon ?? operation.symbol}
                </Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </Box>

        <Box
          component="form"
          sx={{ display: "flex", gap: 2, marginTop: 2 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Expressão"
            sx={{
              width: "100%",
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCompileAction();
              }
            }}
            InputProps={{
              style: { fontFamily: "'Noto Sans Math', sans-serif" },
            }}
            inputRef={inputRef}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCompileAction}
          >
            Compilar
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#FFF",
          borderRadius: 1,
          padding: 2,
          height: "400px",
          overflow: "auto",
        }}
      >
        {entityResulted?.kind == "error" && (
          <Typography
            variant="h6"
            sx={{
              color: "primary.red",
              marginTop: 1,
            }}
          >
            {entityResulted.message}
          </Typography>
        )}

        {entityResulted?.kind === 'success' && (
          <EntityTableView entity={entityResulted.result} />
        )}

        <Box sx={{ marginTop: 3 }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Exemplos</Typography>
            </AccordionSummary>
            {operationAvailableExamples.map((operationExample) => (
              <AccordionDetails key={`${operationExample?.operation} example`}>
                <Typography>
                  {operationExample.operation}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setInputValue(operationExample.example)}
                    sx={{ fontSize: 16 }}
                  >
                    {operationExample.example}
                  </Link>
                </Typography>
              </AccordionDetails>
            ))}
          </Accordion>
        </Box>
      </Box>
    </>
  );
};
