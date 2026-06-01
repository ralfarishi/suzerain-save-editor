export function convertToDatetimeLocal(dateStr: string): string {
	if (!dateStr) return "";

	const [d, m, yAndTime] = dateStr.split("/");
	if (!yAndTime) return "";

	const parts = yAndTime.trim().split(/\s+/);
	if (parts.length < 2) return "";

	const y = parts[0];
	let timeStr = parts[1];
	let period = "";

	if (parts.length >= 3) {
		period = parts[2];
	} else {
		period = timeStr.slice(-2);
		timeStr = timeStr.slice(0, -2);
	}

	const [hourStr, minuteStr] = timeStr.split(":");
	let hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	const normalizedPeriod = period.toUpperCase();
	if (normalizedPeriod === "PM" && hour < 12) hour += 12;
	if (normalizedPeriod === "AM" && hour === 12) hour = 0;

	const pad = (n: number) => n.toString().padStart(2, "0");
	return `${y}-${pad(parseInt(m, 10))}-${pad(parseInt(d, 10))}T${pad(hour)}:${pad(minute)}`;
}


export function convertDatetimeLocalToInitialDate(datetimeValue: string): string {
	if (!datetimeValue) return "";

	const [datePart, timePart] = datetimeValue.split("T");
	if (!datePart || !timePart) return "";

	const [year, month, day] = datePart.split("-");
	let [hourStr, minuteStr] = timePart.split(":");

	let hour = parseInt(hourStr, 10);
	const minute = parseInt(minuteStr, 10);

	const period = hour >= 12 ? "PM" : "AM";
	if (hour > 12) hour -= 12;
	if (hour === 0) hour = 12;

	const pad = (n: number | string) => n.toString().padStart(2, "0");
	return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)} ${period}`;
}
