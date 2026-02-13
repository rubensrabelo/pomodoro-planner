export class DuplicateEntityError extends Error {
  constructor(entity: string, field?: string) {
    super(
      field
        ? `${entity} with same ${field} already exists`
        : `${entity} already exists`
    );
    this.name = "DuplicateEntityError";
  }
}
