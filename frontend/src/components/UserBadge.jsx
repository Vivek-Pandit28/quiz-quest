function UserBadge() {
  const name = localStorage.getItem("quiz_name");

  if (!name) return null;

  return (
    <div className="fixed top-10 right-5 xl:right-30 z-50 bg-slate-900 border border-slate-700 px-4 py-2 rounded-md text-white shadow-lg">
      <span className="text-slate-400 text-sm">Player : </span>
      <span className="font-semibold text-indigo-400">{name}</span>
    </div>
  );
}

export default UserBadge;