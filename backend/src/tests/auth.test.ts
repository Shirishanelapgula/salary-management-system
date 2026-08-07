import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthService } from "../services/auth.service.js";
import { authRepository } from "../repositories/auth.repository.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

vi.mock("../repositories/auth.repository.js", () => ({
  authRepository: {
    findByEmail: vi.fn(),
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
  },
}));

vi.mock("../utils/jwt.js", () => ({
  generateToken: vi.fn(() => "test-token"),
}));

describe("AuthService", () => {
  const service = new AuthService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("throws an unauthorized error for invalid credentials", async () => {
    vi.mocked(authRepository.findByEmail).mockResolvedValue(null);

    await expect(service.login("someone@example.com", "wrong-password")).rejects.toBeInstanceOf(
      UnauthorizedError
    );
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(generateToken).not.toHaveBeenCalled();
  });
});
