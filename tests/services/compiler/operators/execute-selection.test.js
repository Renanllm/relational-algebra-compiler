import { execute } from "../../../../src/services/compiler/execute";

describe("execute selection function tests", () => {
  describe("selection expression cases", () => {
    it("should return right records based on depart", () => {
      expect(
        execute({
          operator: "σ",
          column: "depart",
          conditional: ">",
          value: "1",
          entity: {
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
        })
      ).toEqual({
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

    it("should return right records based on name", () => {
      expect(
        execute({
          operator: "σ",
          column: "nome",
          conditional: "=",
          value: "Fabiano",
          entity: {
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
        })
      ).toEqual({
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
          },
        },
        records: [
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

    it("should return empty records when conditional does not make sense", () => {
      expect(
        execute({
          operator: "σ",
          column: "idade",
          conditional: ">",
          value: "mamão",
          entity: {
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
        })
      ).toEqual({
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
          },
        },
        records: [],
      });
    });

    it("should return error when there is no column named in entity", () => {
      expect.assertions(1);
      try {
        expect(
          execute({
            operator: "σ",
            column: "WRONG_COLUMN",
            conditional: "<=",
            value: "1",
            entity: {
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
          })
        );
      } catch (error) {
        expect(error.message).toEqual(
          "Não existe nenhuma coluna chamada WRONG_COLUMN na entidade FUNCIONARIO"
        );
      }
    });
  });
});
