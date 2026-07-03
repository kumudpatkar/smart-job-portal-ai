import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-800">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-500 mt-2">
          {subtitle}
        </p>
      )}

      {/* Divider */}
      <div className="mt-4 border-b border-slate-200"></div>

    </div>
  );
};

export default PageHeader;