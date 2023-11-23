import './layout-header.scss';

type LayoutHeaderProps = {
  children: React.ReactNode; 
};

export const LayoutHeader = (props: LayoutHeaderProps) => {
  return (
    <div className="layout-header-main">
      { props.children }  
    </div>
  );
}

export default LayoutHeader;
