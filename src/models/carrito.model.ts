import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Carrito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  id_compra: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @property({
    type: 'string',
  })
  compraId?: string;

  constructor(data?: Partial<Carrito>) {
    super(data);
  }
}

export interface CarritoRelations {
  // describe navigational properties here
}

export type CarritoWithRelations = Carrito & CarritoRelations;
