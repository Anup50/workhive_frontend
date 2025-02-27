import { X } from "lucide-react";

const Skill = ({ skill, onDelete }) => {
  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10">
      <p className="outline-none">{skill}</p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={() => onDelete(skill)}
      >
        <X size={16} className="text-gray-600" />
      </button>
    </div>
  );
};

export default Skill;
