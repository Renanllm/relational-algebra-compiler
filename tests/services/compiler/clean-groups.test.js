import { cleanGroups } from "../../../src/services/compiler/clean-groups";

describe("cleanGroups function tests", () => {
  describe("selection cases", () => {
    it("should return the same info", () => {
      expect(
        cleanGroups({
          operator: "σ",
          column: "Depart",
          conditional: "<=",
          value: "1",
          entity: "EMPREGADO",
        })
      ).toEqual({
        operator: "σ",
        column: "depart",
        conditional: "<=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    it("should return variable formatted", () => {
      expect(
        cleanGroups({
          operator: "σ",
          column: "Depart",
          conditional: "<=",
          value: "1",
          entity: "EMPREGADO",
          variable: "Result <- ",
        })
      ).toEqual({
        operator: "σ",
        column: "depart",
        conditional: "<=",
        value: "1",
        entity: "EMPREGADO",
        variable: "Result",
      });
    });
  });

  describe("projection expression cases", () => {
    it("should return columns in array and variable formatted", () => {
      expect(
        cleanGroups({
          operator: "π",
          columns: "Depart, Nome, Salario ",
          entity: "EMPREGADO",
          variable: "Result <- ",
        })
      ).toEqual({
        operator: "π",
        columns: ["depart", "nome", "salario"],
        entity: "EMPREGADO",
        variable: "Result",
      });
    });
  });

  describe("binary expression cases", () => {
    it("should return variable formatted", () => {
      expect(
        cleanGroups({
          operator: "∪",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
          variable: 'RESULT <-'
        })
      ).toEqual({
        operator: "∪",
        leftEntity: "EMPREGADO",
        rightEntity: "EMPRESA",
        variable: 'RESULT'
      });
    });
  });

  describe("join cases", () => {
    it("should return variable formatted", () => {
      expect(
        cleanGroups({
          operator: "⨝",
          leftEntityColumn: "Cpf",
          rightEntityColumn: "CpfEmpregado",
          leftEntity: "EMPREGADO",
          rightEntity: "VENDA",
          variable: "AttributionVariable<- ",
        })
      ).toEqual({
        operator: "⨝",
        leftEntityColumn: "cpf",
        rightEntityColumn: "cpfempregado",
        leftEntity: "EMPREGADO",
        rightEntity: "VENDA",
        variable: "AttributionVariable",
      });
    });
  });
});
