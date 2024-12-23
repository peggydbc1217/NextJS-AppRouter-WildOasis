import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center justify-center h-screen">
      <Spinner />
      <p className="text-primary-200 text-lg mb-10">Loading cabins...</p>
    </div>
  );
}
