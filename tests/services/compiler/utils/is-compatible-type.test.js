import { isEntitiesCompatibles } from "../../../../src/services/compiler/utils/is-compatible-type";
import { entities } from "../../../mocks/data/entities";

describe("isEntitiesCompatibles function tests", () => {
  it("should return an error when at least one of the params is invalid", () => {
    expect.assertions(1);

    try {
      isEntitiesCompatibles(entities[0], null);
    } catch (error) {
      expect(error.message).toEqual("Entidade inválida");
    }
  });

  it("should return an error when entity columns amount are different from each other", () => {
    expect.assertions(1);

    try {
      isEntitiesCompatibles(entities[0], entities[1]);
    } catch (error) {
      expect(error.message).toEqual(
        "O número de colunas das entidades são diferentes uma das outras"
      );
    }
  });

  it("should return an error when entity columns type are different from each other", () => {
    const entityModified = { ...entities[0] };
    entityModified.columns = {
      column1: { type: "text" },
      column2: { type: "text" },
      column3: { type: "text" },
    };

    expect.assertions(1);

    try {
      isEntitiesCompatibles(entityModified, entities[1]);
    } catch (error) {
      expect(error.message).toEqual("As colunas das entidades são de tipos incompatíveis");
    }
  });

  it("should return success when entities are compatibles", () => {
    expect(isEntitiesCompatibles(entities[2], entities[1])).toBeTruthy();
  });
});
