import styles from "../../styles/Shape.module.css";

export default function BGShapes({
  style,
  className,
  fillColor,
  showThree = false,
}) {
  return (
    <div
      style={style}
      className={`absolute z-0 flex md:flex-col pt-48 md:pt-20 ${className}`}
    >
      {showThree && (
        <div
          className={`grid md:hidden gap-20 md:gap-0 md:grid-cols-4 w-full h-[250px]`}
        >
          <Square color={"border-primary"} className={`m-auto`} />
          <Triangle
            color={"bg-secondary"}
            fillColor={fillColor}
            className={"m-auto"}
          />
          <Circle
            fillColor={fillColor}
            color={"bg-primary"}
            className={`m-auto`}
          />

          <Square color={"border-secondary"} className={`m-auto`} />
        </div>
      )}
      <div
        className={`mt-24 md:mt-0 grid gap-24 md:gap-0 md:grid-cols-3 items-center w-full h-[250px]`}
      >
        <Triangle
          color={"bg-primary"}
          fillColor={fillColor}
          className={"m-auto"}
        />
        <Square color={"border-secondary"} className={`m-auto`} />
        <Circle
          fillColor={fillColor}
          color={"bg-primary"}
          className={`m-auto`}
        />
      </div>
      <div className={`grid gap-20 md:gap-0 md:grid-cols-4 w-full h-[250px]`}>
        <Square color={"border-secondary"} className={`m-auto`} />
        <Circle
          fillColor={fillColor}
          color={"bg-primary"}
          className={`m-auto`}
        />
        <Triangle
          color={"bg-secondary"}
          fillColor={fillColor}
          className={"m-auto"}
        />
        <Square color={"border-primary"} className={`m-auto`} />
      </div>
    </div>
  );
}

function Triangle({ className, fillColor, color }) {
  return (
    <div
      className={`w-[40px] h-[40px] md:w-[95px] md:h-[95px] ${className}`}
      style={{
        transform: "rotate(25deg)",
      }}
    >
      <div
        className={`relative w-[45px] h-[45px] md:w-[95px] md:h-[95px] ${color} ${styles.triangle}`}
        style={{
          position: "fixed",
        }}
      ></div>
      <div
        className={`w-[40px] h-[40px] md:w-[90px] md:h-[90px] ${fillColor} ${styles.triangle}`}
        style={{
          position: "fixed",
          top: "4px",
          left: "2.5px",
        }}
      ></div>
    </div>
  );
}

function Circle({ className, color, fillColor }) {
  return (
    <div
      className={`relative w-[70px] h-[70px] md:w-[156px] md:h-[156px] ${className}`}
    >
      <div
        className={`absolute w-[76px] h-[76px] md:w-[156px] md:h-[156px] rounded-full ${color}`}
      ></div>
      <div
        className={`absolute w-[70px] h-[70px] md:w-[150px] md:h-[150px] rounded-full ${fillColor}`}
        style={{
          marginTop: "3px",
          marginLeft: "3px",
        }}
      ></div>
    </div>
  );
}

function Square({ className, color }) {
  return (
    <div
      className={`relative border-3 rounded-lg md:rounded-3xl w-[70px] h-[70px] md:w-[150px] md:h-[150px] ${color} ${styles.square} ${className}`}
    ></div>
  );
}
