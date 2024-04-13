import styles from "../../styles/Shape.module.css";

export default function BGShapes({ className }) {
  return (
    <div className={`absolute flex w-full h-full z-0 ${className}`}>
      <Square className={`top-24 left-48`} />
      <Triangle
        style={{
          transform: "rotate(25deg)",
          marginLeft: "30px",
          marginTop: "320px",
        }}
      />
      <Circle color={"bg-primary"} className={`relative top-96 left-60`} />
      <Square className={`top-[100px] left-[800px]`} />
      <Circle
        color={"bg-secondary"}
        className={`relative top-[400px] left-[600px]`}
      />
      <Triangle
        style={{
          transform: "rotate(25deg)",
          marginLeft: "250px",
          marginTop: "170px",
        }}
      />
    </div>
  );
}

function Triangle({ style }) {
  return (
    <div style={style}>
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

function Circle({ className, color }) {
  return (
    <div className={className}>
      <div
        className={`absolute ${color} ${styles.circle}`}
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

function Square({ className }) {
  return <div className={`relative ${styles.square} ${className}`}></div>;
}
