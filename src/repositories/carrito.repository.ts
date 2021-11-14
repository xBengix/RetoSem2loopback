import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Carrito, CarritoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class CarritoRepository extends DefaultCrudRepository<
  Carrito,
  typeof Carrito.prototype.id,
  CarritoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Carrito.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Carrito, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
