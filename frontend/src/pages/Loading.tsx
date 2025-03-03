import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  );
};
