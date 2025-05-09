type Role = 'admin' | 'viewer';
type Action = 'view' | 'edit' | 'delete';
type Entity = 'Location' | 'Currency' | 'Brand' | 'Bonus'; // extend as needed

type PermissionMatrix = {
  [role in Role]: {
    [entity in Entity]?: Action[];
  };
};

const rolePermissions: PermissionMatrix = {
  admin: {
    Location: ['view', 'edit', 'delete'],
    Currency: ['view', 'edit', 'delete'],
    Brand: ['view', 'edit'],
    Bonus: ['view', 'edit'],
  },
  viewer: {
    Location: ['view'],
    Currency: ['view'],
    Brand: ['view'],
    Bonus: ['view'],
  },
};

/**
 * Returns true if the role has the given action permission on the entity.
 */
export const hasPermission = (role: Role, entity: Entity, action: Action): boolean => {
  return rolePermissions[role]?.[entity]?.includes(action) ?? false;
};
