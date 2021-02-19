export interface BirthMoonArgs {
  birthdate: Date;
  maxAge: number;
}

export interface BirthMoonRow {
  date: Date;
  moonLon: number;
  age: number;
  future?: Date;
  events?: string;
}
