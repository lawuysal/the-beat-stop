import { OrbitProgress } from "react-loading-indicators";

export default function LoadingIndicator() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OrbitProgress
        variant="track-disc"
        color="#0f4c75"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  );
}
