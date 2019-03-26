
import { IDefault, Inject } from './IDefault';
import * as mongoose from 'mongoose';

export interface IUsuarioModel extends IDefault{

    id: string;
    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    uid: string;
    pai: string;
    
}

let schema = {
    id:  { type: String },
    email:  { type: String },
    nome:  { type: String },
    sobrenome:  { type: String },
    cpf:  { type: String },
    uid:  { type: String },
    pai:  { type: String },    
};

Inject(schema);
export const UsuarioMasterSchema = new mongoose.Schema(schema);
export const UsuarioModel = mongoose.model<IUsuarioModel>('Usuario', UsuarioMasterSchema, 'usuario', false);