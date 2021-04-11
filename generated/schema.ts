// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Game entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Game entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Game", id.toString(), this);
  }

  static load(id: string): Game | null {
    return store.get("Game", id) as Game | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get challenger(): Bytes | null {
    let value = this.get("challenger");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set challenger(value: Bytes | null) {
    if (value === null) {
      this.unset("challenger");
    } else {
      this.set("challenger", Value.fromBytes(value as Bytes));
    }
  }

  get winner(): Bytes | null {
    let value = this.get("winner");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set winner(value: Bytes | null) {
    if (value === null) {
      this.unset("winner");
    } else {
      this.set("winner", Value.fromBytes(value as Bytes));
    }
  }

  get token(): Bytes {
    let value = this.get("token");
    return value.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get lastChangeTimestamp(): BigInt {
    let value = this.get("lastChangeTimestamp");
    return value.toBigInt();
  }

  set lastChangeTimestamp(value: BigInt) {
    this.set("lastChangeTimestamp", Value.fromBigInt(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save User entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save User entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("User", id.toString(), this);
  }

  static load(id: string): User | null {
    return store.get("User", id) as User | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get wins(): BigInt | null {
    let value = this.get("wins");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set wins(value: BigInt | null) {
    if (value === null) {
      this.unset("wins");
    } else {
      this.set("wins", Value.fromBigInt(value as BigInt));
    }
  }

  get losses(): BigInt | null {
    let value = this.get("losses");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set losses(value: BigInt | null) {
    if (value === null) {
      this.unset("losses");
    } else {
      this.set("losses", Value.fromBigInt(value as BigInt));
    }
  }
}
