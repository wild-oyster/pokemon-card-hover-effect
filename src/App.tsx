import "./styles.css";

import { useSpring, animated, config } from "react-spring";

const round = (num: number, fix = 3) => parseFloat(num.toFixed(fix));

const trans = (x: number, y: number, s: number) =>
  `perspective(500px) rotateX(${y}deg) rotateY(${x}deg) scale(${s})`;

export default function App() {
  const [{ xys }, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { ...config.gentle, damping: 0.25 }
  }));

  return (
    <div className="App">
      <animated.div
        onPointerMove={({ clientX: x, clientY: y, target }) => {
          // @ts-ignore
          const rect = target.getBoundingClientRect();
          const absolute = {
            x: x - rect.left, // get mouse position from left
            y: y - rect.top // get mouse position from right
          };
          const percent = {
            x: round((100 / rect.width) * absolute.x),
            y: round((100 / rect.height) * absolute.y)
          };
          const center = {
            x: percent.x - 50,
            y: percent.y - 50
          };
          set({ xys: [round(-(center.x / 3.5)), round(center.y / 2), 1] });
        }}
        onMouseOut={() => set({ xys: [0, 0, 1] })}
        style={{
          transform: xys.to(trans),
          transformOrigin: "center",
          // @ts-ignore
          imageRendering: "optimizeQuality",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: "0px 10px 20px -5px black",
          transition: "box-shadow 0.4s ease, outline 0.2s ease",
          borderRadius: "4.55% / 3.5%"
        }}
      >
        <img
          src={"https://images.pokemontcg.io/swsh1/190_hires.png"}
          alt={"card"}
          width={330}
          height={460}
        />
      </animated.div>
    </div>
  );
}
