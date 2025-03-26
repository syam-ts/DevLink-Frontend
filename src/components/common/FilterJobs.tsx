import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

export const FilterJobs = ({ setFilter }) => {
  const [activeFilters, setActiveFilters] = useState({
    budget: null,
    paymentType: null,
    expertLevel: null,
  });
  const [expandedSections, setExpandedSections] = useState({
    budget: true,
    paymentType: true,
    expertLevel: true,
  });

  const filterSections: {
    title: string;
    type: "budget" | "paymentType" | "expertLevel";
    options: { label: string; value: string }[];
  }[] = [
      {
        title: "Budget",
        type: "budget",
        options: [
          { label: "Under 500", value: "amount=500" },
          { label: "500 - 2000", value: "amount=2000" },
          { label: "2000 - 10000", value: "amount=10000" },
          { label: "10000 - 50000", value: "amount=50000" },
          { label: "50000 - 70000", value: "amount=70000" },
        ],
      },
      {
        title: "Payment Type",
        type: "paymentType",
        options: [
          { label: "Hourly", value: "paymentType=hourly" },
          { label: "Fixed", value: "paymentType=fixed" },
        ],
      },
      {
        title: "Expert Level",
        type: "expertLevel",
        options: [
          { label: "Beginner", value: "expertLevel=beginner" },
          { label: "Intermediate", value: "expertLevel=intermediate" },
          { label: "Advanced", value: "expertLevel=advanced" },
        ],
      },
    ];

  const handleFilterSelection = (
    filterType: keyof typeof activeFilters,
    value: string
  ) => {
    setActiveFilters((prev) => {
      const newFilters = Object.keys(prev).reduce(
        (acc, key) => {
          return {
            ...acc,
            [key]:
              key === filterType ? (prev[key] === value ? null : value) : null,
          };
        },
        { ...prev }
      );
      setFilter(newFilters[filterType]);
      return newFilters;
    });
  };

  const toggleSection = (sectionType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionType]: !prev[sectionType],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      budget: null,
      paymentType: null,
      expertLevel: null,
    });
    setFilter(null);
  };

  const isAnyFilterActive = Object.values(activeFilters).some(
    (filter) => filter !== null
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 border border-gray-200 rounded-3xl shadow-2xl space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
          <Filter className="mr-3 text-gray-700" size={32} />
          Filter Jobs
        </h3>
        {isAnyFilterActive && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
          >
            <X className="mr-1" size={16} />
            Clear All
          </motion.button>
        )}
      </div>

      {filterSections.map((section) => (
        <div key={section.title} className="">
          <div
            onClick={() => toggleSection(section.type)}
            className="flex justify-between items-center cursor-pointer mb-4"
          >
            <h4 className="text-xl font-semibold text-gray-800">
              {section.title}
            </h4>
            {expandedSections[section.type] ? (
              <ChevronUp className="text-gray-600" />
            ) : (
              <ChevronDown className="text-gray-600" />
            )}
          </div>

          <AnimatePresence>
            {expandedSections[section.type] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`
                  ${section.type === "paymentType"
                    ? "flex gap-3"
                    : "grid grid-cols-2 gap-3"
                  }
                  overflow-hidden
                `}
              >
                {section.options.map(({ label, value }) => (
                  <motion.div
                    key={value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 text-center
                      ${activeFilters[section.type] === value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                    onClick={() => handleFilterSelection(section.type, value)}
                  >
                    {label}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

export default FilterJobs;
