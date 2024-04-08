import styles from "../../styles/Shape.module.css";

export default function Shape({ name }) {
  if (name === "triangle")
    return (
      <div style={{ transform: "rotate(25deg)", marginLeft: "50px" }}>
        <div
          className={`relative ${styles.triangle}`}
          style={{
            position: "fixed",
            width: "55px",
            height: "55px",
            backgroundColor: "var(--secondary-color)",
          }}
        ></div>
        <div
          className={`${styles.triangle} bg-neutral-200`}
          style={{
            position: "fixed",
            width: "50px",
            height: "50px",
            top: "4px",
            left: "2.5px",
          }}
        ></div>
      </div>
    );
  if (name === "circle")
    return (
      <div className="relative">
        <div
          className={`absolute ${styles.circle}`}
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "var(--secondary-color)",
          }}
        ></div>
        <div
          className={`absolute bg-neutral-200 ${styles.circle}`}
          style={{
            width: "66px",
            height: "66px",
            marginTop: "2px",
            marginLeft: "2px",
          }}
        ></div>
      </div>
    );
  if (name === "square")
    return (
      <div
        className="relative"
        style={{ transform: "rotate(25deg)", marginLeft: "50px" }}
      >
        <div
          className={`absolute ${styles.square}`}
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "var(--secondary-color)",
          }}
        ></div>
        <div
          className={`absolute bg-neutral-200 ${styles.square}`}
          style={{
            width: "66px",
            height: "66px",
            marginTop: "2px",
            marginLeft: "2px",
          }}
        ></div>
      </div>
    );
}
