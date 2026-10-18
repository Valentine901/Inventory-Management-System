const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-purple-600/10 hover:text-purple-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-zinc-600 transition cursor-pointer"
          >
            Prev
          </button>

          {pages.map((newPage) => (
            <button
              key={newPage}
              type="button"
              onClick={() => setCurrentPage(newPage)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${currentPage === newPage
                ? "bg-purple-600 text-white"
                : "bg-white text-zinc-600 border border-zinc-200 hover:bg-purple-600/10 hover:text-purple-600"
                }`}
            >
              {newPage}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-purple-600/10 hover:text-purple-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-zinc-600 transition cursor-pointer"
          >
            Next
          </button>
        </div>
    )
}

export default Pagination