import { AlumnoInterface } from './AlumnoInterface';

export class Alumno implements AlumnoInterface {
  constructor(
    public id?: number | null,
    public gender?: string | null,
    public first_name?: string | null,
    public last_name?: string | null,
    public email?: string | null,
    public avatar?: string | null,
    public address?: string | null,
    public city?: string | null,
    public postalCode?: string | null
  ) {}
}
