import LoadingSpinner from "@/components/loadingServer/LoadingSpinner";

export default function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        color: "Red",
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
