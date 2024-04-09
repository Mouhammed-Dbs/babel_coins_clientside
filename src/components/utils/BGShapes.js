import styles from "../../styles/Shape.module.css";

export default function BGShapes({ className }) {
  return (
    <div className={`absolute flex w-full h-full z-0 ${className}`}>
      <Square />
      <Circle />
      <Triangle />
    </div>
  );
}

function Triangle() {
  return (
    <div
      style={{
        transform: "rotate(25deg)",
        marginLeft: "50px",
        marginTop: "320px",
      }}
    >
      <div
        className={`relative bg-secondary ${styles.triangle}`}
        style={{
          position: "fixed",
          width: "95px",
          height: "95px",
        }}
      ></div>
      <div
        className={`bg-slate-50 ${styles.triangle}`}
        style={{
          position: "fixed",
          width: "90px",
          height: "90px",
          top: "4px",
          left: "2.5px",
        }}
      ></div>
    </div>
  );
}

function Circle() {
  return (
    <div className={`relative top-24 left-96`}>
      <div
        className={`absolute bg-primary ${styles.circle}`}
        style={{
          width: "156px",
          height: "156px",
        }}
      ></div>
      <div
        className={`absolute bg-slate-50 ${styles.circle}`}
        style={{
          width: "150px",
          height: "150px",
          marginTop: "3px",
          marginLeft: "3px",
        }}
      ></div>
    </div>
  );
}

function Square() {
  return <div className={`relative ${styles.square}`}></div>;
}
