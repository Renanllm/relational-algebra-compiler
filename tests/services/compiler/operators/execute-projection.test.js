import { execute } from "../../../../src/services/compiler/execute";

describe("execute projection function tests", () => {
  describe("projection expression cases", () => {
    it("should return right records based on expression", () => {
      expect(
        execute({
          operator: "π",
          columns: ["cpf", "nome"],
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

    it("should return only unique records when there is a conflict", () => {
      expect(
        execute({
          operator: "π",
          columns: ["nome", "depart"],
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
              {
                cpf: "13243543123",
                nome: "Gabriel",
                cargo: "Developer",
                idade: 54,
                depart: 1,
              },
            ],
          },
        })
      ).toEqual({
        name: "FUNCIONARIO",
        columns: {
          nome: {
            type: "text",
            isRequired: true,
          },
          depart: {
            foreignKey: true,
            type: "number",
            isRequired: true,
          },
        },
        records: [
          {
            nome: "Gabriel",
            depart: 1,
          },
          {
            nome: "Marcos",
            depart: 3,
          },
          {
            nome: "João",
            depart: 1,
          },
          {
            nome: "Fabiano",
            depart: 2,
          },
        ],
      });
    });

    it("should return an error when the column which was passed does not exist", () => {
      expect.assertions(1);
      try {
        execute({
          operator: "π",
          columns: ["cpf", "sexo"],
          entity: {
            name: "FUNCIONARIO",
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
        });
      } catch (error) {
        expect(error.message).toEqual(
          "Não existe nenhuma coluna chamada sexo na entidade FUNCIONARIO"
        );
      }
    });
  });
});
