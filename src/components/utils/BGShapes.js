import styles from "../../styles/Shape.module.css";

export default function BGShapes() {
  return (
    <div className="absolute bg-slate-50 dark:bg-default-50 flex w-full h-full z-0"></div>
  );
}

function Triangle() {
  return (
    <div
      className={className}
      style={{ transform: "rotate(25deg)", marginLeft: "50px" }}
    >
      <div
        className={`relative ${color} ${styles.triangle}`}
        style={{
          position: "fixed",
          width: "95px",
          height: "95px",
        }}
      ></div>
      <div
        className={`${styles.triangle} ${fillColor}`}
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
    <div className={`relative ${className}`}>
      <div
        className={`absolute ${color} ${styles.circle}`}
        style={{
          width: "90px",
          height: "90px",
        }}
      ></div>
      <div
        className={`absolute ${fillColor} ${styles.circle}`}
        style={{
          width: "96px",
          height: "96px",
          marginTop: "2px",
          marginLeft: "2px",
        }}
      ></div>
    </div>
  );
}

function Square() {
  return (
    <div
      className={`relative ${color} ${fillColor} ${styles.square} ${className}`}
      style={{
        transform: "rotate(25deg)",
        width: "90px",
        height: "90px",
      }}
    ></div>
  );
}
