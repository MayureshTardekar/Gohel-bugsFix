import { motion } from "framer-motion";

/**
 * Stylized human skeleton SVG with animated path drawing + breathing glow.
 * Simplified anatomy — cyberpunk, not medical accurate.
 */
export default function AnimatedSkeleton({ className = "" }) {
  const stroke = "#00f0ff";
  const glow = "#00ff66";

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i = 1) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, type: "spring", duration: 2.2, bounce: 0 },
        opacity: { delay: i * 0.15, duration: 0.4 },
      },
    }),
  };

  const shared = {
    fill: "none",
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { filter: "drop-shadow(0 0 4px rgba(0,240,255,0.55))" },
  };

  return (
    <motion.svg
      viewBox="0 0 300 620"
      className={className}
      initial="hidden"
      animate="visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="skullGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spineGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#00ff66" />
        </linearGradient>
      </defs>

      {/* Skull */}
      <motion.circle cx="150" cy="70" r="45" fill="url(#skullGlow)" variants={draw} custom={0} />
      <motion.path
        {...shared}
        d="M105 78 Q105 30 150 30 Q195 30 195 78 Q195 115 180 122 L175 138 Q150 145 125 138 L120 122 Q105 115 105 78 Z"
        variants={draw}
        custom={0}
      />
      {/* Eye sockets */}
      <motion.circle {...shared} cx="132" cy="78" r="7" variants={draw} custom={0.2} />
      <motion.circle {...shared} cx="168" cy="78" r="7" variants={draw} custom={0.2} />
      {/* Nose + jaw hint */}
      <motion.path {...shared} d="M150 92 L146 106 L154 106 Z" variants={draw} custom={0.3} />
      <motion.path {...shared} d="M138 118 Q150 128 162 118" variants={draw} custom={0.35} />

      {/* Neck / cervical */}
      {[0, 1, 2].map((i) => (
        <motion.line
          {...shared}
          key={`neck-${i}`}
          x1={150 - 8}
          y1={148 + i * 8}
          x2={150 + 8}
          y2={148 + i * 8}
          variants={draw}
          custom={0.4 + i * 0.05}
        />
      ))}

      {/* Clavicles */}
      <motion.path {...shared} d="M100 180 Q150 168 150 175" variants={draw} custom={0.55} />
      <motion.path {...shared} d="M200 180 Q150 168 150 175" variants={draw} custom={0.55} />

      {/* Shoulders (scapula circles) */}
      <motion.circle {...shared} cx="92" cy="185" r="8" variants={draw} custom={0.6} />
      <motion.circle {...shared} cx="208" cy="185" r="8" variants={draw} custom={0.6} />

      {/* Rib cage - stylized 6 pairs */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 195 + i * 14;
        const w = 55 - i * 3;
        return (
          <motion.path
            {...shared}
            key={`rib-${i}`}
            d={`M${150 - w} ${y} Q150 ${y + 10} ${150 + w} ${y}`}
            variants={draw}
            custom={0.7 + i * 0.05}
          />
        );
      })}

      {/* Sternum */}
      <motion.line {...shared} x1="150" y1="188" x2="150" y2="280" variants={draw} custom={0.75} />

      {/* Spine (visible below sternum through pelvis) */}
      <motion.line
        stroke="url(#spineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        x1="150"
        y1="282"
        x2="150"
        y2="360"
        variants={draw}
        custom={0.9}
        style={{ filter: "drop-shadow(0 0 5px rgba(0,255,102,0.6))" }}
      />
      {/* Lumbar vertebrae */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          {...shared}
          key={`lum-${i}`}
          x={144}
          y={288 + i * 16}
          width={12}
          height={9}
          rx={2}
          variants={draw}
          custom={0.95 + i * 0.04}
        />
      ))}

      {/* Pelvis */}
      <motion.path
        {...shared}
        d="M100 360 Q150 380 200 360 L192 400 Q170 420 150 415 Q130 420 108 400 Z"
        variants={draw}
        custom={1.2}
      />

      {/* Upper arms */}
      <motion.line {...shared} x1="92" y1="192" x2="70" y2="285" variants={draw} custom={0.75} />
      <motion.line {...shared} x1="208" y1="192" x2="230" y2="285" variants={draw} custom={0.75} />
      {/* Elbows */}
      <motion.circle {...shared} cx="70" cy="288" r="4" variants={draw} custom={0.85} />
      <motion.circle {...shared} cx="230" cy="288" r="4" variants={draw} custom={0.85} />
      {/* Forearms */}
      <motion.line {...shared} x1="70" y1="290" x2="58" y2="370" variants={draw} custom={0.9} />
      <motion.line {...shared} x1="70" y1="290" x2="62" y2="372" variants={draw} custom={0.92} />
      <motion.line {...shared} x1="230" y1="290" x2="242" y2="370" variants={draw} custom={0.9} />
      <motion.line {...shared} x1="230" y1="290" x2="238" y2="372" variants={draw} custom={0.92} />
      {/* Hands */}
      <motion.circle {...shared} cx="58" cy="380" r="6" variants={draw} custom={1} />
      <motion.circle {...shared} cx="242" cy="380" r="6" variants={draw} custom={1} />

      {/* Femurs */}
      <motion.line {...shared} x1="130" y1="418" x2="120" y2="510" variants={draw} custom={1.3} />
      <motion.line {...shared} x1="170" y1="418" x2="180" y2="510" variants={draw} custom={1.3} />
      {/* Knees */}
      <motion.circle {...shared} cx="120" cy="513" r="5" variants={draw} custom={1.4} />
      <motion.circle {...shared} cx="180" cy="513" r="5" variants={draw} custom={1.4} />
      {/* Tibia + fibula */}
      <motion.line {...shared} x1="120" y1="518" x2="115" y2="595" variants={draw} custom={1.5} />
      <motion.line {...shared} x1="123" y1="518" x2="119" y2="595" variants={draw} custom={1.52} />
      <motion.line {...shared} x1="180" y1="518" x2="185" y2="595" variants={draw} custom={1.5} />
      <motion.line {...shared} x1="177" y1="518" x2="181" y2="595" variants={draw} custom={1.52} />
      {/* Feet */}
      <motion.path {...shared} d="M108 600 L138 600 L134 610 L112 610 Z" variants={draw} custom={1.6} />
      <motion.path {...shared} d="M162 600 L192 600 L188 610 L166 610 Z" variants={draw} custom={1.6} />

      {/* Ambient breathing glow overlay */}
      <motion.circle
        cx="150"
        cy="310"
        r="120"
        fill="url(#skullGlow)"
        opacity="0.15"
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
