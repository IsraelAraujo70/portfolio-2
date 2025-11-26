import { ApiError, request } from "./apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    it("makes a request to the correct URL with default headers", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ success: true }),
      });

      await request("/test-endpoint", { method: "GET" });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test-endpoint"),
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("merges custom headers with defaults", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => "{}",
      });

      await request("/test", {
        method: "POST",
        headers: { "X-Custom": "123" },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test"),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "X-Custom": "123",
          }),
        }),
      );
    });

    it("parses JSON response correctly", async () => {
      const mockData = { id: 1, name: "Test" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(mockData),
      });

      const result = await request("/json", { method: "GET" });
      expect(result).toEqual(mockData);
    });

    it("handles non-JSON response gracefully", async () => {
      const mockText = "plain text";
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => mockText,
      });

      const result = await request("/text", { method: "GET" });
      expect(result).toBe(mockText);
    });

    it("throws ApiError with message from response body error field", async () => {
      const errorMsg = "Custom error message";
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => JSON.stringify({ error: errorMsg }),
      });

      await expect(request("/fail", { method: "GET" })).rejects.toThrow(
        errorMsg,
      );

      try {
        await request("/fail", { method: "GET" });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        if (error instanceof ApiError) {
          expect(error.message).toBe(errorMsg);
          expect(error.status).toBe(400);
          expect(error.payload).toEqual({ error: errorMsg });
        }
      }
    });

    it("throws ApiError with statusText when response body has no error field", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        text: async () => JSON.stringify({ other: "info" }),
      });

      await expect(request("/fail", { method: "GET" })).rejects.toThrow(
        "Internal Server Error",
      );

      try {
        await request("/fail", { method: "GET" });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        if (error instanceof ApiError) {
          expect(error.status).toBe(500);
          expect(error.payload).toEqual({ other: "info" });
        }
      }
    });
  });
});
