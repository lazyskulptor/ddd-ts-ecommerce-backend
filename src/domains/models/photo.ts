import { buildVO, ValueObject } from "@/domains/abstract/value-object";

export interface Photo extends ValueObject {
  uri: string
  displayName: string
  size: [x: number, y: number]
}

export const buildPhoto = (e: Photo): Photo => buildVO<Photo>(e);
