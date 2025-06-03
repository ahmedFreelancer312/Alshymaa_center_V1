type LoadingProps = {
  bg?: string;
};

export default function Loading({ bg }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div
          className={`absolute inset-0 rounded-full border-4 border-transparent animate-spin ${bg || "border-r-primary"}`}
        ></div>
      </div>
    </div>
  );
}
