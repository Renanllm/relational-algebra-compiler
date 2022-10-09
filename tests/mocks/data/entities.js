const entityExample1 = {
  name: "FUNCIONARIO",
  columns: {
    cpf: {
      primaryKey: true,
      type: "text",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
    cargo: {
      type: "text",
      isRequired: true,
    },
    idade: {
      type: "number",
      isRequired: false,
    },
    depart: {
      foreignKey: true,
      type: "number",
      isRequired: true,
      relationshipEntity: "DEPARTAMENTO"
    },
  },
  records: [
    {
      cpf: "79545130091",
      nome: "Gabriel",
      cargo: "Analista",
      idade: 29,
      depart: 1,
    },
    {
      cpf: "09989176051",
      nome: "Marcos",
      cargo: "Contador",
      idade: 36,
      depart: 3,
    },
    {
      cpf: "28940848039",
      nome: "João",
      cargo: "Gerente",
      idade: 32,
      depart: 1,
    },
    {
      cpf: "40201982099",
      nome: "Fabiano",
      cargo: "Analista",
      idade: 24,
      depart: 2,
    },
  ],
};

const entityExample2 = {
  name: "DEPARTAMENTO",
  columns: {
    numero: {
      primaryKey: true,
      type: "number",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
    tipo: {
      type: "text",
      isRequired: true,
    },
  },
  records: [
    {
      numero: "1",
      nome: "Dep 01",
      tipo: "Produtos",
    },
    {
      numero: "2",
      nome: "Dep 02",
      tipo: "Publicidade",
    },
    {
      numero: "3",
      nome: "Dep 03",
      tipo: "Financeiro",
    },
  ],
};

const entityExample3 = {
  name: "SETOR",
  columns: {
    numero: {
      primaryKey: true,
      type: "number",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
    classificacao: {
      type: "text",
      isRequired: true,
    },
  },
  records: [
    {
      numero: "1",
      nome: "SETOR 01",
      classificacao: "PRIORIDADE",
    },
    {
      numero: "2",
      nome: "SETOR 02",
      classificacao: "MODERADA",
    },
    {
      numero: "3",
      nome: "SETOR 03",
      classificacao: "LEVE",
    },
  ],
};

const entityExample4 = {
  name: "CIDADE",
  columns: {
    numero: {
      primaryKey: true,
      type: "number",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
  },
  records: [
    {
      numero: "1",
      nome: "CAMPINA GRANDE",
    },
    {
      numero: "2",
      nome: "JOÃO PESSOA",
    },
    {
      numero: "3",
      nome: "NATAL",
    },
  ],
};

const entityExample5 = {
  name: "LOCALIZACAO-EMPRESA",
  columns: {
    numero: {
      primaryKey: true,
      type: "number",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
    cidade: {
      type: 'text',
      isRequired: true,
    }
  },
  records: [
    {
      numero: "1",
      nome: "EMPRESA 01",
      cidade: "CAMPINA GRANDE",
    },
    {
      numero: "2",
      nome: "EMPRESA 02",
      cidade: "JOÃO PESSOA",
    },
  ],
};


const entityExample6 = {
  name: "CAPITAL",
  columns: {
    numero: {
      primaryKey: true,
      type: "number",
      isRequired: true,
    },
    nome: {
      type: "text",
      isRequired: true,
    },
  },
  records: [
    {
      numero: "1",
      nome: "ESPÍRITO SANTO",
    },
    {
      numero: "2",
      nome: "JOÃO PESSOA",
    },
    {
      numero: "3",
      nome: "NATAL",
    },
    {
      numero: "4",
      nome: "BAHIA",
    },
  ],
};

export const entities = [entityExample1, entityExample2, entityExample3, entityExample4, entityExample5, entityExample6];