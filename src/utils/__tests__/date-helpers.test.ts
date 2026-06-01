import { describe, expect, it } from "vitest";
import { convertToDatetimeLocal, convertDatetimeLocalToInitialDate } from "../date-helpers";

describe("date-helpers", () => {
	describe("convertToDatetimeLocal", () => {
		it("converts a standard AM date string to datetime-local format", () => {
			const input = "15/04/1954 08:30 AM";
			const expected = "1954-04-15T08:30";
			expect(convertToDatetimeLocal(input)).toBe(expected);
		});

		it("converts a standard PM date string to datetime-local format", () => {
			const input = "15/04/1954 08:30 PM";
			const expected = "1954-04-15T20:30";
			expect(convertToDatetimeLocal(input)).toBe(expected);
		});

		it("handles 12 PM (noon) correctly", () => {
			const input = "01/01/2026 12:15 PM";
			const expected = "2026-01-01T12:15";
			expect(convertToDatetimeLocal(input)).toBe(expected);
		});

		it("handles 12 AM (midnight) correctly", () => {
			const input = "01/01/2026 12:15 AM";
			const expected = "2026-01-01T00:15";
			expect(convertToDatetimeLocal(input)).toBe(expected);
		});

		it("returns empty string for empty inputs", () => {
			expect(convertToDatetimeLocal("")).toBe("");
			expect(convertToDatetimeLocal("invalid-format")).toBe("");
		});
	});

	describe("convertDatetimeLocalToInitialDate", () => {
		it("converts a datetime-local AM string back to initial game date format", () => {
			const input = "1954-04-15T08:30";
			const expected = "15/04/1954 08:30 AM";
			expect(convertDatetimeLocalToInitialDate(input)).toBe(expected);
		});

		it("converts a datetime-local PM string back to initial game date format", () => {
			const input = "1954-04-15T20:30";
			const expected = "15/04/1954 08:30 PM";
			expect(convertDatetimeLocalToInitialDate(input)).toBe(expected);
		});

		it("handles noon correctly", () => {
			const input = "2026-01-01T12:15";
			const expected = "01/01/2026 12:15 PM";
			expect(convertDatetimeLocalToInitialDate(input)).toBe(expected);
		});

		it("handles midnight correctly", () => {
			const input = "2026-01-01T00:15";
			const expected = "01/01/2026 12:15 AM";
			expect(convertDatetimeLocalToInitialDate(input)).toBe(expected);
		});

		it("returns empty string for empty inputs", () => {
			expect(convertDatetimeLocalToInitialDate("")).toBe("");
			expect(convertDatetimeLocalToInitialDate("invalid-format")).toBe("");
		});
	});
});
