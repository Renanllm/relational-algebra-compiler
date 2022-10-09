import { addEntityField } from "../../../src/services/compiler/add-entity-fields";
import { entities } from "../../mocks/data/entities";

describe("addEntityField function tests", () => {
  describe("with one entity in expression", () => {
    it("should add entity data into entity group field", () => {
      expect(
        addEntityField(
          {
            operator: "σ",
            column: "Depart",
            conditional: "<=",
            value: "1",
            entity: "FUNCIONARIO",
            variable: "Result",
          },
          entities
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "<=",
        value: "1",
        variable: "Result",
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
      });
    });

    it("should return an error when there is no entity with name which was pass", () => {
      const emptyEntities = [];

      expect.assertions(1);
      try {
        addEntityField(
          {
            operator: "σ",
            column: "Depart",
            conditional: "<=",
            value: "1",
            entity: "EMPREGADO",
            variable: "Result",
          },
          emptyEntities
        );
      } catch (error) {
        expect(error.message).toEqual("Não existe entidade chamada  EMPREGADO");
      }
    });
  });

  describe("with two entities in expression", () => {
    it("should add entities data into entities group field", () => {
      expect(
        addEntityField(
          {
            operator: "∪",
            leftEntity: "FUNCIONARIO",
            rightEntity: "DEPARTAMENTO",
            variable: "RESULT",
          },
          entities
        )
      ).toEqual({
        operator: "∪",
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
        variable: "RESULT",
      });
    });

    it("should return an error when there is no entity with name which was pass", () => {
      const arrayWithJustOneEntity = [entities[0]];

      expect.assertions(1);
      try {
        addEntityField(
          {
            operator: "-",
            leftEntity: "FUNCIONARIO",
            rightEntity: "DEPARTAMENTO",
            variable: "RESULT",
          },
          arrayWithJustOneEntity
        );
      } catch (error) {
        expect(error.message).toEqual(
          "Não existe entidade chamada  DEPARTAMENTO"
        );
      }
    });
  });
});
