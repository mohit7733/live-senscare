function Preloader({ isloading }) {
  if (!isloading) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
      }}
    >
      loading...
    </div>
  );
}

export default Preloader;
