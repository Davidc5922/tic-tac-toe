import "./Reset.css";

export default function Reset({ onReset }) {
  return (
    <div className="Reset">
      <div type="submit" className="button" onClick={onReset}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Reset
      </div>
    </div>
  );
}
