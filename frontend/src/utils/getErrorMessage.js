export const getErrorMessage = (err, fallback = "Something went wrong") => {
    if (err?.response) return err?.response?.data?.message ?? fallback;
    if (err?.request) return "Could not reach the server";
    return fallback;
}