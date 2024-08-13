import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Loaders = () => {
  return (
    <div className="grid grid-cols-12 gap-6 gap-x-8 p-10">
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Skeleton style={{ width: "100%", height: "50vh" }} />
      </div>
    </div>
  );
};
