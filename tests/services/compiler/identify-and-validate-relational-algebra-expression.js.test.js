import { identifyAndValidateRelationalAlgebraExpression } from "../../../src/services/compiler/identify-and-validate-relational-algebra-expression";

describe("identifyAndValidateRelationalAlgebraExpression function tests", () => {
  describe("selection cases", () => {
    it("simple expression with one conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `σ Depart = '1' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    it("simple expression with bigger than conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `σ Depart >= '1' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: ">=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    it("simple expression with lesser than conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `σ Depart <= '1' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "<=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    xit("selection expression with more than one conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `σ Depart = '1' ^ Salario = '1800' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    xit("selection expression with more than one conditional and specific order", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `σ (Depart = '1' v Depart = '2') ^ Salario = '1800' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "=",
        value: "1",
        entity: "EMPREGADO",
      });
    });

    it("selection expression with variable attribution", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `Result <- σ Depart = '1' (EMPREGADO)`
        )
      ).toEqual({
        operator: "σ",
        column: "Depart",
        conditional: "=",
        value: "1",
        entity: "EMPREGADO",
        variable: "Result <- ",
      });
    });

    it("must return an error when there is no column in expression", () => {
      expect.assertions(1);
      try {
        identifyAndValidateRelationalAlgebraExpression(`σ (EMPREGADO)`);
      } catch (error) {
        expect(error.message).toEqual("Expressão inválida");
      }
    });

    it("must return an error when there is no value conditional in expression", () => {
      expect.assertions(1);
      try {
        identifyAndValidateRelationalAlgebraExpression(
          `σ Depart = (EMPREGADO)`
        );
      } catch (error) {
        expect(error.message).toEqual("Expressão inválida");
      }
    });
  });

  describe("projection expression cases", () => {
    it("simple expression with one column", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(`π Depart (EMPREGADO)`)
      ).toEqual({
        operator: "π",
        columns: "Depart ",
        entity: "EMPREGADO",
      });
    });

    it("expression with three columns", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `π Depart, Nome, Salario (EMPREGADO)`
        )
      ).toEqual({
        operator: "π",
        columns: "Depart, Nome, Salario ",
        entity: "EMPREGADO",
      });
    });

    it("projection expression with variable attribution", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `Result <- π Depart (EMPREGADO)`
        )
      ).toEqual({
        operator: "π",
        columns: "Depart ",
        entity: "EMPREGADO",
        variable: "Result <- ",
      });
    });

    it("must return an error when there is no column in expression", () => {
      expect.assertions(1);
      try {
        identifyAndValidateRelationalAlgebraExpression(`π (EMPREGADO)`);
      } catch (error) {
        expect(error.message).toEqual("Expressão inválida");
      }
    });
  });

  describe("binary expression cases", () => {
    describe("union case", () => {
      it("simple expression", () => {
        expect(
          identifyAndValidateRelationalAlgebraExpression(`EMPREGADO ∪ EMPRESA`)
        ).toEqual({
          operator: "∪",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
        });
      });

      it("simple expression with variable attribution", () => {
        expect(
          identifyAndValidateRelationalAlgebraExpression(
            `Result <- EMPREGADO ∪ EMPRESA`
          )
        ).toEqual({
          operator: "∪",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
          variable: "Result <- ",
        });
      });
    });
    describe("intersection case", () => {
      it("simple expression", () => {
        expect(
          identifyAndValidateRelationalAlgebraExpression(`EMPREGADO ∩ EMPRESA`)
        ).toEqual({
          operator: "∩",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
        });
      });
    });
    describe("difference case", () => {
      it("simple expression", () => {
        expect(
          identifyAndValidateRelationalAlgebraExpression(`EMPREGADO - EMPRESA`)
        ).toEqual({
          operator: "-",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
        });
      });
    });
    describe("cartesian product case", () => {
      it("simple expression", () => {
        expect(
          identifyAndValidateRelationalAlgebraExpression(`EMPREGADO X EMPRESA`)
        ).toEqual({
          operator: "X",
          leftEntity: "EMPREGADO",
          rightEntity: "EMPRESA",
        });
      });
    });
    describe("error case", () => {
      it("must return an error when operator is invalid", () => {
        expect.assertions(1);
        try {
          identifyAndValidateRelationalAlgebraExpression(`EMPREGADO % EMPRESA`);
        } catch (error) {
          expect(error.message).toEqual("Expressão inválida");
        }
      });
    });
  });

  describe("join cases", () => {
    it("simple expression with one conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `EMPREGADO ⨝ Cpf = CpfEmpregado VENDA`
        )
      ).toEqual({
        operator: "⨝",
        leftEntityColumn: "Cpf",
        rightEntityColumn: "CpfEmpregado",
        leftEntity: "EMPREGADO",
        rightEntity: "VENDA",
      });
    });

    it("simple expression with one conditional", () => {
      expect(
        identifyAndValidateRelationalAlgebraExpression(
          `Result <- EMPREGADO ⨝ Cpf = CpfEmpregado VENDA`
        )
      ).toEqual({
        operator: "⨝",
        leftEntityColumn: "Cpf",
        rightEntityColumn: "CpfEmpregado",
        leftEntity: "EMPREGADO",
        rightEntity: "VENDA",
        variable: "Result <- ",
      });
    });

    it("must return an error when there is no columns for each entity", () => {
      expect.assertions(1);
      try {
        identifyAndValidateRelationalAlgebraExpression(`EMPREGADO ⨝ Cpf VENDA`);
      } catch (error) {
        expect(error.message).toEqual("Expressão inválida");
      }
    });

    it("must return an error when there is no entity2", () => {
      expect.assertions(1);
      try {
        identifyAndValidateRelationalAlgebraExpression(
          `EMPREGADO ⨝ Cpf = CpfFunc`
        );
      } catch (error) {
        expect(error.message).toEqual("Expressão inválida");
      }
    });
  });
});

// COVERAGE UNTIL NOW:
// selection:
// σ Depart = '1' (TABELA)
// σ Depart > '1' (TABELA)
// σ Depart < '1' (TABELA)
// σ Depart >= '1' (TABELA)
// σ Depart <= '1' (TABELA)

// projection:
// π Depart (EMPREGADO)
// π Depart, Nome, Salario (EMPREGADO)

// binary:
// ALUNO ∪ INSTRUTOR
// ALUNO ∩ INSTRUTOR
// ALUNO - INSTRUTOR
// ALUNO X INSTRUTOR

// join:
// EMPREGADO ⨝ Cpf = CpfEmpregado VENDA

// sintax with variables
// Result <- σ (Depart = 1 v Depart = 2) ^ Salario = 300 (TABELA)

// ---------------------------------------------------------

// COVERAGE LEFT:
// selection:
// σ Depart <= 1 v Salario = 300 (TABELA)
// σ (Depart = 1 v Depart = 2) ^ Salario = 300 (TABELA)

// rename:
// for now it is not possible :(
