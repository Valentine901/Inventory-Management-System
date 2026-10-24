export function getFormattedDate(data){
    if (!data) return;

    const date = new Date(String(data).replace(" ", "T"));

    // If the text wasn't a real date, don't show "Invalid Date" to the user.
    if (isNaN(date.getTime())) return "";
    let formatted = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return formatted;

}