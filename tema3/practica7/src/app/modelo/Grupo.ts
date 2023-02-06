import { GrupoInterface } from './GrupoInterface';

export class Grupo implements GrupoInterface {
  constructor(public id: number, public grupo: string) {}
}
