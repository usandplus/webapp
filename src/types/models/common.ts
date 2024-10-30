export interface BaseShowcase {
    title: string;
    items: {
      id: string; // Unique identifier for the item
      title: string; // Title of the card
      description: string; // Description for the card
      imgURL: string; // Image URL for the card
      rating: number; // Rating for the card
      category: string; // Category for the card
      clientId: string; // Unique ID for the client
      number: number;
      numberTitle: string;
      profileImgURL: string;
    }[];
}

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

export type UNPBaseType = 'organizacion' | 'convocatoria' | 'campana' | 'empresa';

