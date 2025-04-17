// Strategy Interface
export interface PermissionStrategy {
  canRead(): boolean;
  canWrite(): boolean;
  canDelete(): boolean;
}

// Concrete Strategies
export class AdminPermissions implements PermissionStrategy {
  canRead() { return true; }
  canWrite() { return true; }
  canDelete() { return true; }
}

export class EditorPermissions implements PermissionStrategy {
  canRead() { return true; }
  canWrite() { return true; }
  canDelete() { return false; }
}

export class ViewerPermissions implements PermissionStrategy {
  canRead() { return true; }
  canWrite() { return false; }
  canDelete() { return false; }
}

// Context
export class User {
  constructor(
    public name: string,
    private permissionStrategy: PermissionStrategy
  ) {}

  setStrategy(strategy: PermissionStrategy) {
    this.permissionStrategy = strategy;
  }

  canRead() {
    return this.permissionStrategy.canRead();
  }

  canWrite() {
    return this.permissionStrategy.canWrite();
  }

  canDelete() {
    return this.permissionStrategy.canDelete();
  }
}