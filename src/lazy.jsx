import thegif from "./lazygif.gif";
export default function Loading() {

  return (
    <>
      <img
        src={thegif}
        alt="lazy one"
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '50%',
          left: '50%', 
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
