import { execute } from "../../../../src/services/compiler/execute";

describe("execute difference function tests", () => {
  describe("difference expression cases", () => {
    it("should return an error when entities columns are not compatibles", () => {
      expect.assertions(1);

      try {
        execute({
          operator: "-",
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
          "O número de colunas das entidades são diferentes uma das outras"
        );
      }
    });

    it("should return right entity after difference operation", () => {
      expect(
        execute({
          operator: "-",
          rightEntity: {
            name: "CIDADE",
            columns: {
              nome: {
                type: "text",
                isRequired: true,
              },
            },
            records: [
              {
                nome: "CAMPINA GRANDE",
              },
              {
                nome: "JOÃO PESSOA",
              },
              {
                nome: "NATAL",
              },
            ],
          },
          leftEntity: {
            name: "LOCALIZACAO-EMPRESA",
            columns: {
              cidade: {
                type: "text",
                isRequired: true,
              },
            },
            records: [
              {
                cidade: "CAMPINA GRANDE",
              },
              {
                cidade: "JOÃO PESSOA",
              },
              {
                cidade: 'RIO DE JANEIRO'
              }
            ],
          },
        })
      ).toEqual({
        name: "LOCALIZACAO-EMPRESA_CIDADE",
        columns: {
          cidade: {
            type: "text",
            isRequired: true,
          },
        },
        records: [
          {
            cidade: 'RIO DE JANEIRO'
          },
        ],
      });
    });

    it("should return right entity which is different from the other one after difference operation", () => {
      expect(
        execute({
          operator: "-",
          leftEntity: {
            name: "CIDADE",
            columns: {
              nome: {
                type: "text",
                isRequired: true,
              },
            },
            records: [
              {
                nome: "CAMPINA GRANDE",
              },
              {
                nome: "JOÃO PESSOA",
              },
              {
                nome: "NATAL",
              },
            ],
          },
          rightEntity: {
            name: "LOCALIZACAO-EMPRESA",
            columns: {
              cidade: {
                type: "text",
                isRequired: true,
              },
            },
            records: [
              {
                cidade: "CAMPINA GRANDE",
              },
              {
                cidade: "JOÃO PESSOA",
              },
              {
                cidade: 'RIO DE JANEIRO'
              }
            ],
          },
        })
      ).toEqual({
        name: "CIDADE_LOCALIZACAO-EMPRESA",
        columns: {
          nome: {
            type: "text",
            isRequired: true,
          },
        },
        records: [
          {
            nome: 'NATAL'
          },
        ],
      });
    });
  });
});
