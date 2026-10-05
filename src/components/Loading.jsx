// Reusable loading indicator. `fullPage` centers it in a tall box so it can
// be dropped in as a page-level loader (e.g. while products are fetching)
// or used inline within a smaller area.
function Loading({ label = "Loading…", fullPage = false }) {
  return (
    <div className={fullPage ? "loading-fullpage" : "loading-inline"}>
      <div className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export default Loading;
