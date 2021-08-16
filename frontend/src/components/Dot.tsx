import { BsHouseDoorFill } from 'react-icons/bs';

export function Dot({ size }: { size: number }) {
  return (
    // <div
    //   style={{ width: 3, height: 3, background: 'red', borderRadius: '50%' }}
    // ></div>
    <BsHouseDoorFill width={size} height={size} />
  );
}
