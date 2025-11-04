export type LogoItem = { src: string; alt: string };

export type Slide = {
  title: string;
  description: string;
  image: string;
  longText: string;
  gallery?: string[];
};

export type IconBlock = {
  key: string;
  title: string;
  icon: string;
  alt: string;
  text: string;
};

export type Beneficiary = {
  key: string;
  src: string;
  alt: string;
};
