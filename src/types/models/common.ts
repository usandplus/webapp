import { Role } from "./User";

export type UNPBaseCategory =
  | 'educacion'
  | 'ciencia'
  | 'deporte'
  | 'salud'
  | 'medio ambiente'
  | 'arte'
  | 'tecnologia'
  | 'negocio';

export const validCategories: UNPBaseCategory[] = [
    'educacion',
    'ciencia',
    'deporte',
    'salud',
    'medio ambiente',
    'arte',
    'tecnologia',
    'negocio',
  ];

export type UNPBaseType = 'fundacion' | 'convocatoria' | 'campana' | 'empresa';
export type UNPBaseEntityType = 'ac' | 'fundacion' | 'convocatoria' | 'campana' | 'empresa';
export interface UNPBaseEntity {
  entityId: string;
  creationTime: string | undefined;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface UNPBaseEntityMembership {
  userId: string;
  role: Role;
  startDate: Date;
  endDate: Date | null;
}