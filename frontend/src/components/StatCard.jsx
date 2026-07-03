import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
 subtitle,
  icon,
  color,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

          <p className="mt-2 text-gray-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;