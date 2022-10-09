export const defaultEntities = [
  {
    name: "ALUNO",
    columns: {
      cpfaluno: {
        primaryKey: true,
        type: "text",
        isRequired: true,
      },
      nomealuno: {
        type: "text",
        isRequired: true,
      },
      idadealuno: {
        type: "number",
        isRequired: false,
      },
      cursovinculado: {
        foreignKey: true,
        type: "number",
        isRequired: true,
        relationshipEntity: "CURSO",
      },
    },
    records: [
      {
        cpfaluno: "372.432.790-07",
        nomealuno: "Gabriel",
        idadealuno: 29,
        cursovinculado: 1,
      },
      {
        cpfaluno: "615.629.790-19",
        nomealuno: "Marcos",
        idadealuno: 36,
        cursovinculado: 3,
      },
      {
        cpfaluno: "641.250.420-63",
        nomealuno: "João",
        idadealuno: 32,
        cursovinculado: 1,
      },
      {
        cpfaluno: "187.240.310-70",
        nomealuno: "Fabiano",
        idadealuno: 24,
        cursovinculado: 2,
      },
    ],
    example: true,
  },
  {
    name: "CURSO",
    columns: {
      idcurso: {
        primaryKey: true,
        type: "number",
        isRequired: true,
      },
      nomecurso: {
        type: "text",
        isRequired: true,
      },
    },
    records: [
      {
        idcurso: 1,
        nomecurso: "Sistemas de Informação",
      },
      {
        idcurso: 2,
        nomecurso: "Jogos Digitais",
      },
      {
        idcurso: 3,
        nomecurso: "Arquitetura",
      },
      {
        idcurso: 4,
        nomecurso: "Administração",
      },
      {
        idcurso: 5,
        nomecurso: "Fisioterapia",
      },
      {
        idcurso: 6,
        nomecurso: "Filosofia",
      },
    ],
    example: true,
  },
  {
    name: "CIDADE",
    columns: {
      numerocidade: {
        primaryKey: true,
        type: "number",
        isRequired: true,
      },
      nomecidade: {
        type: "text",
        isRequired: true,
      },
    },
    records: [
      {
        numerocidade: 1,
        nomecidade: "CAMPINA GRANDE",
      },
      {
        numerocidade: 2,
        nomecidade: "JOÃO PESSOA",
      },
      {
        numerocidade: 3,
        nomecidade: "NATAL",
      },
      {
        numerocidade: 4,
        nomecidade: "RIO DE JANEIRO",
      },
      {
        numerocidade: 5,
        nomecidade: "SÃO PAULO",
      },
    ],
    example: true,
  },
  {
    name: "ESTADO",
    columns: {
      numeroestado: {
        primaryKey: true,
        type: "number",
        isRequired: true,
      },
      nomeestado: {
        type: "text",
        isRequired: true,
      },
    },
    records: [
      {
        numeroestado: 1,
        nomeestado: "PARAÍBA",
      },
      {
        numeroestado: 2,
        nomeestado: "RIO GRANDE DO NORTE",
      },
      {
        numeroestado: 3,
        nomeestado: "RIO GRANDE DO SUL",
      },
      {
        numeroestado: 4,
        nomeestado: "RIO DE JANEIRO",
      },
      {
        numeroestado: 5,
        nomeestado: "SÃO PAULO",
      },
    ],
    example: true,
  },
];
