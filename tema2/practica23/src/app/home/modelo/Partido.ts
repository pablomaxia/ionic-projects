export class Partido {
  constructor(
    public fecha: Date,
    public local: string,
    public visitante: string,
    public goles_local: number,
    public goles_visitante: number,
    public jugadores_local: string[],
    public jugadores_visitante: string[]
  ) {}
}
