import { ReactNode } from "react";
import Slider from "react-slick";

interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  className: string;
}

interface SimpleSliderProps {
  children?: ReactNode;
  settings?: Partial<SliderSettings>;
}

export default function SimpleSlider({
  settings,
  children,
}: SimpleSliderProps) {
  const defaultSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const input = settings ? settings : defaultSettings;

  return <Slider {...input}>{children}</Slider>;
}
