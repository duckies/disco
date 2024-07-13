export interface ManifestItem {
  name: string;
  toJSON: () => Record<string, unknown>;
}

export class Manifest<T extends ManifestItem> extends Map<string, T> {
  public override get(name: string): T {
    const value = super.get(name);

    if (!value) {
      throw new Error(`Manifest key not found ${name}`);
    }

    return value;
  }

  public add(value: T) {
    if (this.has(value.name)) {
      throw new Error(`Manifest key already exists ${value.name}`);
    }

    this.set(value.name, value);
  }

  public toJSON() {
    return [...this.values()].map((value) => value.toJSON());
  }
}
