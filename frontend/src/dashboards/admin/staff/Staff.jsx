import { useState, useEffect } from "react";
import { SquareStar, SearchIcon, X } from "lucide-react";
import { FILTERS } from "../../../constant/api";
import { getStaffs } from "../../../services/Staff";
import DeleteStaff from "./DeleteStaff";
import UpdateStaff from "./UpdateStaff";
import Pagination from "../../../Components/Pagination";
import StaffCard from "../../../Components/StaffCard";
import EmptyState from "../../../Components/EmptyState";


const Staff = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("all");
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openActionModal, setOpenActionModal] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);


  // pagination states
  const [currentPage, setCurrentPage] = useState(1); // the current page the user is on
  const [totalItems, setTotalItems] = useState(0); // total staffs
  const itemsPerPage = 6; // how many staff can fit in a single page

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setQuery("");
  };

  const handleFilterChange = (value) => {
    setSelected(value);
    setCurrentPage(1);
  }

  const onDelete = () => {
    setRefreshKey((prev) => prev + 1);
  }
  const onUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  }



  // fetch whenever the selected filter changes (and once on first load)
  useEffect(() => {
    let cancelled = false; // ignore old responses if the user clicks quickly

    const fetchStaffs = async () => {
      setLoading(true);
      setError("");
      try {
        const { endpoint } = FILTERS.find((f) => f.value === selected);
        const {staffs, totalItems} = await getStaffs(itemsPerPage, currentPage, endpoint);
        if (!cancelled) setStaffs(staffs);
        setTotalItems(totalItems);
      } catch (err) {
        if (!cancelled) {
          setStaffs([]);
          setError(err.response?.data?.message ?? "Could not reach the server");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStaffs();
    return () => { cancelled = true; };
  }, [selected, currentPage, refreshKey]);

  // search by username or member ID
  const q = query.trim().toLowerCase();
  const visibleStaffs = staffs.filter(
    (s) =>
      s.username?.toLowerCase().includes(q) ||
      s.member_id?.toLowerCase().includes(q)
  );

  // get the number of pages to navigate 
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // e.g., totalPages = 50/6 = Math.ceil(8.333) = 9

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
// get array from the length of totalPages=9 and make 9 empty slots which will return [0, 1, 2, ..., 8] then increment by 1 to get [1, 2, 3, ..., 9]

  const OpenAction = (action, id) => {
    setMemberId(id);
    setOpenActionModal(action);
    setOpenMenuId(null);
  }

  return (
    <div
      onClick={() => setOpenMenuId(null)}
      className="p-3 sm:p-6 flex flex-col gap-3 w-full bg-purple-600/5 font-alt min-h-screen">
      
      {/* header */}
      <div className="w-full p-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <SquareStar size={48} className="text-purple-600 shrink-0" />
          <div className="flex flex-col text-zinc-600">
            <span className="font-semibold">Staff Members</span>
            <span className="text-sm">Invenio</span>
          </div>
        </div>

        {/* filter toggle */}
        <div className="flex p-1 bg-zinc-600/10 w-full sm:w-auto sm:min-w-72 rounded-full shrink-0">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => handleFilterChange(value)}
              className={`flex-1 px-4 py-2 rounded-full text-base cursor-pointer transition-colors duration-300 ${selected === value
                ? "text-zinc-100 bg-purple-600"
                : "text-zinc-600 hover:text-zinc-900"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* action section */}
      {openActionModal === "delete" && <DeleteStaff onClose={() => {setOpenActionModal(null)}} memberId={memberId} onDelete={onDelete} />}
      {openActionModal === "update" && <UpdateStaff onClose={() => {setOpenActionModal(null)}} memberId={memberId} onUpdate={onUpdate} />}

      {/* search bar */}
      <div className="flex items-center justify-end gap-2">
        {showSearch && (
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by memberId & username"
            className="max-w-lg w-full px-4 py-2 placeholder:text-sm rounded-full bg-zinc-600/10 outline-none focus:ring-2 focus:ring-purple-600/40 transition"
          />
        )}
        <button
          type="button"
          onClick={toggleSearch}
          aria-label={showSearch ? "Close search" : "Open search"}
          className="shrink-0 p-3 rounded-xl text-purple-600 bg-purple-600/10 hover:bg-purple-600/20 cursor-pointer transition-colors"
        >
          {showSearch ? <X /> : <SearchIcon />}
        </button>
      </div>

      {/* staff list */}
      <div className="w-full">
        {loading && <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="rounded-xl bg-zinc-600/20 h-50 animate-pulse"></div>
            ))
          )}
        </div>}

        {error && (
          <p role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}

        {!loading && !error && visibleStaffs.length === 0 && (
         <EmptyState />
        )}

        {!loading && !error && visibleStaffs.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

            {visibleStaffs.map((staff) => (

             <StaffCard
             key={staff.member_id}
             staff={staff}
             isMenuOpen={openMenuId === staff.member_id}
             onToggleMenu={() => setOpenMenuId(openMenuId === staff.member_id ? null : staff.member_id)}
             onEdit={() => OpenAction("update", staff.member_id)}
             onDelete={() => OpenAction("delete", staff.member_id)}
             />
            ))}
          </div>
        )}
      </div>

      {!loading && !error && totalPages > 1 && (
        <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
      )}

    </div>
  );
};

export default Staff;


