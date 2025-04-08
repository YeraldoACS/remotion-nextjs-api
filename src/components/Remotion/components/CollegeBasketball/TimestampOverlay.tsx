const TimestampOverlay: React.FC<{ time: number; position: "left" | "right" }> = ({
    time,
    position,
  }) => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 20,
          [position]: 20,
          background: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {new Date(time * 1000).toISOString().substr(14, 5)} {/* Convert to mm:ss */}
      </div>
    );
  };

  export default TimestampOverlay;