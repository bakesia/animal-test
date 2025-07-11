export default function Abutton({ text, onClick }) {
  return (
    <button
      className="w-full max-w-[80%] font-bold p-2 m-2 text-orange-900 bg-orange-100 rounded-md hover:bg-orange-300 transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
