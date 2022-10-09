import { execute } from "../../../../src/services/compiler/execute";

describe("execute junction function tests", () => {
  describe("junction expression cases", () => {
    it("should return an error when there is no relationship", () => {
      expect.assertions(1);

      try {
        execute({
          operator: "⨝",
          leftEntityColumn: "cpf",
          rightEntityColumn: "WRONG_KEY",
          leftEntity: {
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
          },
          rightEntity: {
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
          },
        });
      } catch (error) {
        expect(error.message).toEqual(
          "Ocorreu um problema na identificação de relacionamento entre entidades"
        );
      }
    });

    it("should return right entity after junction operation", () => {
      expect(
        execute({
          operator: "⨝",
          leftEntityColumn: "depart",
          rightEntityColumn: "numero",
          leftEntity: {
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
          },
          rightEntity: {
            name: "DEPARTAMENTO",
            columns: {
              numero: {
                primaryKey: true,
                type: "number",
                isRequired: true,
              },
              depNome: {
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
                numero: 1,
                depNome: "Dep 01",
                tipo: "Produtos",
              },
              {
                numero: 2,
                depNome: "Dep 02",
                tipo: "Publicidade",
              },
              {
                numero: 3,
                depNome: "Dep 03",
                tipo: "Financeiro",
              },
            ],
          },
        })
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
          depNome: {
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
            cpf: "79545130091",
            nome: "Gabriel",
            cargo: "Analista",
            idade: 29,
            depart: 1,
            numero: 1,
            depNome: "Dep 01",
            tipo: "Produtos",
          },
          {
            cpf: "09989176051",
            nome: "Marcos",
            cargo: "Contador",
            idade: 36,
            depart: 3,
            numero: 3,
            depNome: "Dep 03",
            tipo: "Financeiro",
          },
          {
            cpf: "28940848039",
            nome: "João",
            cargo: "Gerente",
            idade: 32,
            depart: 1,
            numero: 1,
            depNome: "Dep 01",
            tipo: "Produtos",
          },
          {
            cpf: "40201982099",
            nome: "Fabiano",
            cargo: "Analista",
            idade: 24,
            depart: 2,
            numero: 2,
            depNome: "Dep 02",
            tipo: "Publicidade",
          },
        ],
      });
    });
  });
});
