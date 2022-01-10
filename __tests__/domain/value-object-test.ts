import { buildVO, prototype } from "@/domains/abstract/value-object";
import { buildPhoto, Photo } from "@/domains/models/photo";
import { createProduct } from "@/domains/models/product";

describe('Value Object basic test', () => {
  const props: Photo =
    { uri: 'https://', displayName: 'file.jpg', size: [1, 1] };

  describe('immutability of VO', () => {

    it('tries to change value in VO', () => {
      const photo = buildVO<Photo>({
        ...props,
        val1: { a: { b: { c: { d: 'hi' }} } },
        val2: [[[[0]]], []],
        val3: [[[[{ a: { b: 'hi' } }]]], []],
      } as Photo);

      const op1 = () => photo.displayName = 'sample.jpg';
      const op3 = () => photo.size[0] = 10;
      const op4 = () => photo['val1'].a.b.c.d = 'Err !!!';
      const op5 = () => photo['val2'][0][0][0][0] = 10;
      const op6 = () => photo['val3'][0][0][0][0].a.b = 'Err !!!';

      expect(op1).toThrowError(TypeError);
      expect(op3).toThrowError(TypeError);
      expect(op4).toThrowError(TypeError);
      expect(op5).toThrowError(TypeError);
      expect(op6).toThrowError(TypeError);
    });

    it('tried to change state of entity in VO', () => {
      const product = createProduct({ name: 'Hyeonjun', price: 0, productImgs: [] });
      const photo = buildPhoto({ ...props, product });

      photo['product'].name = "Josh";

      expect(photo['product'].name ).toBe("Josh");
    });
  });

  describe('prototype of VO', () => {

    it('tried to change state of Entity cloned by prototype', () => {
      const product = createProduct({ name: 'Hyeonjun', price: 0, productImgs: [] });
      const photo = buildPhoto({ ...props, product });
      const cloned = buildPhoto(prototype(photo));

      cloned['product'].name = 'Josh';

      expect(cloned['product'].name).toBe('Josh');
    });

    it('build new instance by prototype', () => {
      const photo = buildPhoto(props);

      const copied = prototype(photo);
      copied.uri = 'file://';

      expect(copied.uri).toBe('file://');
      expect(prototype(photo).uri).toBe('https://');
    });
  });
});
