export default function Abutton({ text, onClick }) {
  return (
    <button
      className="w-full max-w-xs font-bold p-3 m-4 my-3 text-orange-900 bg-orange-100 rounded-md hover:bg-orange-300 transition text-sm sm:text-base sm:my-2 md:text-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
