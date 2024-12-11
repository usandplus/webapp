import { UNPBaseEvent, UNPBaseReview, UNPImportantPeople } from "../../types/models/common";

export interface FundacionProfile {
  entityInfo: {
    name: string
    description: string
    history: string
    locationAddress: string
    locationCity: string
    logo: string
    aboutUs: string
    services: string[]
    importantPeople: UNPImportantPeople[]
    categories: string
    achievements: string[]
    ratingSummary: {
      rating: number
      label: string
    }[]
    events: UNPBaseEvent[]
  }
  heroImages: string[]
  reviews: UNPBaseReview
}