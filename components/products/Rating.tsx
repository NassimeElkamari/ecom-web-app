const Star = ({ type }: { type: "full" | "half" | "empty" }) => {
  const symbols = {
    full: "★",
    half: "☆",
    empty: "☆",
  };

  return (
    <span
      className={`text-yellow-500 text-base ${
        type === "half" ? "text-opacity-50" : ""
      }`}
    >
      {symbols[type]}
    </span>
  );
};

export const Rating = ({
  value,
  caption,
}: {
  value: number;
  caption?: string;
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (value >= i + 1) return <Star key={i} type="full" />;
    if (value >= i + 0.5) return <Star key={i} type="half" />;
    return <Star key={i} type="empty" />;
  });

  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1">{stars}</div>
      {caption && <span className="text-sm text-gray-400">{caption}</span>}
    </div>
  );
};
