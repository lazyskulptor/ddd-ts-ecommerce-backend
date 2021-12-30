import { Photo } from "@/domains/models/photo";

describe('Value Object 기본 테스트', () => {
  it('vo의 모든 값은 바꿀 수 없음', () => {
    const photo = Photo.create({});

    //@ts-ignore
    const op1 = () => photo.displayName = 'sample.jpg';
    const op2 = () => photo.props.displayName = 'sample.jpg';

    expect(op1).toThrowError(TypeError);
    expect(op2).toThrowError(TypeError);
  });
});
