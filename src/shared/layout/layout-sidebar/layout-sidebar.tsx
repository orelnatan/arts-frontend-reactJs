import './layout-sidebar.scss';

type LayoutSidebarProps = {
  children: React.ReactNode; 
};

export const LayoutSidebar = (props: LayoutSidebarProps) => {
  return (
    <div className='layout-sidebar-main'>
      { props.children } 
    </div> 
  );
}

export default LayoutSidebar;
