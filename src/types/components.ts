import {CardProps} from 'react-bootstrap'

export interface CustomCardProps {
  title?: string;
  subtitle?: string;
  body?: React.ReactNode;
  footer?: string | React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode | null
}


export interface MainCardProps extends CardProps {
  title?: string,
  description: string,
  imgURL: string,
  rating: number,
  className: string,
  category?: string,
  clientId: string,
  disabled?: boolean
}