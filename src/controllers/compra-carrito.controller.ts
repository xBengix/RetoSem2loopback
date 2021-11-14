import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Compra,
  Carrito,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraCarritoController {
  constructor(
    @repository(CompraRepository) protected compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/carrito', {
    responses: {
      '200': {
        description: 'Compra has one Carrito',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Carrito),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Carrito>,
  ): Promise<Carrito> {
    return this.compraRepository.carrito(id).get(filter);
  }

  @post('/compras/{id}/carrito', {
    responses: {
      '200': {
        description: 'Compra model instance',
        content: {'application/json': {schema: getModelSchemaRef(Carrito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Compra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {
            title: 'NewCarritoInCompra',
            exclude: ['id'],
            optional: ['compraId']
          }),
        },
      },
    }) carrito: Omit<Carrito, 'id'>,
  ): Promise<Carrito> {
    return this.compraRepository.carrito(id).create(carrito);
  }

  @patch('/compras/{id}/carrito', {
    responses: {
      '200': {
        description: 'Compra.Carrito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrito, {partial: true}),
        },
      },
    })
    carrito: Partial<Carrito>,
    @param.query.object('where', getWhereSchemaFor(Carrito)) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.compraRepository.carrito(id).patch(carrito, where);
  }

  @del('/compras/{id}/carrito', {
    responses: {
      '200': {
        description: 'Compra.Carrito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Carrito)) where?: Where<Carrito>,
  ): Promise<Count> {
    return this.compraRepository.carrito(id).delete(where);
  }
}
