import { ClienteInterface } from './ClienteInterface';
export class Cliente implements ClienteInterface {
  constructor(public id: number, public cliente: string) {}
}
