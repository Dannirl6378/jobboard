jest.mock("@/lib/api", () => ({
  fetchJobs: jest.fn(() => Promise.resolve([{ id: 1, title: "Test Job" }])),
}));