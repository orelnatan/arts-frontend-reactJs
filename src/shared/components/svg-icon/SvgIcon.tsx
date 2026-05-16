import { ReactSVG } from 'react-svg';

import './SvgIcon.scss';

interface SvgIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export default function SvgIcon({ icon, style, onClick }: SvgIconProps) {
  return (
    <div 
      className='svg-icon-main'
    >
      <span style={style} onClick={onClick}>
        <ReactSVG src={icon} />
      </span>
    </div>
  )
}