const GetPCState = (state) => {
  if (state === 1) return <div className="text-success">Available</div>;
  else if (state === 2) return <div className="text-danger">Occupied</div>;
  else return <div className="text-primary">Maintainance</div>;
};

export default GetPCState;
