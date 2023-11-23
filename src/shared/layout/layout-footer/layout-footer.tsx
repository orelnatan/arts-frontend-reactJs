import './layout-footer.scss';

type LayoutFooterProps = {
  children: React.ReactNode; 
};

export const LayoutFooter = (props: LayoutFooterProps) => {
  return (
    <div className="layout-footer-main">
      { props.children }  
    </div>
  );
}

export default LayoutFooter;
