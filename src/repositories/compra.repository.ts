import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compra, CompraRelations, Carrito} from '../models';
import {CarritoRepository} from './carrito.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly carrito: HasOneRepositoryFactory<Carrito, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CarritoRepository') protected carritoRepositoryGetter: Getter<CarritoRepository>,
  ) {
    super(Compra, dataSource);
    this.carrito = this.createHasOneRepositoryFactoryFor('carrito', carritoRepositoryGetter);
    this.registerInclusionResolver('carrito', this.carrito.inclusionResolver);
  }
}
