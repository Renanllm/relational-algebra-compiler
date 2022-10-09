import { compile } from "../../../src/services/compiler";
import { entities } from "../../mocks/data/entities";

describe("Main tests", () => {
  describe("success cases", () => {
    it("selection expression", () => {
      expect(compile(`σ Depart > '1' (FUNCIONARIO)`, entities)).toEqual({
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
            relationshipEntity: "DEPARTAMENTO",
          },
        },
        records: [
          {
            cpf: "09989176051",
            nome: "Marcos",
            cargo: "Contador",
            idade: 36,
            depart: 3,
          },
          {
            cpf: "40201982099",
            nome: "Fabiano",
            cargo: "Analista",
            idade: 24,
            depart: 2,
          },
        ],
      });
    });

    it("projection expression", () => {
      expect(compile("π Cpf, Nome (FUNCIONARIO)", entities)).toEqual({
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
        },
        records: [
          {
            cpf: "79545130091",
            nome: "Gabriel",
          },
          {
            cpf: "09989176051",
            nome: "Marcos",
          },
          {
            cpf: "28940848039",
            nome: "João",
          },
          {
            cpf: "40201982099",
            nome: "Fabiano",
          },
        ],
      });
    });

    it("union expression", () => {
      expect(compile("SETOR ∪ DEPARTAMENTO", entities)).toEqual({
        name: "SETOR_DEPARTAMENTO",
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
          {
            numero: "1",
            nome: "Dep 01",
            classificacao: "Produtos",
          },
          {
            numero: "2",
            nome: "Dep 02",
            classificacao: "Publicidade",
          },
          {
            numero: "3",
            nome: "Dep 03",
            classificacao: "Financeiro",
          },
        ],
      });
    });

    it("intersection expression", () => {
      expect(compile("CIDADE ∩ CAPITAL", entities)).toEqual({
        name: "CIDADE_CAPITAL",
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
            numero: "2",
            nome: "JOÃO PESSOA",
          },
          {
            numero: "3",
            nome: "NATAL",
          },
        ],
      });
    });

    it("difference expression", () => {
      expect(compile("CIDADE - CAPITAL", entities)).toEqual({
        name: "CIDADE_CAPITAL",
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
        ],
      });
    });

    it("difference expression with variable", () => {
      expect(compile("RESULT <- CIDADE - CAPITAL", entities)).toEqual({
        name: "RESULT",
        variable: true,
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
        ],
      });
    });

    it("junction expression", () => {
      expect(
        compile("FUNCIONARIO ⨝ Depart = Numero DEPARTAMENTO", entities)
      ).toEqual({
        name: "FUNCIONARIO_DEPARTAMENTO",
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
            relationshipEntity: "DEPARTAMENTO",
          },
          numero: {
            primaryKey: true,
            type: "number",
            isRequired: true,
          },
          tipo: {
            type: "text",
            isRequired: true,
          },
        },
        records: [
          {
            cpf: "79545130091",
            cargo: "Analista",
            idade: 29,
            depart: 1,
            numero: "1",
            nome: "Dep 01",
            tipo: "Produtos",
          },
          {
            cpf: "09989176051",
            cargo: "Contador",
            idade: 36,
            depart: 3,
            numero: "3",
            nome: "Dep 03",
            tipo: "Financeiro",
          },
          {
            cpf: "28940848039",
            cargo: "Gerente",
            idade: 32,
            depart: 1,
            numero: "1",
            nome: "Dep 01",
            tipo: "Produtos",
          },
          {
            cpf: "40201982099",
            cargo: "Analista",
            idade: 24,
            depart: 2,
            numero: "2",
            nome: "Dep 02",
            tipo: "Publicidade",
          },
        ],
      });
    });

    it("cartesian product expression", () => {
      expect(
        compile("FUNCIONARIO X DEPARTAMENTO", entities)
      ).toEqual({
        name: "FUNCIONARIO_DEPARTAMENTO",
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
            relationshipEntity: "DEPARTAMENTO",
          },
          numero: {
            primaryKey: true,
            type: "number",
            isRequired: true,
          },
          tipo: {
            type: "text",
            isRequired: true,
          },
        },
        records: [
          {
            cpf: '79545130091',
            nome: 'Dep 01',
            cargo: 'Analista',
            idade: 29,
            depart: 1,
            numero: '1',
            tipo: 'Produtos'
          },
          {
            cpf: '79545130091',
            nome: 'Dep 02',
            cargo: 'Analista',
            idade: 29,
            depart: 1,
            numero: '2',
            tipo: 'Publicidade'
          },
          {
            cpf: '79545130091',
            nome: 'Dep 03',
            cargo: 'Analista',
            idade: 29,
            depart: 1,
            numero: '3',
            tipo: 'Financeiro'
          },
          {
            cpf: '09989176051',
            nome: 'Dep 01',
            cargo: 'Contador',
            idade: 36,
            depart: 3,
            numero: '1',
            tipo: 'Produtos'
          },
          {
            cpf: '09989176051',
            nome: 'Dep 02',
            cargo: 'Contador',
            idade: 36,
            depart: 3,
            numero: '2',
            tipo: 'Publicidade'
          },
          {
            cpf: '09989176051',
            nome: 'Dep 03',
            cargo: 'Contador',
            idade: 36,
            depart: 3,
            numero: '3',
            tipo: 'Financeiro'
          },
          {
            cpf: '28940848039',
            nome: 'Dep 01',
            cargo: 'Gerente',
            idade: 32,
            depart: 1,
            numero: '1',
            tipo: 'Produtos'
          },
          {
            cpf: '28940848039',
            nome: 'Dep 02',
            cargo: 'Gerente',
            idade: 32,
            depart: 1,
            numero: '2',
            tipo: 'Publicidade'
          },
          {
            cpf: '28940848039',
            nome: 'Dep 03',
            cargo: 'Gerente',
            idade: 32,
            depart: 1,
            numero: '3',
            tipo: 'Financeiro'
          },
          {
            cpf: '40201982099',
            nome: 'Dep 01',
            cargo: 'Analista',
            idade: 24,
            depart: 2,
            numero: '1',
            tipo: 'Produtos'
          },
          {
            cpf: '40201982099',
            nome: 'Dep 02',
            cargo: 'Analista',
            idade: 24,
            depart: 2,
            numero: '2',
            tipo: 'Publicidade'
          },
          {
            cpf: '40201982099',
            nome: 'Dep 03',
            cargo: 'Analista',
            idade: 24,
            depart: 2,
            numero: '3',
            tipo: 'Financeiro'
          }
        ],
      });
    });
  });
});
