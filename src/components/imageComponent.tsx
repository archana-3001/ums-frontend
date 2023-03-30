import Image from 'next/image';
import delhiver_icon from '../../public/images/delhivery_icon.png'; 

export function ImageComponent() {
    return (
      <Image
        src={delhiver_icon}
        alt="logo"
        width={200}
        height={200}
      />
    );
  }
  