import { DomainEntity } from './DomainEntity';
import { NameValueList } from './NameValueList';

function entities<T = any>(
  source: DomainEntity,
  entity: any,
  updatable?: readonly (keyof T)[],
): NameValueList {
  //
  const nameValues: { name: string; value: string }[] = [];

  if (!entity || !source) {
    return { nameValues };
  }

  const keysToCheck = updatable || Object.keys(entity);

  for (const key of keysToCheck) {
    const keyStr = String(key);
    const sourceValue = (source as any)[keyStr];
    const entityValue = entity[keyStr];

    if (sourceValue !== entityValue && entityValue !== undefined) {
      nameValues.push({
        name: keyStr,
        value: String(entityValue),
      });
    }
  }

  return { nameValues };
}

export default {
  modifiedNameValues: entities,
};
