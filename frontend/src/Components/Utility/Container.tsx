interface IContainerProps {
  children: React.ReactNode;
}

const Container = (props: IContainerProps) => {
  return (
    <div className="grid">
      <div className="col-0 md:col" />
      <div className="col-12 md:col-9">{props.children}</div>
      <div className="col-0 md:col" />
    </div>
  );
};

export default Container;
