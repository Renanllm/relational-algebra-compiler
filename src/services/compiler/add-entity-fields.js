const thereAreOneEntityToAdd = ["σ", "π"];
const thereAreTwoEntitiesToAdd = ["∪", "∩", "-", "X", "⨝"];

const findEntity = (entityName, entities) => {
  const entityFinded = entities.find((entity) => entity.name == entityName);

  if (!entityFinded) {
    throw new Error(`Não existe entidade chamada  ${entityName}`);
  }

  return entityFinded;
}

export function addEntityField(groups, entities = []) {
  const groupsWithEntity = { ...groups };

  if (groups && thereAreOneEntityToAdd.includes(groups.operator)) {
    const entityName = groups.entity;

    groupsWithEntity.entity = findEntity(entityName, entities);
  }

  if (groups && thereAreTwoEntitiesToAdd.includes(groups.operator)) {
    const leftEntityName = groups.leftEntity;
    const rightEntityName = groups.rightEntity;

    groupsWithEntity.leftEntity = findEntity(leftEntityName, entities);
    groupsWithEntity.rightEntity = findEntity(rightEntityName, entities);
  }

  return groupsWithEntity;
}
