import { createContext, useContext, useState } from "react";
import { defaultEntities } from "./default-entities";

const EntitiesContext = createContext({});

export function EntitiesProvider({ children }) {
  const [entities, setEntities] = useState(() => {
    const storagedEntities = localStorage.getItem('@compiler:storaged-entities');

    if (storagedEntities) {
      const storagedEntitiesParsed = JSON.parse(storagedEntities);
      return storagedEntitiesParsed;
    }

    return defaultEntities;
  });

  const addEntity = (entity) => {
    const entityByNameIndex = entities.findIndex(e => e.name === entity.name);
    const newEntities = [...entities];

    if (entityByNameIndex > -1) {
      newEntities[entityByNameIndex] = entity;
    } else {
      newEntities.push(entity);
    }

    setEntities(newEntities);
    localStorage.setItem('@compiler:storaged-entities', JSON.stringify(newEntities.filter(ent => !ent.variable)));
  };

  return (
    <EntitiesContext.Provider value={{ entities, addEntity }}>
      {children}
    </EntitiesContext.Provider>
  );
}

export function useEntities() {
  const context = useContext(EntitiesContext);

  return context;
}
